import { Router } from 'express';
import jwtAuth from '../middleware/jwt_auth';
import { authorize } from '../middleware/authorize';
import { AdminVehicleController } from '../controllers/admin_vehicle_controller';
import { SearchVehicleUseCase } from '../use-cases/admin/vehicle/SearchVehicleUseCase';

const router = Router();

// Instanciar use cases e controller
const searchVehicleUseCase = new SearchVehicleUseCase();
const adminVehicleController = new AdminVehicleController(searchVehicleUseCase);

// Todas as rotas de vehicle do admin requerem autenticação e role 'admin'
router.get('/admin/vehicle/search', jwtAuth, authorize('admin'), (req, res) => 
  adminVehicleController.search(req, res)
);

export default router;
