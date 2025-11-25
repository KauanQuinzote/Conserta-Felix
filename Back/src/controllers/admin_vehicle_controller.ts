import { Request, Response } from 'express';
import { SearchVehicleUseCase } from '../use-cases/admin/vehicle/SearchVehicleUseCase';

export class AdminVehicleController {
  constructor(
    private searchVehicleUseCase: SearchVehicleUseCase
  ) {}

  async search(req: Request, res: Response) {
    try {
      const query = req.query;
      const result = await this.searchVehicleUseCase.execute(query);
      res.status(200).json({ message: 'Vehicles found', query });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao buscar veículos'
      });
    }
  }
}
