import { Router } from 'express';
import jwtAuth from '../middleware/jwt_auth';
import { authorize } from '../middleware/authorize';
import { ClientOrderController } from '../controllers/client_order_controller';
import { CreateOrderUseCase } from '../use-cases/client/order/CreateOrderUseCase';
import { DeleteOrderUseCase } from '../use-cases/client/order/DeleteOrderUseCase';
import { GetOrdersUseCase } from '../use-cases/client/order/GetOrdersUseCase';
import { GetOrderDetailUseCase } from '../use-cases/client/order/GetOrdersUseCase';

const router = Router();

// Instanciar use cases e controller
const createOrderUseCase = new CreateOrderUseCase();
const deleteOrderUseCase = new DeleteOrderUseCase();
const getOrdersUseCase = new GetOrdersUseCase();
const getOrderDetailUseCase = new GetOrderDetailUseCase();
const clientOrderController = new ClientOrderController (createOrderUseCase, deleteOrderUseCase, getOrdersUseCase , getOrderDetailUseCase) ;

router.get('/order/:id', jwtAuth, (req, res) =>
  clientOrderController.getOrderDetail(req, res) // Chama um NOVO método!
);

// Buscar pedidos (requer autenticação)
router.get('/order', jwtAuth, (req, res) => 
  clientOrderController.getOrders(req, res)
);

router.post('/order', jwtAuth, (req, res) => 
  clientOrderController.create(req, res)
);

router.delete('/order/:id', jwtAuth, authorize('client'), (req, res) => 
  clientOrderController.delete(req, res)
);

export default router;
