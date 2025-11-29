'use client';
import { useRouter } from 'next/navigation';
import { Clock, AlertCircle, CheckCircle2, XCircle, Wrench } from 'lucide-react';

type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

interface OrderCardProps {
  id: string;
  service: string;
  status: OrderStatus;
  orderDue: string; // ISO string date
}

export default function OrderCard({ id, service, status, orderDue }: OrderCardProps) {
  const router = useRouter();

  const statusConfig = {
    pending: {
      icon: Clock,
      text: 'Pendente',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200'
    },
    in_progress: {
      icon: Wrench,
      text: 'Em Progresso',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    completed: {
      icon: CheckCircle2,
      text: 'Concluído',
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200'
    },
    cancelled: {
      icon: XCircle,
      text: 'Cancelado',
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;
  
  // Formata a data
  const dueDate = new Date(orderDue);
  const isOverdue = dueDate < new Date() && status !== 'completed';

  const handleClick = () => {
    alert(`Navegando para detalhes do pedido ${id}`);
    router.push(`/app/orders/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative p-4 rounded-lg border-2 cursor-pointer
        transition-all duration-200 hover:shadow-lg hover:-translate-y-1
        ${config.bg} ${config.border}
      `}
    >
      {/* ID do Pedido */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg text-gray-800">
          Pedido #{id.slice(0, 8)}
        </h3>
        {isOverdue && (
          <span className="flex items-center gap-1 text-red-600 text-sm font-semibold">
            <AlertCircle size={16} />
            Atrasado
          </span>
        )}
      </div>

      {/* Serviço */}
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">Serviço:</p>
        <p className="font-semibold text-gray-800">{service}</p>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-3">
        <StatusIcon size={20} className={config.color} />
        <span className={`font-semibold ${config.color}`}>
          {config.text}
        </span>
      </div>

      {/* Data de entrega */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock size={16} />
        <span>
          Entrega: {dueDate.toLocaleDateString('pt-BR')}
        </span>
      </div>
    </div>
  );
}
