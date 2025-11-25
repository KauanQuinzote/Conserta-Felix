import { Request, Response } from 'express';
import { CreateOrderUseCase } from '../use-cases/client/order/CreateOrderUseCase';
import { DeleteOrderUseCase } from '../use-cases/client/order/DeleteOrderUseCase';

export class ClientOrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private deleteOrderUseCase: DeleteOrderUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.createOrderUseCase.execute(data);
      res.status(201).json({ message: 'Order created', data });
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
}
