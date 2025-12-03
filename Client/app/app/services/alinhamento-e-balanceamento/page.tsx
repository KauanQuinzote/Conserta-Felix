"use client";

import { redirect } from "next/navigation";
import ButtonReturn from "@/components/ButtonReturn";

function handleOrder(){
  redirect("/app/orders/create")
}


export default function AlinhamentoBalanceamento() {
  return (
    <div className="w-full bg-white">
      <ButtonReturn></ButtonReturn>
      <section className="w-full flex justify-center py-16">
        <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

      
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 uppercase leading-tight">
              Alinhamento e Balanceamento
            </h1>

            <p className="text-gray-800 leading-relaxed mb-4">
              A <span className="font-bold">Conserta Félix</span> oferece serviços de
              Alinhamento e Balanceamento com equipamentos de alta precisão,
              garantindo dirigibilidade estável, segura e confortável.
            </p>

            <p className="text-gray-800 leading-relaxed mb-4">
              O ideal é realizar esse serviço a cada{" "}
              <span className="font-bold">10.000 km</span> para prevenir desgaste
              irregular dos pneus, consumo excessivo e desalinhamentos que afetam a
              suspensão e direção.
            </p>

            <p className="text-gray-800 leading-relaxed">
              Com profissionais especializados e tecnologia avançada, a Conserta Félix
              fornece ajustes precisos e diagnóstico detalhado para máxima segurança e economia.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <img
              src="/alinhamentoexp.png"
              alt="Alinhamento"
              className="rounded-xl shadow-lg w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center pb-16">
        <div className="w-full max-w-4xl px-6">
        <button onClick={handleOrder} className="w-full bg-blue-700 hover:bg-blue-900 transition-all text-white font-bold text-lg rounded-full py-4 shadow-lg flex items-center justify-center gap-3">
            <span>AGENDAR AGORA</span>
          </button>
        </div>
      </section>

    </div>
  );
}
