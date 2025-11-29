import { Request, Response } from 'express';
import { LoginUseCase } from '../use-cases/LoginUseCase';

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await this.loginUseCase.execute(email, password);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({
        message: error.message || 'Erro ao realizar login'
      });
    }
  }
}
