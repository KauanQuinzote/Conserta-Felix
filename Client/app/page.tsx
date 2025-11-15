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
        <Form.Field name="email" label="Email" placeholder="Digite seu email"/>
        <Form.Field name="senha" label="Senha" placeholder="Digite sua senha"/>
        <ButtonGo onClick={() => alert('Botão clicado!')} text="Entrar" />
      </Form>
      <span>Cadastre-se</span>
      </Card>
    </main>
  )
}