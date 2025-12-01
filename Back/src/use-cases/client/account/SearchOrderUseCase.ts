import { Prisma, PrismaClient } from "@prisma/client";
import ClientEntity from "../../../entities/client_entity";
import { prisma } from "../../../infra/prisma/client";

export class SearchOrderUseCase {
  async execute(clientId: string, orderId: string) {
    const clientExists = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!clientExists) {
      throw new Error("Cliente não encontrado.");
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        clientId: clientId,
      },
      include: {
        services: true,
        vehicle: true,
      },
    });

    if (!order) {
      throw new Error("Ordem de serviço não encontrada para este cliente.");
    }

    return order;
  }
}