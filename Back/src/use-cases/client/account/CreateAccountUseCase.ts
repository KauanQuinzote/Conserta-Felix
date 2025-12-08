
import { prisma } from "../../../infra/prisma/client";
import { Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt';

export class CreateClientAccountUseCase {
  constructor(private clientRepository?: any) {}

  public async execute(client: any) {
    const { name, email, password , vehicles, address, number } = client;

    if (!name || !email || !address || !number) {
      throw new Error("Nome, e-mail, número de telefone e endereço são obrigatórios.");
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

    const numberStr = String(number).trim();

    if (!numberStr) {
      throw new Error("Número de telefone é obrigatório.");
    }

    const numberExists = await prisma.user.findUnique({
      where: { number: numberStr }
    });


    if (numberExists) {
      throw new Error("Este número de telefone já está cadastrado.");
    }

    if (!password) {
      throw new Error("Senha é obrigatória.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          number,
          password: hashedPassword,
          role: 'client'
        }
      });

      let finalAddress: any = address;

      if ("address" in finalAddress) {
        finalAddress = finalAddress.address;
      }

      // Salvar endereço como JSON string
      const addressObject = {
        street: finalAddress.street,
        number: finalAddress.addressNumber || finalAddress.number,
        neighborhood: finalAddress.neighborhood,
        city: finalAddress.city,
        state: finalAddress.state,
        zipCode: finalAddress.zipCode || "",
        country: finalAddress.country || "Brasil"
      };

      const clientRecord = await tx.client.create({
        data: {
          userId: user.id,
          address: JSON.stringify(addressObject)
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
              clientId: clientRecord.id
            }
          })
        )
      );

      return {
        user,
        client: clientRecord,
        vehicles: createdVehicles
      };
    });

    return {
      message: "Conta criada com sucesso!",
      data: {
        user: {
          userId: result.user.id,
          name: result.user.name,
          email: result.user.email,
          number: result.user.number,
          role: result.user.role,
          clientId: result.client.id
        },
        client: result.client,
        vehicles: result.vehicles
      }
    };
  }
}

export default CreateClientAccountUseCase;