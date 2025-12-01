import { Request, Response } from 'express';
import { CreateOrderUseCase } from '../use-cases/admin/order/CreateOrderUseCase';
import { DeleteOrderUseCase } from '../use-cases/admin/order/DeleteOrderUseCase';
import { ConcludeOrderUseCase } from '../use-cases/admin/order/ConcludeOrderUseCase';
import { SearchOrderUseCase } from '../use-cases/admin/order/SearchOrderUseCase';

export class AdminOrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private deleteOrderUseCase: DeleteOrderUseCase,
    private concludeOrderUseCase: ConcludeOrderUseCase,
    private searchOrderUseCase: SearchOrderUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      // const result = await this.createOrderUseCase.execute(data);
      res.status(201).json({ message: 'Order created by admin', data });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao criar pedido'
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // const result = await this.deleteOrderUseCase.execute(id);
      res.status(200).json({ message: 'Order deleted', id });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao deletar pedido'
      });
    }
  }

  async conclude(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.concludeOrderUseCase.execute(id);
      res.status(200).json({ message: 'Order concluded', id });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao concluir pedido'
      });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const query = req.query;
      const result = await this.searchOrderUseCase.execute(query);
      res.status(200).json({ message: 'Orders found', query });
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao buscar pedidos'
      });
    }
  }
}
