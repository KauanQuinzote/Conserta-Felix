import { PrismaClient, Prisma } from "@prisma/client";
import ClientEntity from "../../../entities/client_entity";
import User from "../../../entities/user_entity";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class CreateAccountUseCase {
  constructor(private clientRepository?: any) {}

  public async execute(user: any) {
    const { name, email, password } = user;

    if (!name || !email || !password) {
      console.log(name , email , password);
      throw new Error("Nome, e-mail e senha são obrigatórios.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("E-mail inválido.");
    }

    const emailExists = await prisma.user.findUnique({
      where: { email }
    });

    if (emailExists) {
      throw new Error("Este e-mail já está cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,

        }
      });

      return user ;

    });

    return {
      message: "Conta criada com sucesso!",
      data: result
    };
  }
}
