import { Router } from 'express';
import jwtAuth from '../middleware/jwt_auth';
import { authorize } from '../middleware/authorize';
import { ClientVehicleController } from '../controllers/client_vehicle_controller';
import { AddVehicleUseCase } from '../use-cases/client/vehicle/AddVehicleUseCase';
import { DeleteVehicleUseCase } from '../use-cases/client/vehicle/DeleteVehicleUseCase';
import { GetVehicleUseCase } from '../use-cases/client/vehicle/GetVehicleUserCase';

const router = Router();

// Instanciar use cases e controller
const addVehicleUseCase = new AddVehicleUseCase();
const deleteVehicleUseCase = new DeleteVehicleUseCase();
const getVehicleUseCase = new GetVehicleUseCase();
const clientVehicleController = new ClientVehicleController(addVehicleUseCase, deleteVehicleUseCase, getVehicleUseCase);

// Todas as rotas de vehicle do client requerem autenticação e role 'client'
router.post('/vehicle', jwtAuth, authorize('client'), (req, res) => 
  clientVehicleController.add(req, res)
);

router.delete('/vehicle/:id', jwtAuth, authorize('client'), (req, res) => 
  clientVehicleController.delete(req, res)
);

router.get('/vehicle', jwtAuth, authorize('client'), (req, res) => 
  clientVehicleController.getVehicles(req, res)
);

export default router;
