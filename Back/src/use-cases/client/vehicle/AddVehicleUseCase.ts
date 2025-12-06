import { prisma } from '../../../infra/prisma/client';
import VehicleEntity from '../../../entities/vehicle_entity';


export class AddVehicleUseCase {
  async execute(
    clientId: string,
    make: string,
    model: string,
    year: number,
    licensePlate: string,
    color: string
  ) {
    const clientExists = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!clientExists) {
      throw new Error("Cliente não encontrado.");
    }

    const newVehicle = await prisma.vehicle.create({
      data: {
        clientId,
        make,
        model,
        year,
        licensePlate,
        color,
      },
    });

    const vehicleEntity = new VehicleEntity(
      newVehicle.make,
      newVehicle.model,
      newVehicle.year,
      newVehicle.licensePlate,
      newVehicle.color
    );

    return {
      message: "Veículo adicionado com sucesso!",
      data: vehicleEntity,
    };
  }
}
