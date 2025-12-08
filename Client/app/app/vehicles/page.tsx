'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import VehicleList from '@/components/VehicleList';

export default function VehiclePage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main className="container mx-auto px-4 py-8">

      {/* HEADER */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-primary-blue hover:underline mb-6 font-semibold"
      >
        <ArrowLeft size={20} />
        Voltar
      </button>

      <div className="bg-white rounded-lg shadow-lg p-8">

        {/* TÍTULO + BOTÃO ADICIONAR */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Veículos Cadastrados</h1>

          <button
            onClick={() => router.push('/app/vehicles/create')}
            className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2"
          >
            <Plus size={20} />
            Adicionar Veículo
          </button>
        </div>

        {/* FILTROS */}
        <div className="flex gap-2 mb-4">
          {[
            { label: "Todos", value: "all" },
            { label: "Carros", value: "car" },
            { label: "Motos", value: "motorcycle" },
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

        {/* PESQUISA */}
        <div className="relative w-full max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

          <input
            type="text"
            placeholder="Pesquisar por modelo, marca ou placa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-white border rounded-xl shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition"
          />
        </div>

        {/* LISTA DE VEÍCULOS */}
        <VehicleList filter={filter} search={searchTerm} />

      </div>
    </main>
  );
}
