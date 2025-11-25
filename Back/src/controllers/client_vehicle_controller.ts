import { Request, Response } from 'express';
import { AddVehicleUseCase } from '../use-cases/client/vehicle/AddVehicleUseCase';
import { DeleteVehicleUseCase } from '../use-cases/client/vehicle/DeleteVehicleUseCase';

export class ClientVehicleController {
  constructor(
    private addVehicleUseCase: AddVehicleUseCase,
    private deleteVehicleUseCase: DeleteVehicleUseCase
  ) {}

  async add(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.addVehicleUseCase.execute(data);
      res.status(201).json({ message: 'Vehicle added', data });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao adicionar veículo'
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.deleteVehicleUseCase.execute(id);
      res.status(200).json({ message: 'Vehicle deleted', id });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao deletar veículo'
      });
    }
  }
}
