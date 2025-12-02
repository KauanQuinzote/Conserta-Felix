'use client';

import Link from "next/link";

export default function TrocaDeOleo() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link href="/app/home" className="text-blue-600 underline">← Voltar</Link>

      <div className="text-center mt-6">
        <img src="/oleo.png" className="w-32 mx-auto" />

        <h1 className="text-3xl font-bold text-blue-700 mt-4">
          Troca de Óleo
        </h1>

        <p className="mt-4 text-gray-700 text-lg">
          A troca periódica de óleo garante lubrificação adequada, reduz atrito,
          evita superaquecimento e prolonga a vida útil do motor.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">O que está incluso:</h3>
        <ul className="list-disc ml-8 text-gray-700 text-left">
          <li>Troca completa de óleo</li>
          <li>Troca do filtro de óleo</li>
          <li>Verificação de vazamentos</li>
          <li>Limpeza externa do motor</li>
        </ul>

        <div className="mt-8 bg-blue-100 p-4 rounded-lg">
          <strong className="text-blue-800">Recomendação:</strong>
          <p>Trocar a cada 5.000 km ou conforme o manual do veículo.</p>
        </div>
      </div>
    </div>
  );
}
