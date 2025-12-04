import { prisma } from "../../../infra/prisma/client";

export class DeleteOrderUseCase {
  async execute(orderId: string) {
    if (!orderId) {
      throw new Error("O ID do pedido é obrigatório.");
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new Error("Pedido não encontrado.");
    }

    const serviceId = order.serviceId;

    await prisma.$transaction(async (tx) => {
      await tx.order.delete({
        where: { id: orderId },
      });
    });

    return { message: "Pedido deletado com sucesso." };
  }
}
