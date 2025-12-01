'use client';

import { useEffect, useState } from "react";

interface Vehicle {
    id: string;
    plate: string;
    model: string;
    brand: string;
    year: number;
}

export default function VehicleList() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchVehicles = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/vehicle", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();
                setVehicles(data);
            } catch (err) {
                console.error("Erro ao buscar veículos:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    if (loading) return <p>Carregando veículos...</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {vehicles.length === 0 && (
                <p className="text-gray-600">Nenhum veículo cadastrado.</p>
            )}

            {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border p-4 rounded-lg shadow-sm bg-white">
                    <h3 className="font-bold text-lg text-blue-700">
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
