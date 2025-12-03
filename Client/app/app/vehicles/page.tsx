'use client';

import { useState } from "react";
import VehicleList from "@/components/VehicleList";
import { Search } from "lucide-react";

export default function VehiclePage() {
  const [filter, setFilter] = useState("all");

  return (
    <main className="container mx-auto px-4 py-8">
         
      <div className="items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Veículos Cadastrados</h1>
        <br />

        <div className="justify-left">
          {[
            { label: "Todos", value: "all" },
            { label: "Carros", value: "carro" },
            { label: "Motos", value: "moto" },
            { label: "Vans", value: "van" },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={`px-4 py-2 rounded-lg transition font-medium ${
                filter === btn.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/*Falta lógica de pesquisa*/}
        <div className="w-full flex justify-end mt-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-3 py-2 bg-white border rounded-xl shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

      </div>

      <VehicleList filter={filter} />
       
    </main>
  );
}
