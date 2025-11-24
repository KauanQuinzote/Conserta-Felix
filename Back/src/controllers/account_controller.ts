import { Request, Response } from 'express';
import { CreateAccountDTO } from '../dtos/create_account_dto';
import VehicleEntity from '../entities/vehicle_entity';
import ClientEntity from '../entities/client_entity';
import { CreateAccountUseCase } from '../use-cases/client/account/CreateAccountUseCase';
import { EditAccountUseCase } from '../use-cases/client/account/EditAccountUseCase';
import { DeleteAccountUseCase } from '../use-cases/client/account/DeleteAccountUseCase';

export class AccountController {
  constructor(
    private createAccountUseCase: CreateAccountUseCase,
    private editAccountUseCase: EditAccountUseCase,
    private deleteAccountUseCase: DeleteAccountUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const dto: CreateAccountDTO = req.body;

      // Transformar DTO em entidades
      const vehicles = dto.vehicles.map(v => 
        new VehicleEntity(v.model, v.year, v.plate, v.type as any, v.make as any)
      );

      const client = new ClientEntity(
        dto.name,
        dto.email,
        vehicles,
        dto.adress,
        []
      );

      // Executar use case com a entidade
      const result = await this.createAccountUseCase.execute(client);

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao criar conta'
      });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // TODO: Implementar quando EditAccountUseCase for criado
      res.status(501).json({ message: 'Edit not implemented yet' });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao editar conta'
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // TODO: Implementar quando DeleteAccountUseCase for criado
      res.status(501).json({ message: 'Delete not implemented yet' });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao deletar conta'
      });
    }
  }
}
