import { Router, Request, Response } from 'express';
import jwtAuth from '../middleware/jwt_auth';

// Auth routes
import loginRoute from './login_route';

// Client routes
import accountRoutes from './account_routes';
import clientOrderRoutes from './client_order_routes';
import clientVehicleRoutes from './client_vehicle_routes';

// Admin routes
import adminOrderRoutes from './admin_order_routes';
import adminVehicleRoutes from './admin_vehicle_routes';

const router = Router();

// Auth routes
router.use(loginRoute);

// Client routes
router.use(accountRoutes);
router.use(clientOrderRoutes);
router.use(clientVehicleRoutes);

// Admin routes
router.use(adminOrderRoutes);
router.use(adminVehicleRoutes);

export default router;
