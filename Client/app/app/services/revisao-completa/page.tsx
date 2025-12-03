"use client";

import { redirect } from "next/navigation";
import ButtonReturn from "@/components/ButtonReturn";

function handleOrder() {
  redirect("/app/orders/create");
}

export default function RevisaoCompleta() {
  return (
    <div className="w-full bg-white">
      <ButtonReturn />

      <section className="w-full flex justify-center py-16">
        <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 uppercase leading-tight">
              Revisão Completa
            </h1>

            <p className="text-gray-800 leading-relaxed mb-4">
              A Revisão Completa da <span className="font-bold">Conserta Félix</span> garante diagnóstico preventivo
              e corretivo de todos os sistemas essenciais do veículo.
            </p>

            <p className="text-gray-800 leading-relaxed mb-4">
              Realizamos inspeção minuciosa de freios, suspensão, motor, fluidos, alinhamento,
              filtros, bateria e muito mais.
            </p>

            <p className="text-gray-800 leading-relaxed">
              Ideal para manter o carro seguro, econômico e com desempenho máximo.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <img
              src="/revisaoexp.png"
              alt="Revisão Completa"
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
