import UserEntity from "./user_entity";
import VehicleEntity from "./vehicle_entity";
import Address from "../interfaces/adress_interface";
import OrdersEntity from "./order_entity";

export default class ClientEntity extends UserEntity {
  public vehicles: VehicleEntity[] = [];
  public address: Address;
  public orders: OrdersEntity[] = [];

  constructor(name: string, email: string, number: string, password: string, vehicles: VehicleEntity[], address: Address, orders?: OrdersEntity[]) {
    super(name, email, number, password);
    this.vehicles = vehicles;
    this.address = address;
    if (orders) {
      this.orders = orders;
    }
  }
}