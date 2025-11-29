import { serialize } from "v8";
import { prisma } from "../../../infra/prisma/client";

export class GetOrdersUseCase {
  async execute(clientId: string) {
    // Validar clientId
    if (!clientId) {
      throw new Error("ID do cliente é obrigatório.");
    }

    // Validar formato UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(clientId)) {
      throw new Error("ID do cliente inválido.");
    }

    // Buscar pedidos do cliente
    const orders = await prisma.order.findMany({
      where: {
        clientId: clientId
      },
      include: {
        service: true, // Incluir o service como objeto
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      message: "Pedidos recuperados com sucesso!",
      data: orders // Service já vem como objeto, não precisa parse
    };
  }
}
