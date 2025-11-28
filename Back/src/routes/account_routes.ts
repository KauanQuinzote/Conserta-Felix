import { Router } from 'express';
import jwtAuth from '../middleware/jwt_auth';
import { authorize } from '../middleware/authorize';
import { AccountController } from '../controllers/account_controller';
import { CreateAccountUseCase } from '../use-cases/client/account/CreateAccountUseCase';

const router = Router();

// Instanciar use cases e controller
const createAccountUseCase = new CreateAccountUseCase();
const accountController = new AccountController(createAccountUseCase, null as any, null as any);

// Criar novo User (admin)
router.post('/account/user', (req, res) => accountController.createUser(req, res));

// Criar conta de Client
router.post('/account/client', (req, res) => accountController.createClient(req, res));

// Editar requerem autenticação e role 'client'
router.put('/account/client/:id', jwtAuth, authorize('client'), (req, res) => 
  accountController.edit(req, res)
);
export default router;
