'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import Form from '@/components/Form';
import Loading from '@/components/Loading';

type VehicleType = 'car' | 'motorcycle' | 'van';

export default function CreateVehiclePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedType, setSelectedType] = useState<VehicleType | ''>('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const handleSubmit = async (values: Record<string, string>) => {
    setIsLoading(true);

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const clientId = user.clientId;

    if (!token) {
      alert('Você não está autenticado. Faça login novamente.');
      router.push('/sign-in');
      return;
    }

    if (!clientId) {
      alert('Erro: Cliente não identificado.');
      setIsLoading(false);
      return;
    }

    if (!values.placa || !values.modelo || !values.ano) {
      alert('Preencha placa, modelo e ano.');
      setIsLoading(false);
      return;
    }

    if (!selectedType) {
      alert('Selecione o tipo de veículo.');
      setIsLoading(false);
      return;
    }

    if (!selectedBrand) {
      alert('Selecione a marca do veículo.');
      setIsLoading(false);
      return;
    }

    const vehicleData = {
        clientId,
        plate: values.placa,        
        type: selectedType,          
        make: selectedBrand,
        model: values.modelo,
        year: parseInt(values.ano, 10),
    };


    console.log('=== DADOS ENVIADOS PARA API ===');
    console.log(JSON.stringify(vehicleData, null, 2));
    console.log('================================');

    try {
      const response = await fetch('http://localhost:3000/api/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vehicleData),
      });

      if (response.ok) {
        alert('Veículo cadastrado com sucesso!');
        router.push('/app/vehicles');
      } else {
        const error = await response.json();
        alert(`Erro ao cadastrar veículo: ${error.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
      alert('Erro ao conectar com a API. Verifique se o servidor está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary-blue hover:underline mb-6 font-semibold"
        >
          <ArrowLeft size={20} />
          Voltar para veículos
        </button>

        <div className="mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Plus className="text-primary-blue" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Cadastrar Veículo</h1>
          </div>

          <Form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold m-6 text-center">Cadastro do Veículo</h2>

            {/* PLACA */}
            <Form.Field
              name="placa"
              label="Placa *"
              placeholder="ABC-1234"
              dataType="alpha-numeric"
            />

            {/* TIPO */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Tipo de Veículo *
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as VehicleType)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              >
                <option value="">Selecione o tipo...</option>
                <option value="car">Carro</option>
                <option value="motorcycle">Moto</option>
                <option value="van">Van</option>
              </select>
            </div>

            {/* MARCA (select controlado) */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Marca *
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                required
              >
                <option value="">Selecione a marca...</option>
                {[
                  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Audi', 'Mercedes-Benz',
                  'Volkswagen', 'Hyundai', 'Kia', 'Nissan', 'Mazda', 'Subaru', 'Renault',
                  'Peugeot', 'Fiat', 'Jeep', 'Tesla', 'Volvo', 'Lexus', 'Yamaha', 'Suzuki',
                  'Kawasaki', 'KTM', 'Harley-Davidson', 'Ducati', 'Royal Enfield', 'Triumph',
                  'Husqvarna',
                ].map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* MODELO */}
            <Form.Field
              name="modelo"
              label="Modelo *"
              placeholder="Ex: Corolla, CB500"
              dataType="alpha-numeric"
            />

            {/* ANO */}
            <Form.Field
              name="ano"
              label="Ano *"
              placeholder="2024"
              dataType="numeric"
            />

            <hr className="border-t-2 border-gray-200 my-6" />

            {/* Botões */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-primary-blue text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Cadastrar Veículo
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Cancelar
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
