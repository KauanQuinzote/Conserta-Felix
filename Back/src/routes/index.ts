import { Router, Request, Response } from 'express';
import jwtAuth from '../middleware/jwt_auth';

const router = Router();

router.get('/protected', jwtAuth, (req: Request, res: Response) => {
  res.json({ msg: 'protected', user: (req as any).user });
});

export default router;
