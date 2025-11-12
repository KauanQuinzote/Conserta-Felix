export type ServiceType = 
    | 'cleaning'
    | 'repair'
    | 'maintenance'
    | 'installation'
    | 'consultation';

export default interface Service {
  name: string;
  type: ServiceType;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}
