import { Request, Response } from 'express';
import { CreateAccountUseCase } from '../use-cases/admin/account/CreateAccountUseCase';
import { DeleteAccountUseCase } from '../use-cases/admin/account/DeleteAccountUseCase';

export class AdminAccountController {
  constructor(
    private createAccountUseCase: CreateAccountUseCase,
    private deleteAccountUseCase: DeleteAccountUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      // const result = await this.createAccountUseCase.execute(data);
      res.status(201).json({ message: 'Admin account created', data });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao criar conta de administrador'
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // const result = await this.deleteAccountUseCase.execute(id);
      res.status(200).json({ message: 'Account deleted', id });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao deletar conta'
      });
    }
  }
}
