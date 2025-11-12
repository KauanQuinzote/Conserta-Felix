export type VehicleType = 'Car' | 'Motorcycle' | 'Van';

export type CarBrands = 
  | 'Toyota'
  | 'Honda'
  | 'Ford'
  | 'Chevrolet'
  | 'BMW'
  | 'Audi'
  | 'Mercedes-Benz'
  | 'Volkswagen'
  | 'Hyundai'
  | 'Kia'
  | 'Nissan'
  | 'Mazda'
  | 'Subaru'
  | 'Renault'
  | 'Peugeot'
  | 'Fiat'
  | 'Jeep'
  | 'Tesla'
  | 'Volvo'
  | 'Lexus';

export type MotorcycleBrands = 
  | 'Honda'
  | 'Yamaha'
  | 'Suzuki'
  | 'Kawasaki'
  | 'KTM'
  | 'Harley-Davidson'
  | 'BMW'
  | 'Ducati'
  | 'Royal Enfield'
  | 'Hero'
  | 'Bajaj'
  | 'Triumph'
  | 'Husqvarna'
  | 'Aprilia'
  | 'MV Agusta';

export type VanBrands = 
  | 'Mercedes-Benz'
  | 'Ford'
  | 'Volkswagen'
  | 'Renault'
  | 'Peugeot'
  | 'Citroën'
  | 'Fiat'
  | 'Iveco'
  | 'Toyota'
  | 'Hyundai'
  | 'Nissan'
  | 'Kia'
  | 'Chevrolet';

export type VehicleBrands<T extends VehicleType = VehicleType> = 
  T extends 'Car' ? CarBrands :
  T extends 'Motorcycle' ? MotorcycleBrands :
  T extends 'Van' ? VanBrands :
  never;

export default class VehicleEntity<T extends VehicleType = VehicleType> {
  public readonly plate: string;
  public type: T;
  public make: VehicleBrands<T>;
  public model: string;
  public year: number;
  public createdAt: Date;
  public updatedAt: Date;
  public active: boolean = true;
  
  constructor(model: string, year: number, plate: string, type: T, make: VehicleBrands<T>) {
    this.plate = plate;
    this.type = type;
    this.make = make;
    this.model = model;
    this.year = year;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}