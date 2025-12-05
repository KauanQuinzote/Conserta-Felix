import { prisma } from "../../../infra/prisma/client";

export class GetAddressUseCase {
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

    // Buscar cliente
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      select: {
        id: true,
        address: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    if (!client) {
      throw new Error("Cliente não encontrado.");
    }

    // Parsear o endereço de string JSON para objeto
    let addressObject;
    try {
      addressObject = JSON.parse(client.address);
    } catch (error) {
      // Se o endereço ainda estiver no formato antigo (string), retornar como está
      addressObject = client.address;
    }

    return {
      message: "Endereço recuperado com sucesso!",
      data: {
        clientId: client.id,
        address: addressObject,
        user: client.user
      }
    };
  }
}
