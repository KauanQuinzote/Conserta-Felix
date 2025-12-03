'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { UserRound } from "lucide-react"

export default function Menu() {
  const router = useRouter()

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
      border-neutral-800
      flex items-center px-6 gap-6
    ">
      
      <Link href="/app/home" className="flex items-center gap-2">
        <img src="/logo.png" alt="logo_conserta"  width={50} height={50}/>
      </Link>

      <div className="h-6 w-px bg-neutral-700"></div>

      <nav className="flex items-center gap-6">
        <Link className="px-3 py-2 rounded-lg transition hover:bg-white/50" href="/app/sobre">Sobre</Link>
        <Link className="px-3 py-2 rounded-lg transition hover:bg-white/50" href="/app/orders" onClick={userConnect}>Pedidos</Link>
        <Link className="px-3 py-2 rounded-lg transition hover:bg-white/50" href="/app/clients" onClick={userConnect}>Clientes</Link>
        <Link className="px-3 py-2 rounded-lg transition hover:bg-white/50" href="/app/vehicles" onClick={userConnect}>Veículos</Link>
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
