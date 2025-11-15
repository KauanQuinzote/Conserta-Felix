'use client'
import '@/styles/globals.css'
import { ReactNode } from 'react'
import Menu from '@/components/Menu'


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className='bg-gray-200 min-h-screen'>
        <Menu/>
        <section className='flex justify-center items-center pb-8'>
            {children}
        </section>
        
      </body>
    </html>
  )
}