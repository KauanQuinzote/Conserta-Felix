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

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const user = await tx.user.create({
        data: {
          name,
          email
        }
      });



      let finalAdress: any = adress;

      if ("adress" in finalAdress) {
        finalAdress = finalAdress.adress;
      }

      const formattedAddress =
        `${finalAdress.street}, ${finalAdress.number}, ${finalAdress.neighborhood}, ` +
        `${finalAdress.city} - ${finalAdress.state}, ${finalAdress.zipCode ?? ""}, ${finalAdress.country ?? ""}`;

      const client = await tx.client.create({
        data: {
          userId: user.id,
          address: formattedAddress
        }
      });

      const createdVehicles = await Promise.all(
        vehicles.map((v) =>
          tx.vehicle.create({
            data: {
              plate: v.plate,
              type: v.type,
              make: v.make,
              model: v.model,
              year: v.year,
              clientId: client.id
            }
          })
        )
      );

      return {
        user,
        client,
        vehicles: createdVehicles
      };
    });

    return {
      message: "Conta criada com sucesso!",
      data: result
    };
  }
}
