import { Request, Response } from 'express';
import { CreateOrderUseCase } from '../use-cases/client/order/CreateOrderUseCase';
import { DeleteOrderUseCase } from '../use-cases/client/order/DeleteOrderUseCase';
import { GetOrdersUseCase , GetOrderDetailUseCase} from '../use-cases/client/order/GetOrdersUseCase';

export class ClientOrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private deleteOrderUseCase: DeleteOrderUseCase,
    private getOrdersUseCase: GetOrdersUseCase,
    private getOrderDetailUseCase: GetOrderDetailUseCase
  ) {}

  async getOrderDetail(req: Request, res: Response) {
    try {
        // 1. O ID vem dos parâmetros da URL
        const orderId = req.params.id; 

        if (!orderId || typeof orderId !== 'string') {
            return res.status(400).json({ message: 'O ID do pedido é obrigatório' });
        }

        // 2. Chamar o Use Case para buscar UM pedido
        const result = await this.getOrderDetailUseCase.execute(orderId);

        if (!result) {
            // Retorna 404 se o pedido não for encontrado pelo ID
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        res.status(200).json(result);
        
    } catch (error: any) {
        res.status(500).json({ 
            message: error.message || 'Erro ao buscar o detalhe do pedido'
        });
    }
}

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
