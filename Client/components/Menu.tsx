'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserRound, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export default function Menu() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [openServices, setOpenServices] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setOpenServices(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setOpenServices(false), 300); // 300ms de delay
    setTimeoutId(id);
  };

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      if (user?.isAdmin) setIsAdmin(true)
    } catch (error) {
      console.error("Erro ao verificar admin:", error)
    }
  }, [])

  const userConnect = () => {
    try {
      const token = localStorage.getItem("token")
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      const clientId = user.clientId

      if (!token) return router.push("/sign-in")
      if (!clientId) return console.error("ClientId não encontrado")

      router.push("/app/profile")
    } catch (error) {
      console.error("Erro na função userConnect:", error)
      router.push("/sign-in")
    }
  }

  return (
    <header className="
      w-full h-16 
      bg-blue-700 text-white 
      flex items-center px-6 gap-6
      relative
      font-bold
    ">

      <Link href="/app/home" className="flex items-center gap-2">
        <img src="/logo.png" alt="logo_conserta" width={50} height={50} />
      </Link>

      <div className="h-6 w-px bg-neutral-700"></div>

      <nav className="flex items-center gap-6 relative">

        <Link className="px-3 py-2 rounded-lg transition hover:bg-white/50" href="/app/about">
          Sobre
        </Link>

        <Link className="px-3 py-2 rounded-lg transition hover:bg-white/50" href="/app/orders" onClick={userConnect}>
          Pedidos
        </Link>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-white/50 transition">
            Serviços
            <ChevronDown size={16} />
          </button>

          {openServices && (
            <div className="
              absolute top-full left-0 mt-2 
              bg-white text-black rounded-lg shadow-lg 
              w-56 py-2 z-[100] font-normal
            ">
              <Link href="/app/services/troca-de-oleo" className="block px-4 py-2 hover:bg-gray-200">Troca de Óleo</Link>
              <Link href="/app/services/revisao-completa" className="block px-4 py-2 hover:bg-gray-200">Revisão Completa</Link>
              <Link href="/app/services/freios-e-suspensao" className="block px-4 py-2 hover:bg-gray-200">Freios e Suspensão</Link>
              <Link href="/app/services/diagnostico-eletronico" className="block px-4 py-2 hover:bg-gray-200">Diagnóstico Eletrônico</Link>
              <Link href="/app/services/ar-condicionado" className="block px-4 py-2 hover:bg-gray-200">Ar Condicionado</Link>
              <Link href="/app/services/alinhamento-e-balanceamento" className="block px-4 py-2 hover:bg-gray-200">Alinhamento e Balanceamento</Link>
            </div>
          )}
        </div>

        {isAdmin && (
          <Link className="px-3 py-2 rounded-lg transition hover:bg-white/50" href="/app/clients" onClick={userConnect}>
            Clientes
          </Link>
        )}

        <Link className="px-3 py-2 rounded-lg transition hover:bg-white/50" href="/app/vehicles" onClick={userConnect}>
          Veículos
        </Link>
      </nav>

      <div className="ml-auto">
        <UserRound
          size={28}
          className="cursor-pointer hover:text-blue-900 transition"
          onClick={userConnect}
        />
      </div>

    </header>
  )
}
