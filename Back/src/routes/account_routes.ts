import { Router } from 'express';
import jwtAuth from '../middleware/jwt_auth';
import { authorize } from '../middleware/authorize';
import { UserController } from '../controllers/user_controller';
import { ClientController } from '../controllers/client_controller';
import { CreateClientAccountUseCase } from '../use-cases/client/account/CreateAccountUseCase';
import { CreateAccountUseCase } from '../use-cases/admin/account/CreateAccountUseCase';

const router = Router();

//teste-de rota autorizada
router.get('/test-auth', jwtAuth, (req, res) => {
  res.status(200).json({ message: 'Rota autorizada acessada com sucesso!' });
});

// Instanciar use cases
const createClientAccountUseCase = new CreateClientAccountUseCase();
const createUserAccountUseCase = new CreateAccountUseCase();

// Instanciar controllers
const userController = new UserController(createUserAccountUseCase);
const clientController = new ClientController(createClientAccountUseCase);

// ========== ROTAS DE USER (Admin) ==========
// Criar novo User (admin)
router.post('/account/user', (req, res) => userController.createUser(req, res));

// Editar usuário - requer autenticação de admin
router.put('/account/user/:id', jwtAuth, authorize('admin'), (req, res) => 
  userController.editUser(req, res)
);

// Deletar usuário - requer autenticação de admin
router.delete('/account/user/:id', jwtAuth, authorize('admin'), (req, res) => 
  userController.deleteUser(req, res)
);

// ========== ROTAS DE CLIENT ==========
// Criar conta de Client - não requer autenticação (registro público)
router.post('/account/client', (req, res) => clientController.createClient(req, res));

// Editar cliente - requer autenticação de client
router.put('/account/client/:id', jwtAuth, authorize('client'), (req, res) => 
  clientController.editClient(req, res)
);

// Deletar cliente - requer autenticação de client
router.delete('/account/client/:id', jwtAuth, authorize('client'), (req, res) => 
  clientController.deleteClient(req, res)
);

export default router;
