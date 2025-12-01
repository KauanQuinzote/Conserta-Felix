import Address from "../interfaces/adress_interface";

export interface CreateAccountDTO {
  name: string;
  email: string;
  number: string;
  role: 'admin' | 'client';
  password: string;
  vehicles: Array<{
    model: string;
    year: number;
    plate: string;
    type: 'Car' | 'Motorcycle' | 'Van';
    make: string;
  }>;
  address: Address;
}
