import { PrismaClient, Prisma } from "@prisma/client";
import ClientEntity from "../../../entities/client_entity";

const prisma = new PrismaClient();

export class CreateAccountUseCase {
  async execute(client: ClientEntity) {
    const { name, email, vehicles, adress } = client;

    if (!name || !email || !adress) {
      throw new Error("Nome, e-mail e endereço são obrigatórios.");
    }
    if (!Array.isArray(vehicles) || vehicles.length === 0) {
      throw new Error("É necessário cadastrar pelo menos um veículo.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("E-mail inválido.");
    }

    for (const v of vehicles) {
      if (!v.plate || !v.type || !v.make || !v.model || !v.year) {
        throw new Error("Todos os campos do veículo são obrigatórios.");
      }
      const plateRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
      if (!plateRegex.test(v.plate.toUpperCase())) {
        throw new Error(`Placa inválida: ${v.plate}`);
      }
      const plateExists = await prisma.vehicle.findUnique({
        where: { plate: v.plate }
      });
      if (plateExists) {
        throw new Error(`A placa ${v.plate} já está cadastrada.`);
      }
    }
    const emailExists = await prisma.user.findUnique({
      where: { email }
    });

    if (emailExists) {
      throw new Error("Este e-mail já está cadastrado.");
    }
  }
}
