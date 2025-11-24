'use client';
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import OrderCard from "./order_card";
import { useState, useEffect } from "react";

interface Order {
    id: number;
    client: string;
    status: string;
    total: number;
}

export default function Orders() {
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Substitua pela URL da sua API
                const response = await fetch('/api/orders');
                const data = await response.json();
                setOrders(data);
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
        <main>
            <Card width={900} return={true} title="Pedidos">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderCard
                                key={order.id}
                                id={order.id}
                                client={order.client}
                                status={order.status}
                                total={order.total}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center">Nenhum pedido encontrado</p>
                    )}
                </div>
            </Card>
        </main>
        </>
    );
}