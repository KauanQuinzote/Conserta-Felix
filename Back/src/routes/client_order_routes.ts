import { Router } from 'express';
import jwtAuth from '../middleware/jwt_auth';
import { authorize } from '../middleware/authorize';
import { ClientOrderController } from '../controllers/client_order_controller';
import { CreateOrderUseCase } from '../use-cases/client/order/CreateOrderUseCase';
import { DeleteOrderUseCase } from '../use-cases/client/order/DeleteOrderUseCase';

const router = Router();

// Instanciar use cases e controller
const createOrderUseCase = new CreateOrderUseCase();
const deleteOrderUseCase = new DeleteOrderUseCase();
const clientOrderController = new ClientOrderController(createOrderUseCase, deleteOrderUseCase);

// Todas as rotas de order do client requerem autenticação e role 'client'
router.post('/order', jwtAuth, authorize('client'), (req, res) => 
  clientOrderController.create(req, res)
);

router.delete('/order/:id', jwtAuth, authorize('client'), (req, res) => 
  clientOrderController.delete(req, res)
);

export default router;
