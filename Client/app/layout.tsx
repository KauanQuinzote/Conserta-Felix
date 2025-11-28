'use client'
import '@/styles/globals.css'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className='bg-gray-200 min-h-screen'>
        {children}
      </body>
    </html>
  )
}