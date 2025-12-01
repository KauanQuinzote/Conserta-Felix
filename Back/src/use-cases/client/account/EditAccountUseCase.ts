import { Prisma, PrismaClient } from "@prisma/client";
import ClientEntity from "../../../entities/client_entity";
import { prisma } from "../../../infra/prisma/client";

export class EditAccountUseCase {
  async execute(clientId: string, updateData: Partial<ClientEntity>) {
    const clientExists = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!clientExists) {
      throw new Error("Cliente não encontrado.");
    }

    await prisma.client.update({
      where: { id: clientId },
      data: updateData,
    });

    return {
      message: "Conta atualizada com sucesso!",
    };
  }
}