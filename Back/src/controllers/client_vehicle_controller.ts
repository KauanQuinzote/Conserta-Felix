import { Request, Response } from 'express';
import { AddVehicleUseCase } from '../use-cases/client/vehicle/AddVehicleUseCase';
import { DeleteVehicleUseCase } from '../use-cases/client/vehicle/DeleteVehicleUseCase';
import { GetVehicleUseCase } from '../use-cases/client/vehicle/GetVehicleUserCase';

export class ClientVehicleController {
  constructor(
    private addVehicleUseCase: AddVehicleUseCase,
    private deleteVehicleUseCase: DeleteVehicleUseCase,
    private getVehicleUseCase: GetVehicleUseCase,
  ) {}

  async add(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.addVehicleUseCase.execute(data);
      res.status(201).json({ message: 'Vehicle added', data: result });
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

  async getVehicles(req: Request, res: Response) {
    try {      
      const { clientId } = req.query;
      
      if (!clientId || typeof clientId !== 'string') {
        return res.status(400).json({ message: 'clientId é obrigatório' });
      }

      const result = await this.getVehicleUseCase.execute(clientId);
      console.log(result);
      
      if(result === null) {
        throw new Error('Erro ao buscar veiculos');
      }
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao buscar veiculos'
      });
    }
  }
}