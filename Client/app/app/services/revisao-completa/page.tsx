'use client';

import Link from "next/link";

export default function RevisaoCompleta() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link href="/app/home" className="text-blue-600 underline">← Voltar</Link>

      <div className="text-center mt-6">
        <img src="/revisao.png" className="w-32 mx-auto" />

        <h1 className="text-3xl font-bold text-blue-700 mt-4">
          Revisão Completa
        </h1>

        <p className="mt-4 text-gray-700 text-lg">
          Revisão geral com análise dos principais sistemas do veículo para evitar falhas e garantir segurança.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Inclui:</h3>
        <ul className="list-disc ml-8 text-gray-700 text-left">
          <li>Verificação de fluidos</li>
          <li>Troca de filtros</li>
          <li>Scanner de diagnóstico</li>
          <li>Inspeção dos freios</li>
        </ul>
      </div>
    </div>
  );
}
