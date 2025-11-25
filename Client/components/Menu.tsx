import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Menu() {
  const router = useRouter()

  const handleSignInNavigation = () => {
    router.push('/sign-in')
  }

  return (
    <header className="w-full bg-blue-800 text-white p-4 shadow-md h-16 flex mb-1 font-[600]">
      <ul className="flex space-x-8 absolute">
        <li className="cursor-pointer transition-all duration-500 hover:text-lg" ><Link href="/">Inicio</Link></li>
        <li className="cursor-pointer transition-all duration-500 hover:text-lg"  ><Link href="/app/pedidos">Pedidos</Link></li>
        <li className="cursor-pointer transition-all duration-500 hover:text-lg"  ><Link href="/app/clientes">Clientes</Link></li>
        <li className="cursor-pointer transition-all duration-500 hover:text-lg"  ><Link href="/app/veiculos">Veículos</Link></li>
      </ul>
      <UserRound size={29 } color="#ffffffff" className="ml-auto mr-1" onClick={handleSignInNavigation}/>
    </header>
  );
}