'use client';

import { Vehicle } from "@/components/VehicleList";
import { Trash } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
  onDelete?: (id: string) => void;
}

export default function VehicleCard({ vehicle, onDelete }: VehicleCardProps) {

  return (
    <div className="bg-white shadow rounded-lg p-5 border hover:shadow-lg transition">

      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-xl text-gray-800">
          {vehicle.brand} {vehicle.model}
        </h2>

        {/* Ícone de Excluir */}
        {onDelete && (
          <button
            onClick={() => onDelete(vehicle.id)}
            className="text-red-500 hover:text-red-700 transition"
            title="Excluir veículo"
          >
            <Trash size={20} />
          </button>
        )}
      </div>

      <p className="text-gray-700"><strong>Ano:</strong> {vehicle.year}</p>
      <p className="text-gray-700"><strong>Placa:</strong> {vehicle.plate}</p>

      <p className="mt-3 inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
        {vehicle.type.toUpperCase()}
      </p>
    </div>
  );
}
