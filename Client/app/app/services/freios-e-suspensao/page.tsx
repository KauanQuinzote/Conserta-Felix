'use client';

import Link from "next/link";

export default function FreiosSuspensao() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link href="/app/home" className="text-blue-600 underline">← Voltar</Link>

      <div className="text-center mt-6">
        <img src="/freios.png" className="w-32 mx-auto" />

        <h1 className="text-3xl font-bold text-blue-700 mt-4">
          Freios e Suspensão
        </h1>

        <p className="mt-4 text-gray-700 text-lg">
          Manutenção completa para garantir estabilidade, conforto e segurança.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Inclui:</h3>
        <ul className="list-disc ml-8 text-gray-700 text-left">
          <li>Troca de pastilhas</li>
          <li>Retífica de discos</li>
          <li>Ajuste de amortecedores</li>
          <li>Verificação de bandejas e buchas</li>
        </ul>
      </div>
    </div>
  );
}
