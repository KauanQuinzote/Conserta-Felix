import { Router } from 'express';
import jwtAuth from '../middleware/jwt_auth';
import { authorize } from '../middleware/authorize';
import { AdminAccountController } from '../controllers/admin_account_controller';
import { CreateAccountUseCase } from '../use-cases/admin/account/CreateAccountUseCase';
import { DeleteAccountUseCase } from '../use-cases/admin/account/DeleteAccountUseCase';

const router = Router();

// Instanciar use cases e controller
const createAccountUseCase = new CreateAccountUseCase();
const deleteAccountUseCase = new DeleteAccountUseCase();
const adminAccountController = new AdminAccountController(createAccountUseCase, deleteAccountUseCase);

// Todas as rotas de account do admin requerem autenticação e role 'admin'
router.post('/admin/account', jwtAuth, authorize('admin'), (req, res) => 
  adminAccountController.create(req, res)
);

router.delete('/admin/account/:id', jwtAuth, authorize('admin'), (req, res) => 
  adminAccountController.delete(req, res)
);

export default router;
