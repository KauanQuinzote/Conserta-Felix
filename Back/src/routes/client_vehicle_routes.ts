import { Router } from 'express';
import jwtAuth from '../middleware/jwt_auth';
import { authorize } from '../middleware/authorize';
import { ClientVehicleController } from '../controllers/client_vehicle_controller';
import { AddVehicleUseCase } from '../use-cases/client/vehicle/AddVehicleUseCase';
import { DeleteVehicleUseCase } from '../use-cases/client/vehicle/DeleteVehicleUseCase';

const router = Router();

// Instanciar use cases e controller
const addVehicleUseCase = new AddVehicleUseCase();
const deleteVehicleUseCase = new DeleteVehicleUseCase();
const clientVehicleController = new ClientVehicleController(addVehicleUseCase, deleteVehicleUseCase);

// Todas as rotas de vehicle do client requerem autenticação e role 'client'
router.post('/vehicle', jwtAuth, authorize('client'), (req, res) => 
  clientVehicleController.add(req, res)
);

router.delete('/vehicle/:id', jwtAuth, authorize('client'), (req, res) => 
  clientVehicleController.delete(req, res)
);

export default router;
