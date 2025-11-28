'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import Card from "@/components/Card";
import Form from "@/components/Form"
import Particles from "@/components/Particles"
import ButtonGo from "@/components/ButtonGo"
import Loading from "@/components/Loading"
import Felix from "@/components/Felix"

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUpNavigation = () => {
    setIsLoading(true)
    // Simula um pequeno delay para mostrar o loading
    setTimeout(() => {
      router.push('/sign-up')
    }, 500)
  }

  return (
    <>
      {isLoading && <Loading />}
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
       <Particles />
       <Felix width={300} height={500} className="absolute right-[200px]"/>
        <Card title="Login">
        <Form>
          <Form.Field name="email" label="Email" placeholder="Digite seu email" dataType="alpha-numeric"/>
          <Form.Field name="senha" label="Senha" placeholder="Digite sua senha" dataType="alpha-numeric"/>
          <ButtonGo onClick={() => alert('Botão clicado!')} text="Entrar"/>
          <button 
            onClick={handleSignUpNavigation}
            className="absolute right-12 bottom-5 cursor-pointer text-primary-blue hover:underline bg-transparent border-none"
          >
            Cadastre-se
          </button>
        </Form>
        </Card>
      </main>
    </>
  )
}