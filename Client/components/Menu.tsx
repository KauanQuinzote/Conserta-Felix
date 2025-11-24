import { UserRound } from "lucide-react";
import Link from "next/link";
export default function Menu() {
  return (
    <header className="w-full bg-blue-800 text-white p-4 shadow-md h-16 flex mb-10 font-[600]">
      <ul className="flex space-x-8 absolute">
        <li ><Link href="/app/home">Início</Link></li>
        <li><Link href="/app/orders">Pedidos</Link></li>
        <li><Link href="/app/clients">Clientes</Link></li>
        <li><Link href="/app/vehicles">Veículos</Link></li>
      </ul>
      <Link href="/app/profile" className="ml-auto mr-1">
        <UserRound size={29} color="#ffffffff"/>
      </Link>
    </header>
  );
}