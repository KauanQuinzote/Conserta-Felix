import '../styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Conserta Felix',
  description: 'Aplicação inicial com Next, Tailwind e TypeScript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}