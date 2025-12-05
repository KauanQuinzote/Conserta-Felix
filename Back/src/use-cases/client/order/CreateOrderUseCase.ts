import { prisma } from "../../../infra/prisma/client";

interface CreateOrderData {
  clientId: string;
  service: {
    name: string;
    description: string;
    price: number;
  };
  orderDue: string;
  status: string;
}

export class CreateOrderUseCase {
  async execute(data: CreateOrderData) {
    const { clientId, service, orderDue, status } = data;

    // Validar campos obrigatórios
    if (!clientId || !service || !orderDue) {
      throw new Error("Cliente, serviço e data de entrega são obrigatórios.");
    }

    if (!service.name || !service.price) {
      throw new Error("Nome e preço do serviço são obrigatórios.");
    }

    // Validar preço
    if (service.price <= 0) {
      throw new Error("Preço do serviço deve ser maior que zero.");
    }

    // Verificar se o cliente existe e está ativo
    const client = await prisma.client.findUnique({
      where: { id: clientId } // Buscar pelo ID do Client, não do User
    });

    if (!client) {
      throw new Error("Cliente não encontrado.");
    }

    if (!client.active) {
      throw new Error("Cliente inativo.");
    }

    // Validar data de entrega
    const orderDueDate = new Date(orderDue);
    if (isNaN(orderDueDate.getTime())) {
      throw new Error("Data de entrega inválida.");
    }

    // Data de entrega deve ser no futuro (pelo menos amanhã)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (orderDueDate < tomorrow) {
      throw new Error("Data de entrega deve ser pelo menos amanhã.");
    }

    // Data de entrega não pode ser mais de 1 ano no futuro
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    if (orderDueDate > maxDate) {
      throw new Error("Data de entrega não pode ser mais de 1 ano no futuro.");
    }

    // Validar status
    const validStatuses = ['pending'];
    if (status && !validStatuses.includes(status)) {
      throw new Error("Status inválido. Use: pending");
    }

    try {
      // Criar serviço e pedido em uma transação
      const result = await prisma.$transaction(async (tx) => {
        // Criar o serviço
        const createdService = await tx.service.create({
          data: {
            name: service.name,
            description: service.description || '',
            price: service.price
          }
        });

        // Criar o pedido vinculado ao serviço
        const createdOrder = await tx.order.create({
          data: {
            clientId: clientId,
            serviceId: createdService.id,
            orderDue: orderDueDate,
            status: status || 'pending'
          },
          include: {
            service: true,
            client: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true
                  }
                }
              }
            }
          }
        });

        return createdOrder;
      });

      return {
        message: "Pedido criado com sucesso!",
        data: result
      };
    } catch (error: any) {
      throw new Error(`Erro ao criar pedido: ${error.message}`);
    }
  }
}
