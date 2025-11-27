import { Request, Response } from 'express';
import { CreateAccountDTO } from '../dtos/create_account_dto';
import VehicleEntity from '../entities/vehicle_entity';
import ClientEntity from '../entities/client_entity';
import { CreateAccountUseCase } from '../use-cases/client/account/CreateAccountUseCase';
import { EditAccountUseCase } from '../use-cases/client/account/EditAccountUseCase';
import { DeleteAccountUseCase } from '../use-cases/client/account/DeleteAccountUseCase';
import User from '../entities/user_entity';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwtAuth, { generateToken } from '../middleware/jwt_auth';


const prisma = new PrismaClient();

export class AccountController {
  constructor(
    private createAccountUseCase: CreateAccountUseCase,
    private editAccountUseCase: EditAccountUseCase,
    private deleteAccountUseCase: DeleteAccountUseCase
  ) { }

  async createUser(req: Request, res: Response) {
    try {
      const dto: CreateAccountDTO = req.body;

      const user = new User(
        dto.name,
        dto.email,
        dto.password,
      );

      // Executar use case com a entidade
      const result = await this.createAccountUseCase.execute(user);

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao criar conta'
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      //busca de credencial no bandco de dados
      const result = await prisma.user.findUnique({
        where: { email }
      });

      if (!result) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const hachePassword = await bcrypt.compare(password, result.password);

      if (!hachePassword) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      
      const token = generateToken({ id: result.id, email: result.email});

      res.status(200).json({ token } );
      
    }
    catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao fazer login'
      });
    }
  }

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
