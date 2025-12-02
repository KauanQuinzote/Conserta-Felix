'use client';
import { useEffect, useState } from "react";
import VehicleList from "@/components/VehicleList";

interface Address {
  street: string;
  addressNumber: number;
  neighborhood: string;
  city: string;
  state: string;
  zipCode?: string;
  country?: string;
}

interface UserLS {
  name?: string;
  email?: string;
  number?: string;
  password?: string;
}

interface ClientLS {
  id?: string;
  address?: Address; 
}

export default function ProfileInfo() {
  const [user, setUser] = useState<UserLS>({});
  const [client, setClient] = useState<ClientLS>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedClient = localStorage.getItem("client");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("USER NO LOCALSTORAGE:", parsedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Erro ao parsear user do localStorage:", e);
      }
    }

    if (storedClient) {
      try {
        const parsedClient = JSON.parse(storedClient);
        console.log("CLIENT NO LOCALSTORAGE:", parsedClient);
        setClient(parsedClient);
      } catch (e) {
        console.error("Erro ao parsear client do localStorage:", e);
      }
    }
  }, []);

  const formattedAddress = client.address
    ? `${client.address.street}, ${client.address.addressNumber} - ${client.address.neighborhood}, ${client.address.city} - ${client.address.state}`
    : "";

  return (
    <div className="flex flex-col space-y-6 p-6">
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
          className="border p-2 rounded bg-gray-100 w-full"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-gray-700">Senha</label>
        <input
          type="password"
          value={user.password || "1234"}
          className="border p-2 rounded bg-gray-100 w-full"
        />
      </div>

      <hr className="border-t-4" />

      <h2 className="text-1xl font-bold mb-4">Endereço</h2>
      <div className="flex flex-col space-y-1">
        <input
          type="text"
          value={formattedAddress}
          className="border p-2 rounded bg-gray-100 w-full"
        />
      </div>

      <hr className="border-t-4" />

      <h2 className="text-1xl font-bold mb-4">Veículos</h2>

      <VehicleList />
    </div>
  );
}
