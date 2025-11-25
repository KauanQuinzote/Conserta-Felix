import { Router } from 'express';
import jwtAuth from '../middleware/jwt_auth';
import { authorize } from '../middleware/authorize';
import { AccountController } from '../controllers/account_controller';
import { CreateAccountUseCase } from '../use-cases/client/account/CreateAccountUseCase';

const router = Router();

// Instanciar use cases e controller
const createAccountUseCase = new CreateAccountUseCase();
const accountController = new AccountController(createAccountUseCase, null as any, null as any);

// Criar conta não requer autenticação (registro público)
router.post('/account', (req, res) => accountController.create(req, res));

// Editar e deletar requerem autenticação e role 'client'
router.put('/account/:id', jwtAuth, authorize('client'), (req, res) => 
  accountController.edit(req, res)
);

router.delete('/account/:id', jwtAuth, authorize('client'), (req, res) => 
  accountController.delete(req, res)
);

export default router;
