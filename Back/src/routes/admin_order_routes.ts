import { Router } from 'express';
import jwtAuth from '../middleware/jwt_auth';
import { authorize } from '../middleware/authorize';
import { AdminOrderController } from '../controllers/admin_order_controller';

const router = Router();

// Instanciar controller (use cases serão adicionados quando estiverem prontos)
const adminOrderController = new AdminOrderController(
  {} as any,
  {} as any,
  {} as any,
  {} as any
);

// Todas as rotas de order do admin requerem autenticação e role 'admin'
router.post('/admin/order', jwtAuth, authorize('admin'), (req, res) => 
  adminOrderController.create(req, res)
);

router.delete('/admin/order/:id', jwtAuth, authorize('admin'), (req, res) => 
  adminOrderController.delete(req, res)
);

router.patch('/admin/order/:id/conclude', jwtAuth, authorize('admin'), (req, res) => 
  adminOrderController.conclude(req, res)
);

router.get('/admin/order/search', jwtAuth, authorize('admin'), (req, res) => 
  adminOrderController.search(req, res)
);

export default router;
