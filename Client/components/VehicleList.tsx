'use client';
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  brand: string;
  year: number;
}

export function getMockVehicles(): Vehicle[] {
  return [
    { id: "1", plate: "ABC1D23", model: "Onix", brand: "Chevrolet", year: 2020 },
    { id: "2", plate: "XYZ4E56", model: "HB20", brand: "Hyundai", year: 2019 },
    { id: "3", plate: "JKL7M89", model: "Corolla", brand: "Toyota", year: 2022 },
    { id: "4", plate: "MNO7M89", model: "Corolla", brand: "Toyota", year: 2001 },
  ];
}

export default function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mock = getMockVehicles();
    setVehicles(mock);
    setLoading(false);
  }, []);

  const handleRemoveVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
  };

  if (loading) return <p>Carregando veículos...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {vehicles.length === 0 && (
        <p className="text-gray-600">Nenhum veículo cadastrado.</p>
      )}

      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="relative border p-4 rounded-lg shadow-sm bg-white hover:scale-105 hover:shadow-lg transition duration-300"
        >
          <button
            type="button"
            onClick={() => handleRemoveVehicle(vehicle.id)}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 transition"
            aria-label={`Remover veículo ${vehicle.plate}`}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>

          <h3 className="font-bold text-lg text-blue-700 hover:text-red-700 transition-colors mt-2">
            {vehicle.brand} {vehicle.model}
          </h3>

          <p className="text-gray-700 mt-1">
            <strong>Placa:</strong> {vehicle.plate}
          </p>

          <p className="text-gray-700">
            <strong>Ano:</strong> {vehicle.year}
          </p>
        </div>
      ))}
    </div>
  );
}
