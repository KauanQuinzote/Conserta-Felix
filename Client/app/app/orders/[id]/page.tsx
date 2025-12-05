'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, User, Wrench, Calendar, CheckCircle2 } from 'lucide-react';
import Loading from '@/components/Loading';

type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

interface UserDetails {
  name: string;
  email: string;
}

interface ClientDetails {
  id: string;
  userId: string;
  user: UserDetails; 
  active: boolean;
  address: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderDetails {
  id: string;
  clientId: string;
  service: {
    name: string;
    description?: string;
    price?: number;
  };
  orderDue: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  concludedAt?: string;
  client: ClientDetails; 
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error("Token de autenticação não encontrado. Usuário não logado.");
          // Redirecionar para a página de login
          router.push('/sign-in');
          return;
        }

        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const clientId = user.clientId;

        if (!clientId) {
          alert('Erro: Cliente não identificado. Faça login novamente.');
          setIsLoading(false);
          return;
        }

        // Prepara os dados para enviar
        const orderData = {
          clientId: clientId
        };
       
        const response = await fetch(`http://localhost:3000/api/order/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        const data = await response.json();

        setOrder(data);

      } catch (error) {

        console.error('Erro ao buscar detalhes do pedido:', error);
        alert('Erro ao buscar detalhes do pedido. Por favor, tente novamente.');

      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [params.id]);

  if (isLoading) return <Loading />;
  if (!order) return <div className="p-8">Pedido não encontrado</div>;

  const statusConfig = {
    pending: { text: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
    in_progress: { text: 'Em Progresso', color: 'bg-blue-100 text-blue-800' },
    completed: { text: 'Concluído', color: 'bg-green-100 text-green-800' },
    cancelled: { text: 'Cancelado', color: 'bg-red-100 text-red-800' }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header com botão voltar */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-primary-blue hover:underline mb-6 font-semibold"
      >
        <ArrowLeft size={20} />
        Voltar para pedidos
      </button>

      {/* Card principal */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Título e Status */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Pedido #{order?.id?.slice(0, 8) || 'Carregando...'}
            </h1>
            <span className={`inline-block px-4 py-2 rounded-full font-semibold ${statusConfig[order?.status]?.color}`}>
              {statusConfig[order?.status]?.text || 'Status Desconhecido'}
            </span>
          </div>
        </div>

        {/* Grid de informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Serviço */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="text-primary-blue" size={24} />
              <h3 className="font-bold text-lg">Serviço</h3>
            </div>
            <p className="text-xl font-semibold text-gray-800 mb-2">{order.service.name}</p>
            {order.service.description && (
              <p className="text-gray-600 mb-2">{order.service.description}</p>
            )}
            {order.service.price && (
              <p className="text-primary-blue font-bold text-xl">
                R$ {order.service.price.toFixed(2)}
              </p>
            )}
          </div>

          {/* Cliente */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <User className="text-primary-blue" size={24} />
              <h3 className="font-bold text-lg">Cliente</h3>
            </div>
            <p className="text-gray-800">ID: {order.clientId}</p>
            <p className="text-gray-800">Nome: {order?.client?.user?.name}</p>
          </div>

          {/* Data de entrega */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="text-primary-blue" size={24} />
              <h3 className="font-bold text-lg">Data de Entrega</h3>
            </div>
            <p className="text-xl font-semibold text-gray-800">
              {new Date(order.orderDue).toLocaleString('pt-BR')}
            </p>
          </div>

          {/* Datas de criação/atualização */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="text-primary-blue" size={24} />
              <h3 className="font-bold text-lg">Histórico</h3>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Criado em:</strong> {new Date(order.createdAt).toLocaleString('pt-BR')}</p>
              <p><strong>Atualizado em:</strong> {new Date(order.updatedAt).toLocaleString('pt-BR')}</p>
              {order.concludedAt && (
                <p><strong>Concluído em:</strong> {new Date(order.concludedAt).toLocaleString('pt-BR')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-4">
          <button className="flex-1 bg-primary-blue text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
            Atualizar Status
          </button>
          <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold">
            Editar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
