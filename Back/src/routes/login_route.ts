import { Router } from 'express';
import { LoginController } from '../controllers/login_controller';
import { LoginUseCase } from '../use-cases/LoginUseCase';

const router = Router();

// Instanciar use case e controller
const loginUseCase = new LoginUseCase();
const loginController = new LoginController(loginUseCase);

// Rota de login - não requer autenticação
router.post('/login', (req, res) => loginController.login(req, res));

export default router;
