import { PrismaClient, Prisma } from "@prisma/client";
import ClientEntity from "../../../entities/client_entity";
import User from "../../../entities/user_entity";

const prisma = new PrismaClient();

export class DeleteAccountUseCase {
  async execute(userId: string) {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        client: {
          include: {
            vehicles: true,
          },
        },
      },
    } as Prisma.UserFindUniqueArgs);

    if (!userExists) {
      throw new Error("Usuário não encontrado.");
    }

    const clientId = (userExists as any).client?.id;

    await prisma.$transaction(async (tx) => {
      if (clientId) {
        await tx.vehicle.deleteMany({
          where: { clientId: clientId },
        });

        await tx.client.delete({
          where: { id: clientId },
        });
      }

      await tx.user.delete({
        where: { id: userId },
      });
    });

    return { message: "Conta deletada com sucesso!" };
  }
}
