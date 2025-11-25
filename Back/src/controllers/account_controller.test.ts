import { Request, Response } from 'express';
import { AccountController } from './account_controller';
import { CreateAccountUseCase } from '../use-cases/client/account/CreateAccountUseCase';
import { CreateAccountDTO } from '../dtos/create_account_dto';

// Mock do CreateAccountUseCase
jest.mock('../use-cases/client/account/CreateAccountUseCase');

describe('AccountController', () => {
  let accountController: AccountController;
  let mockCreateAccountUseCase: jest.Mocked<CreateAccountUseCase>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Setup dos mocks
    mockCreateAccountUseCase = new CreateAccountUseCase() as jest.Mocked<CreateAccountUseCase>;
    accountController = new AccountController(mockCreateAccountUseCase, {} as any, {} as any);

    mockRequest = {
      body: {}
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe('create', () => {
    it('deve criar uma conta com sucesso', async () => {
      // Arrange
      const mockDTO: CreateAccountDTO = {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        vehicles: [
          {
            model: 'Corolla',
            year: 2020,
            plate: 'ABC-1234',
            type: 'Car',
            make: 'Toyota'
          }
        ],
        adress: {
          street: 'Rua das Flores',
          number: 123,
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567'
        }
      };

      const mockResult = {
        message: 'Conta criada com sucesso!',
        data: { id: '123' }
      };

      mockRequest.body = mockDTO;
      mockCreateAccountUseCase.execute = jest.fn().mockResolvedValue(mockResult);

      // Act
      await accountController.create(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockCreateAccountUseCase.execute).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
    });

    it('deve retornar erro 400 quando o use case falhar', async () => {
      // Arrange
      const mockDTO: CreateAccountDTO = {
        name: 'João Silva',
        email: 'joao.silva@email.com',
        vehicles: [],
        adress: {
          street: 'Rua das Flores',
          number: 123,
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567'
        }
      };

      mockRequest.body = mockDTO;
      mockCreateAccountUseCase.execute = jest.fn().mockRejectedValue(
        new Error('É necessário cadastrar pelo menos um veículo.')
      );

      // Act
      await accountController.create(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'É necessário cadastrar pelo menos um veículo.'
      });
    });

    it('deve transformar DTO em entidades corretamente', async () => {
      // Arrange
      const mockDTO: CreateAccountDTO = {
        name: 'Maria Santos',
        email: 'maria@email.com',
        vehicles: [
          {
            model: 'Civic',
            year: 2021,
            plate: 'XYZ-9876',
            type: 'Car',
            make: 'Honda'
          },
          {
            model: 'CG 160',
            year: 2022,
            plate: 'ABC-5555',
            type: 'Motorcycle',
            make: 'Honda'
          }
        ],
        adress: {
          street: 'Av. Principal',
          number: 456,
          neighborhood: 'Jardim',
          city: 'Rio de Janeiro',
          state: 'RJ',
          zipCode: '20000-000'
        }
      };

      mockRequest.body = mockDTO;
      mockCreateAccountUseCase.execute = jest.fn().mockResolvedValue({ success: true });

      // Act
      await accountController.create(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockCreateAccountUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Maria Santos',
          email: 'maria@email.com',
          vehicles: expect.arrayContaining([
            expect.objectContaining({
              plate: 'XYZ-9876',
              model: 'Civic',
              year: 2021
            }),
            expect.objectContaining({
              plate: 'ABC-5555',
              model: 'CG 160',
              year: 2022
            })
          ])
        })
      );
    });
  });
});

