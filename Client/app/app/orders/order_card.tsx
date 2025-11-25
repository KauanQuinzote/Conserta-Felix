interface OrderCardProps {
    id: number;
    client: string;
    status: string;
    total: number;
}

export default function OrderCard({ id, client, status, total }: OrderCardProps) {
    return (
        <div className="flex flex-col space-y-2 border p-4 rounded-lg shadow-sm bg-gray-50 w-full hover:bg-gray-100 transition cursor-pointer">
            <p><strong>Pedido:</strong> {id}</p>
            <p><strong>Cliente:</strong> {client}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Total:</strong> R$ {total.toFixed(2)}</p>
        </div>
    );
}