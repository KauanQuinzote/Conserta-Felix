"use client";

import { redirect } from "next/navigation";
import ButtonReturn from "@/components/ButtonReturn";

function handleOrder() {
  redirect("/app/orders/create");
}

export default function TrocaDeOleo() {
  return (
    <div className="w-full bg-white">
      <ButtonReturn />

      <section className="w-full flex justify-center py-16">
        <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 uppercase leading-tight">
              Troca de Óleo
            </h1>

            <p className="text-gray-800 leading-relaxed mb-4">
              A <span className="font-bold">Conserta Félix</span> realiza Troca de Óleo com produtos de alta qualidade,
              garantindo lubrificação ideal e maior vida útil ao motor.
            </p>

            <p className="text-gray-800 leading-relaxed mb-4">
              O recomendado é substituir o óleo a cada{" "}
              <span className="font-bold">5.000 km a 10.000 km</span>, dependendo do veículo e do tipo de óleo utilizado.
            </p>

            <p className="text-gray-800 leading-relaxed">
              Contamos com técnicos experientes, garantindo um serviço rápido, limpo e seguro,
              sempre seguindo as especificações do fabricante.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <img
              src="/oleoexp.png"
              alt="Troca de óleo"
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
