"use client";

import { useEffect, useState } from "react";
import VehicleCard from "@/app/app/vehicles/VehicleCard";
import Loading from "@/components/Loading";
import { useParams } from "next/navigation";

export interface VehicleListProps {
  filter: string;
  search: string;
}

export interface Vehicle {
  id: string;
  model: string;
  brand: string;
  year: number;
  plate: string;
  type: string;
}

export default function VehicleList({ filter, search }: VehicleListProps) {
  const params = useParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!token || !user.clientId) {
          console.error("Usuário não autenticado.");
          return;
        }

        const res = await fetch(
          `http://localhost:3000/api/vehicle?clientId=${user.clientId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        setVehicles(data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // 🗑 Função para excluir veículo
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este veículo?")) return;

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const response = await fetch(
        `http://localhost:3000/api/vehicle/${id}?clientId=${user.clientId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert("Erro ao excluir: " + error.message);
        return;
      }

      // Atualiza a lista removendo o veículo excluído
      setVehicles((prev) => prev.filter((v) => v.id !== id));

      alert("Veículo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
    }
  };

  if (isLoading) return <Loading />;

  const filteredByType = vehicles.filter((v) =>
    filter === "all" ? true : v.type === filter
  );

  const filteredBySearch = filteredByType.filter((v) =>
    `${v.brand} ${v.model} ${v.plate}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (filteredBySearch.length === 0) {
    return <p className="text-gray-700 mt-6">Nenhum veículo encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredBySearch.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
