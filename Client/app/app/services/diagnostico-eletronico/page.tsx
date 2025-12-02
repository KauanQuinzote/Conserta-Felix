'use client';

import Link from "next/link";

export default function DiagnosticoEletronico() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link href="/app/home" className="text-blue-600 underline">← Voltar</Link>

      <div className="text-center mt-6">
        <img src="/diagnostico.png" className="w-32 mx-auto" />

        <h1 className="text-3xl font-bold text-blue-700 mt-4">
          Diagnóstico Eletrônico
        </h1>

        <p className="mt-4 text-gray-700 text-lg">
          Análise completa via scanner profissional para detectar falhas em sensores, módulos e sistemas eletrônicos.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-2">Inclui:</h3>
        <ul className="list-disc ml-8 text-gray-700 text-left">
          <li>Scanner automotivo completo</li>
          <li>Leitura de códigos de erro</li>
          <li>Relatório detalhado</li>
          <li>Reset de parâmetros (se necessário)</li>
        </ul>
      </div>
    </div>
  );
}
