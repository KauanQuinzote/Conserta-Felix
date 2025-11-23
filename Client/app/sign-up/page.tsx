'use client';
import { useState } from 'react';
import Card from '@/components/Card';
import Particles from '@/components/Particles';
import Form from '@/components/Form';
import ButtonGo from '@/components/ButtonGo';
import Loading from '@/components/Loading';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    // Simula criação de conta
    setTimeout(() => {
      setIsLoading(false);
      alert('Conta criada!');
    }, 2000);
  };

  return (
    <>
      {isLoading && <Loading />}
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <Particles />
        <Card title="Crie sua conta" return={true}>
          <Form>
            <Form.Field name="nome" label="Nome" placeholder="Digite seu nome" dataType="alpha-numeric" />
            <Form.Field name="email" label="Email" placeholder="Digite seu email" dataType="alpha-numeric" />
            <Form.Field name="numero" label="Número (ddd + número)" placeholder="Insira seu número" dataType="numeric-symbols" />
            <Form.Field name="senha" label="Senha" placeholder="Digite sua senha" dataType="alpha-numeric" />
            <ButtonGo onClick={handleSubmit} text="Cadastrar" />
          </Form>
        </Card>
      </main>
    </>
  );
}