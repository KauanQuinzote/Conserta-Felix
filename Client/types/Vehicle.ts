

export type VehicleType = 'Car' | 'Motorcycle' | 'Van';

type CarBrands =
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

export default interface VehicleEntity<T extends VehicleType = VehicleType> {
    readonly plate: string;
    type: T;
    make: VehicleBrands<T>;
    model: string;
    year: number;
    readonly createdAt: Date;
    updatedAt: Date
    active: boolean
}