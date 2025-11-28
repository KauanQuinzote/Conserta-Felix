import Adress from "../interfaces/adress_interface";

export interface CreateAccountDTO {
  name: string;
  email: string;
  password: string;
  vehicles: Array<{
    model: string;
    year: number;
    plate: string;
    type: 'Car' | 'Motorcycle' | 'Van';
    make: string;
  }>;
  adress: Adress;
}
