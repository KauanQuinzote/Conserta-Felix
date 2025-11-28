import { Router, Request, Response } from 'express';
import jwtAuth from '../middleware/jwt_auth';

// Client routes
import accountRoutes from './account_routes';
import clientOrderRoutes from './client_order_routes';
import clientVehicleRoutes from './client_vehicle_routes';

// Admin routes
import adminOrderRoutes from './admin_order_routes';
import adminVehicleRoutes from './admin_vehicle_routes';

const router = Router();

// Client routes
router.use(accountRoutes);
router.use(clientOrderRoutes);
router.use(clientVehicleRoutes);

// Admin routes
router.use(adminOrderRoutes);
router.use(adminVehicleRoutes);

// Rota protegida de exemplo
router.get('/protected', jwtAuth, (req: Request, res: Response) => {
  res.json({ msg: 'protected', user: (req as any).user });
});

export default router;
