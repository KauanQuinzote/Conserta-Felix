'use client'
import { Cog } from 'lucide-react'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
      <Cog 
        size={200} 
        className="animate-spin text-primary-blue mb-4" 
      />
      <p className="text-xl text-gray-700 animate-pulse">Carregando...</p>
    </div>
  );
}