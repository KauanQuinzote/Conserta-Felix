import { Request, Response } from 'express';
import { CreateOrderUseCase } from '../use-cases/client/order/CreateOrderUseCase';
import { DeleteOrderUseCase } from '../use-cases/client/order/DeleteOrderUseCase';
import { GetOrdersUseCase } from '../use-cases/client/order/GetOrdersUseCase';

export class ClientOrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private deleteOrderUseCase: DeleteOrderUseCase,
    private getOrdersUseCase: GetOrdersUseCase
  ) {}

  async getOrders(req: Request, res: Response) {
    try {      
      const { clientId } = req.query;
      
      if (!clientId || typeof clientId !== 'string') {
        return res.status(400).json({ message: 'clientId é obrigatório' });
      }

      const result = await this.getOrdersUseCase.execute(clientId);
      console.log(result);
      
      if(result === null) {
        throw new Error('Erro ao buscar pedidos');
      }
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({
        message: error.message || 'Erro ao buscar pedidos'
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.createOrderUseCase.execute(data);
      if(result === null) {
        throw new Error('Erro ao criar pedido');
      }

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
