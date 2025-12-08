import { prisma } from '../../../infra/prisma/client';
import VehicleEntity, {VehicleType, VehicleBrands} from '../../../entities/vehicle_entity';


export class AddVehicleUseCase {
  async execute(
    clientId: string,
    make: string,
    model: string,
    year: number,
    plate: string,
    type: string,
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
        plate,
        type,
        make,
        model,
        year,
      },
    });

    const vehicleEntity = new VehicleEntity(
      newVehicle.model,
      newVehicle.year,
      newVehicle.plate,
      newVehicle.type as VehicleType,
      newVehicle.make as VehicleBrands,
    );

    return {
      message: "Veículo adicionado com sucesso!",
      data: vehicleEntity,
    };
  }
}
