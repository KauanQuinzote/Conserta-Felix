import { prisma } from '../../../infra/prisma/client';

export class DeleteVehicleUseCase {
  async execute(clientId: string, vehicleId: string) {
    const clientExists = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!clientExists) {
      throw new Error('Cliente não encontrado.');
    }

    const vehicleExists = await prisma.vehicle.findFirst({
      where: { id: vehicleId, clientId },
    });

    if (!vehicleExists) {
      throw new Error('Veículo não encontrado para este cliente.');
    }

    await prisma.vehicle.delete({
      where: { id: vehicleId },
    });

    return {
      message: 'Veículo deletado com sucesso!',
      data: vehicleExists,
    };
  }
}
