'use client'
import '@/styles/globals.css'
import { ReactNode } from 'react'
import Menu from '@/components/Menu'


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className='bg-gray-200 min-h-screen'>
        {children}
      </body>
    </html>
  )
}