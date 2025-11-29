import { Request, Response } from 'express';
import { CreateAccountDTO } from '../dtos/create_account_dto';
import User from '../entities/user_entity';
import { CreateAccountUseCase } from '../use-cases/admin/account/CreateAccountUseCase';

export class UserController {
  constructor(
    private createAccountUseCase: CreateAccountUseCase
  ) {}

  async createUser(req: Request, res: Response) {
    try {
      const dto: CreateAccountDTO = req.body;

      const user = new User(
        dto.name,
        dto.email,
        dto.password,
        dto.role
      );

      const result = await this.createAccountUseCase.execute(user);
      
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao criar usuário'
      });
    }
  }

  async editUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // TODO: Implementar quando EditAccountUseCase for criado
      res.status(501).json({ message: 'Edit user not implemented yet' });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao editar usuário'
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // TODO: Implementar quando DeleteAccountUseCase for criado
      res.status(501).json({ message: 'Delete user not implemented yet' });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao deletar usuário'
      });
    }
  }
}
