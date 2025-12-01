'use client';
import { useEffect, useState } from "react";
import VehicleList from "@/components/VehicleList";

export default function ProfileInfo(){
    const [user, setUser] = useState<{ name?: string; email?: string }>({});

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Erro ao ler user do localStorage:", error);
            }
        }
    }, []);

    return <div className="flex flex-col space-y-6 p-6">

        <h2 className="text-1xl font-bold mb-4">Dados Pessoais</h2>
        <div className="flex flex-col space-y-1">
            <label className="font-semibold text-gray-700">Nome</label>
            <input
                type="text"
                value={user.name || ""}
                readOnly
                className="border p-2 rounded bg-gray-100 w-full"
            />
        </div>

        <div className="flex flex-col space-y-1">
            <label className="font-semibold text-gray-700">E-mail</label>
            <input
            type="email"
            value={user.email || ""}
            readOnly
            className="border p-2 rounded bg-gray-100 w-full"
            />
        </div>

        <hr className='border-t-4'></hr>

        <h2 className="text-1xl font-bold mb-4">Endereço</h2>
        <div className="flex flex-col space-y-1">
            <label className="font-semibold text-gray-700">Rua</label>
            <input
                type="text"
                className="border p-2 rounded bg-gray-100 w-full"
            />
        </div>

        <div className="flex flex-col space-y-1">
            <label className="font-semibold text-gray-700">Bairro</label>
            <input
            type="text"
            className="border p-2 rounded bg-gray-100 w-full"
            />
        </div>

        <div className="flex flex-col space-y-1">
            <label className="font-semibold text-gray-700">Cidade</label>
            <input
            type="text"
            className="border p-2 rounded bg-gray-100 w-full"
            />
        </div>

        <div className="flex flex-col space-y-1">
            <label className="font-semibold text-gray-700">Estado</label>
            <input
            type="text"
            className="border p-2 rounded bg-gray-100 w-full"
            />
        </div>

        <hr className='border-t-4'></hr>

        <h2 className="text-1xl font-bold mb-4">Veiculos</h2>
        
        <VehicleList/>

    </div>
}