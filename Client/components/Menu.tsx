'use client'
import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Menu() {
  const router = useRouter()

  const handleSignInNavigation = () => {
    router.push('/sign-in')
  }

  const handleProfileNavigation = () => {
    router.push('/app/profile')
  }
  const userConnect=false

  return (
    <header className="w-full bg-blue-800 text-white p-4 shadow-md h-16 flex mb-1 font-[600]">
      <ul className="flex space-x-8 absolute">
        <li className="cursor-pointer transition-all duration-500 hover:text-lg" ><Link href="/">Inicio</Link></li>
        <li className="cursor-pointer transition-all duration-500 hover:text-lg"  ><Link href="/app/orders">Pedidos</Link></li>
        <li className="cursor-pointer transition-all duration-500 hover:text-lg"  ><Link href="/app/clients">Clientes</Link></li>
        <li className="cursor-pointer transition-all duration-500 hover:text-lg"  ><Link href="/app/vehicles">Veículos</Link></li>
      </ul>
      <UserRound size={29 } color="#ffffffff" className="ml-auto mr-1" onClick={userConnect ? handleProfileNavigation : handleSignInNavigation}/>
    </header>
  );
}