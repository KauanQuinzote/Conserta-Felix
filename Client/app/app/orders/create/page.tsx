'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import Form from '@/components/Form';
import Loading from '@/components/Loading';

type ServiceType = 'cleaning' | 'repair' | 'maintenance' | 'installation' | 'consultation';

export default function CreateOrderPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | ''>('');
  const [orderDue, setOrderDue] = useState('');

  // Mapeamento de serviços com nomes em português e preços
  const serviceOptions = {
    cleaning: { label: 'Limpeza', price: 80.00 },
    repair: { label: 'Reparo', price: 200.00 },
    maintenance: { label: 'Manutenção', price: 150.00 },
    installation: { label: 'Instalação', price: 300.00 },
    consultation: { label: 'Consultoria', price: 120.00 }
  };  

  const handleServiceChange = (service: ServiceType) => {
    setSelectedService(service);
  };

  const handleSubmit = async (values: Record<string, string>) => {
    setIsLoading(true);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const clientId = user.clientId;

    if (!clientId) {
      alert('Erro: Cliente não identificado. Faça login novamente.');
      setIsLoading(false);
      return;
    }

    if (!selectedService) {
      alert('Selecione um tipo de serviço');
      setIsLoading(false);
      return;
    }

    if (!orderDue) {
      alert('Selecione a data e hora de entrega');
      setIsLoading(false);
      return;
    }

    const serviceConfig = serviceOptions[selectedService as ServiceType];

    // Pega o token do localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Erro: Você não está autenticado. Faça login novamente.');
      setIsLoading(false);
      router.push('/sign-in');
      return;
    }

    // Prepara os dados para enviar
    const orderData = {
      clientId: clientId,
      service: {
        name: selectedService,
        description: values.serviceDescription || '',
        price: serviceConfig.price
      },
      orderDue: new Date(orderDue).toISOString(),
      status: 'pending',
    };

    // Imprime os dados que serão enviados
    console.log('=== DADOS ENVIADOS PARA API ===');
    console.log('URL:', 'http://localhost:3000/api/order');
    console.log('Method:', 'POST');
    console.log('Headers:', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    console.log('Body:', orderData);
    console.log('Body (JSON):', JSON.stringify(orderData, null, 2));
    console.log('================================');

    try {
      const response = await fetch('http://localhost:3000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Pedido criado com sucesso!');
        console.log('Pedido criado:', data);
        router.push('/app/orders');
      } else {
        const error = await response.json();
        alert(`Erro ao criar pedido: ${error.message || 'Erro desconhecido'}`);
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
          Voltar para pedidos
        </button>

        <div className=" mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Plus className="text-primary-blue" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Criar Novo Pedido</h1>
          </div>

          <Form onSubmit={handleSubmit}>

            {/* Serviço */}
            
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                🔧 Detalhes do Serviço
              </h2>
              
              {/* Dropdown de tipo de serviço */}
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Tipo de Serviço *
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => handleServiceChange(e.target.value as ServiceType)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  required
                >
                  <option value="">Selecione um serviço...</option>
                  {Object.entries(serviceOptions).map(([key, { label, price }]) => (
                    <option key={key} value={key}>
                      {label} - R$ {price.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mostra o preço selecionado */}
              {selectedService && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-600">Preço do serviço:</p>
                  <p className="text-2xl font-bold text-primary-blue">
                    R$ {serviceOptions[selectedService as ServiceType].price.toFixed(2)}
                  </p>
                </div>
              )}

              <Form.Field
                name="serviceDescription"
                label="Observações (opcional)"
                placeholder="Descreva detalhes adicionais sobre o serviço"
                dataType="all"
              />
            

            <hr className="border-t-2 border-gray-200 my-6" />

            {/* Agendamento */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                📅 Agendamento
              </h2>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700">
                  Data e Hora de Entrega *
                </label>
                <input
                  type="datetime-local"
                  value={orderDue}
                  onChange={(e) => setOrderDue(e.target.value)}
                  className="flex px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <hr className="border-t-2 border-gray-200 my-6" />

            {/* Botões */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-primary-blue text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Criar Pedido
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
