'use client';
import { useEffect, useState } from "react";
import VehicleList from "@/components/VehicleList";

export default function ProfileInfo(){
    const [user, setUser] = useState<{ name?: string; email?: string; number?: string }>({});
    const [client, setClient] = useState<any>({});

    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedClient = localStorage.getItem("client");

    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }

    if (storedClient) {
        setClient(JSON.parse(storedClient));
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

        <div className="flex flex-col space-y-1">
            <label className="font-semibold text-gray-700">Número</label>
            <input
            type="text"
            value={user.number || ""}
            readOnly
            className="border p-2 rounded bg-gray-100 w-full"
            />
        </div>

        <hr className='border-t-4'></hr>

        <h2 className="text-1xl font-bold mb-4">Endereço</h2>
        <div className="flex flex-col space-y-1">
            <input type="text"
                value={client.address || ""}
                readOnly
                className="border p-2 rounded bg-gray-100 w-full"
                />
        </div>

        <hr className='border-t-4'></hr>

        <h2 className="text-1xl font-bold mb-4">Veiculos</h2>
        
        <VehicleList/>

    </div>
}
