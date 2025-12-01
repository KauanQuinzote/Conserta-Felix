'use client';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import Loading from "@/components/Loading";
import OrderCard from "./order_card";
import { useState, useEffect } from "react";

type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

interface Order {
    id: string;
    service: {
        id: string;
        name: string;
        description: string;
        price: number;
    };
    status: OrderStatus;
    orderDue: string;
}

export default function Orders() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Pega o token do localStorage
                const token = localStorage.getItem('token');
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                const clientId = user.clientId;

                if (!token) {
                    console.error('Token não encontrado');
                    router.push('/sign-in');
                    return;
                }

                if (!clientId) {
                    console.error('ClientId não encontrado');
                    return;
                }

                // Imprime os dados da requisição
                console.log('=== FETCH GET ORDERS ===');
                console.log('URL:', `http://localhost:3000/api/order?clientId=${clientId}`);
                console.log('Method:', 'GET');
                console.log('Headers:', {
                    'Authorization': `Bearer ${token}`,
                });
                console.log('ClientId:', clientId);
                console.log('Token:', token);
                console.log('========================');

                const response = await fetch(`http://localhost:3000/api/order?clientId=${clientId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('Pedidos recebidos:', result);

                // O backend retorna { message, data }, então usamos result.data
                setOrders(result.data || []);
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);

            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <>
            {isLoading && <Loading />}
            <main className="container mx-auto px-4 py-8">
                {/* Header com título e botão */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Pedidos</h1>
                    <button
                        onClick={() => router.push('/app/orders/create')}
                        className="flex items-center gap-2 bg-primary-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
                    >
                        <Plus size={20} />
                        Criar Pedido
                    </button>
                </div>

                {/* Grid de cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderCard
                                key={order.id}
                                id={order.id}
                                service={order.service.name}
                                status={order.status}
                                orderDue={order.orderDue}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg mb-4">Nenhum pedido encontrado</p>
                            <button
                                onClick={() => router.push('/app/orders/create')}
                                className="text-primary-blue hover:underline"
                            >
                                Criar seu primeiro pedido
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}