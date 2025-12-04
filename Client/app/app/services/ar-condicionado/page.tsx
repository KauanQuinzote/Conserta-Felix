"use client";

import { redirect } from "next/navigation";
import ButtonReturn from "@/components/ButtonReturn";

function handleOrder() {
  redirect("/app/orders/create");
}

export default function ArCondicionado() {
  return (
    <div className="w-full bg-white">
      <ButtonReturn />

      <section className="w-full flex justify-center py-16">
        <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 uppercase leading-tight">
              Ar Condicionado
            </h1>

            <p className="text-gray-800 leading-relaxed mb-4">
              Realizamos higienização, recarga de gás, troca de filtros e diagnóstico completo
              do sistema de ar-condicionado automotivo.
            </p>

            <p className="text-gray-800 leading-relaxed mb-4">
              Um sistema limpo e pressurizado garante conforto, evita odores e melhora o desempenho.
            </p>

            <p className="text-gray-800 leading-relaxed">
              Utilizamos equipamentos modernos para garantir refrigeração eficiente e segura.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <img
              src="/arcondexp.png"
              alt="Ar condicionado"
              className="rounded-xl shadow-lg w-full object-cover aspect-[4/3]"
            />
          </div>

        </div>
      </section>

      <section className="w-full flex justify-center pb-16">
        <div className="w-full max-w-4xl px-6">
          <button
            onClick={handleOrder}
            className="w-full bg-blue-700 hover:bg-blue-900 transition-all text-white font-bold text-lg rounded-full py-4 shadow-lg"
          >
            AGENDAR AGORA
          </button>
        </div>
      </section>
    </div>
  );
}
