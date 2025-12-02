'use client';

import Link from "next/link";
import Card from "@/components/Card";

export default function AlinhamentoBalanceamento() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <Card width={600} height={800}>
        <div className="text-center mt-6">
          <img src="/alinhamento.png" className="w-32 mx-auto" />

          <h1 className="text-3xl font-bold text-blue-700 mt-4">
            Alinhamento e Balanceamento
          </h1>

          <p className="mt-4 text-gray-700 text-lg">
            Mantém o carro estável, seguro e evita desgaste irregular dos pneus.
          </p>

          <ul className="list-disc ml-8 text-gray-700 text-left mt-4">
            <li>Alinhamento 3D</li>
            <li>Balanceamento das rodas</li>
            <li>Correção de cambagem (se necessário)</li>
            <li>Relatório final</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
