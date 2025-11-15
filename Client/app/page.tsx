'use client';
import Card from "../components/Card"
import Form from "../components/Form"
import Particles from "../components/Particles"
import ButtonGo from "../components/ButtonGo"; 

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
     <Particles />
      <Card>
      <Form>
        <Form.Field name="email" label="Email" placeholder="Digite seu email" dataType="alpha-numeric"/>
        <Form.Field name="senha" label="Senha" placeholder="Digite sua senha" dataType="alpha-numeric"/>
        <ButtonGo onClick={() => alert('Botão clicado!')} text="Entrar" />
      </Form>
      <span className="absolute right-12 bottom-6 cursor-pointer text-blue-600 hover:underline">Cadastre-se</span>
      </Card>
    </main>
  )
}