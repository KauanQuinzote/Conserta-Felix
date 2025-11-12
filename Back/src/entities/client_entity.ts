import UserEntity from "./user_entity";
import VehicleEntity from "./vehicle_entity";
import Adress from "../interfaces/place_interface";
import OrdersEntity from "./order_entity";

export default class ClientEntity extends UserEntity {
  public vehicles: VehicleEntity[] = [];
  public adress: Adress;
  public orders: OrdersEntity[] = [];

  constructor(name: string, email: string, vehicles: VehicleEntity[], adress: Adress, orders?: OrdersEntity[]) {
    super(name, email);
    this.vehicles = vehicles;
    this.adress = adress;
    if (orders) {
      this.orders = orders;
    }
  }
}