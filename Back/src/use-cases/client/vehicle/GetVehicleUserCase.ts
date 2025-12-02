import { prisma } from "../../../infra/prisma/client";

export class GetVehicleUseCase {
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
    const vehicle = await prisma.vehicle.findMany({
      where: {
        clientId: clientId
      },
      include: {
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

    return vehicle;
  }
}
