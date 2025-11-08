import { Router } from 'express';
import healthController from '../controllers/healthController';
import authController from '../controllers/authController';
import jwtAuth from '../middleware/jwtAuth';

const router = Router();

router.get('/health', healthController.getHealth);
router.post('/auth/login', authController.login);
router.get('/protected', jwtAuth, (req, res) => {
  res.json({ msg: 'protected', user: (req as any).user });
});

export default router;
