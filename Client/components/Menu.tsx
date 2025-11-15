import { UserRound } from "lucide-react";

export default function Menu() {
  return (
    <header className="w-full bg-blue-800 text-white p-4 shadow-md h-16 flex mb-10 font-[600] bg-gradient-to-tr from-blue-800 to-emerald-400">
      <ul className="flex space-x-8 absolute">
        <li className="cursor-pointer transition-all duration-500 hover:text-lg">Início</li>
        <li className="cursor-pointer transition-all duration-500 hover:text-lg">Pedidos</li>
        <li className="cursor-pointer transition-all duration-500 hover:text-lg">Clientes</li>
        <li className="cursor-pointer transition-all duration-500 hover:text-lg">Veículos</li>
      </ul>
      <UserRound size={29 } color="#ffffffff" className="ml-auto mr-1"/>
    </header>
  );
}