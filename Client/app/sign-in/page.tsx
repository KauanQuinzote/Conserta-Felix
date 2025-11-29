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

  const handleLogin = async (values: Record<string, string>) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.senha,
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Salvar o token no localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem('role', data.data.user.role);
        
        // Redirecionar para a página principal ou dashboard
        router.push('/app/home');
      } else {
        const error = await response.json();
        alert(`Erro ao fazer login: ${error.message || 'Credenciais inválidas'}`);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
      alert('Erro ao conectar com a API. Verifique se o servidor está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

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
        <Card title="Login" width={450}>
        <Form onSubmit={handleLogin}>
          <Form.Field name="email" label="Email" placeholder="Digite seu email" dataType="all"/>
          <Form.Field name="senha" label="Senha" placeholder="Digite sua senha" dataType="all"/>
          <button 
            type="submit" 
            className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-semibold mb-4"
          >
            Entrar
          </button>
          <button 
            type="button"
            onClick={handleSignUpNavigation}
            className="relative cursor-pointer text-primary-blue hover:underline bg-transparent border-none ml-64"
          >
            Cadastre-se
          </button>
        </Form>
        </Card>
      </main>
    </>
  )
}