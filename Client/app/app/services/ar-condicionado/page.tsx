'use client';

import Link from "next/link";

export default function ArCondicionado() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link href="/app/home" className="text-blue-600 underline">← Voltar</Link>

      <div className="text-center mt-6">
        <img src="/ar-condicionado.png" className="w-32 mx-auto" />

        <h1 className="text-3xl font-bold text-blue-700 mt-4">
          Ar Condicionado
        </h1>

        <p className="mt-4 text-gray-700 text-lg">
          Higienização, recarga e manutenção completa do sistema de ar condicionado.
        </p>

        <ul className="list-disc ml-8 text-gray-700 text-left mt-4">
          <li>Troca de filtro</li>
          <li>Recarga de gás</li>
          <li>Higienização completa</li>
          <li>Verificação do compressor</li>
        </ul>
      </div>
    </div>
  );
}
