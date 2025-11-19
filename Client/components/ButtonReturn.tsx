'use client'
import { ArrowBigLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ButtonReturnProps {
  href?: string; // Rota específica (ex: "/home")
  useHistory?: boolean; // Se deve usar history.back() do navegador
}

export default function ButtonReturn({ href, useHistory = true }: ButtonReturnProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else if (useHistory) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <button 
      onClick={handleClick}
      className="relative p-2 flex items-center gap-2 cursor-pointer text-blue-500 group"
    >
      <ArrowBigLeft 
        size={27} 
        className="transition-transform duration-300 ease-in-out group-hover:scale-110" 
      />
    </button>
  );
}