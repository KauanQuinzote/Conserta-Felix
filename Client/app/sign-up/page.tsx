'use client';
import { useState } from 'react';
import Particles from '@/components/Particles';
import Form from '@/components/Form';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (values: Record<string, string>) => {
    setIsLoading(true);
    
    try {
      // Chamada para a API
      const response = await fetch('http://localhost:3000/api/account/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.nome,
          email: values.email,
          password: values.senha,
          vehicles: [{
            plate: values.placa,
            type: values.tipo,
            make: values.marca,
            model: values.modelo,
            year: parseInt(values.ano)
          }],
          adress: {
            street: values.street,
            number: parseInt(values.number),
            neighborhood: values.neighborhood,
            city: values.city,
            state: values.state,
            zipCode: values.zipCode || undefined,
            country: values.country || undefined
          }
        })
      });
      console.log(values);

      if (response.ok) {
        const data = await response.json();
        alert('Conta criada com sucesso!');
        console.log('Resposta da API:', data);
        router.push('/sign-in');

      } else {
        const error = await response.json();
        alert(`Erro ao criar conta: ${error.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
      alert('Erro ao conectar com a API. Verifique se o servidor está rodando.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      {isLoading && <Loading />}
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <Particles />
        <section className="mb-8 items-center justify-center w-4/5 flex">
          <Form onSubmit={handleSubmit}>
            <Form.Field name="nome" label="Nome" placeholder="Digite seu nome" />
            <Form.Field name="email" label="Email" placeholder="Digite seu email" dataType="all"/>
            <Form.Field name="numero" label="Número (ddd + número)" placeholder="Insira seu número" dataType="numeric-symbols" />
            <Form.Field name="senha" label="Senha" placeholder="Digite sua senha" dataType="alpha-numeric" />
            <hr className='border-t-4'></hr>
              <h2 className="text-lg font-semibold m-6 text-center">Cadastro do Veículo</h2>
              <Form.Field name="placa" label="Placa" placeholder="ABC-1234" dataType="alpha-numeric" />
              <Form.Dropdown 
                name="tipo" 
                label="Tipo de Veículo"
                options={['Car', 'Motorcycle', 'Van']}
              />
              <Form.Dropdown 
                name="marca" 
                label="Marca"
                options={[
                  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Audi', 'Mercedes-Benz',
                  'Volkswagen', 'Hyundai', 'Kia', 'Nissan', 'Mazda', 'Subaru', 'Renault',
                  'Peugeot', 'Fiat', 'Jeep', 'Tesla', 'Volvo', 'Lexus', 'Yamaha', 'Suzuki',
                  'Kawasaki', 'KTM', 'Harley-Davidson', 'Ducati', 'Royal Enfield', 'Hero',
                  'Bajaj', 'Triumph', 'Husqvarna', 'Aprilia', 'MV Agusta', 'Citroën', 'Iveco'
                ]}
              />
              <Form.Field name="modelo" label="Modelo" placeholder="Modelo do veículo" dataType="alpha-numeric" />
              <Form.Field name="ano" label="Ano" placeholder="2024" dataType="numeric" />
            <hr className='border-t-4'></hr>
              <h2 className="text-lg font-semibold m-6 text-center">Endereço</h2>
              <Form.Field name="street" label="Rua" placeholder="Nome da rua"/>
              <Form.Field name="number" label="Número" placeholder="123" dataType="numeric" />
              <Form.Field name="neighborhood" label="Bairro" placeholder="Nome do bairro"/>
              <Form.Field name="city" label="Cidade" placeholder="Nome da cidade"/>
              <Form.Field name="state" label="Estado" placeholder="UF" dataType="alphabetic" maxLength={2} />
              <Form.Field name="zipCode" label="CEP (opcional)" placeholder="12345-678" dataType="numeric-symbols" />
              <Form.Field name="country" label="País (opcional)" placeholder="Brasil" dataType="alphabetic" />
            <button 
              type="submit" 
              className="w-full bg-primary-blue text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Cadastrar
            </button>
          </Form>
        </section>
      </main>
    </>
  );
}