import Service from '../interfaces/service_interface';

export type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export default class OrdersEntity {
  public readonly id: string;
  public clientId: string;
  public service: Service;
  public orderDue: Date;
  public status: OrderStatus;
  public createdAt: Date;
  public updatedAt: Date;
  public concludedAt?: Date;

  constructor(
    id: string,
    clientId: string,
    service: Service,
    orderDue: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.clientId = clientId;
    this.service = service;
    this.orderDue = orderDue;
    this.status = 'pending';
    this.createdAt = new Date();
    this.updatedAt = updatedAt || new Date();
  }
}