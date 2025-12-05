'use client';

import { useEffect, useState } from "react";
import VehicleList from "@/components/VehicleList";

export default function ProfileInfo() {
  const [token, setToken] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addressData, setAddressData] = useState<any>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const id = storedUser ? JSON.parse(storedUser).clientId: null;
    
    setToken(storedToken);
    setClientId(id);
    setIsLoading(false);
  }, []);

  console.log('ClientId:', clientId);
  console.log('Token:', token);

  useEffect(() => {
    const fetchAddress = async () => {
      console.log('entrei')
      try {
        const response = await fetch(`http://localhost:3000/api/account/client/address/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Dados do endereço:', data);
        setAddressData(data);
      } catch (error) {
        console.error('Erro ao buscar informações do cliente:', error);
      }
    };

    fetchAddress();
  }, [token, clientId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!token || !clientId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Por favor, faça login para ver suas informações de perfil.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <h2 className="text-1xl font-bold mb-4">Dados Pessoais</h2>

      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-gray-700">Nome</label>
        <input
          type="text"
          value={addressData?.data?.user?.name || ""}
          readOnly
          className="border p-2 rounded bg-gray-100 w-full"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="font-semibold text-gray-700">E-mail</label>
        <input
          type="email"
          value={addressData?.data?.user?.email || ""}
          readOnly
          className="border p-2 rounded bg-gray-100 w-full"
        />
      </div>

      <hr className="border-t-4" />

      <h2 className="text-1xl font-bold mb-4">Endereço</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="font-semibold text-gray-700">Rua</label>
          <input
            type="text"
            value={addressData?.data?.address?.street || ""}
            readOnly
            className="border p-2 rounded bg-gray-100 w-full"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="font-semibold text-gray-700">Número</label>
          <input
            type="text"
            value={addressData?.data?.address?.number || ""}
            readOnly
            className="border p-2 rounded bg-gray-100 w-full"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="font-semibold text-gray-700">Bairro</label>
          <input
            type="text"
            value={addressData?.data?.address?.neighborhood || ""}
            readOnly
            className="border p-2 rounded bg-gray-100 w-full"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="font-semibold text-gray-700">Cidade</label>
          <input
            type="text"
            value={addressData?.data?.address?.city || ""}
            readOnly
            className="border p-2 rounded bg-gray-100 w-full"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="font-semibold text-gray-700">Estado</label>
          <input
            type="text"
            value={addressData?.data?.address?.state || ""}
            readOnly
            className="border p-2 rounded bg-gray-100 w-full"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="font-semibold text-gray-700">CEP</label>
          <input
            type="text"
            value={addressData?.data?.address?.zipCode || ""}
            readOnly
            className="border p-2 rounded bg-gray-100 w-full"
          />
        </div>

        <div className="flex flex-col space-y-1 col-span-2">
          <label className="font-semibold text-gray-700">País</label>
          <input
            type="text"
            value={addressData?.data?.address?.country || ""}
            readOnly
            className="border p-2 rounded bg-gray-100 w-full"
          />
        </div>
      </div>

      <hr className="border-t-4" />

      <h2 className="text-1xl font-bold mb-4">Veículos</h2>

      <VehicleList />
    </div>
  );
}
