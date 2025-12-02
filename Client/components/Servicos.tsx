import Image from "next/image";
import Link from "next/link";

const services = [
  { title: "Troca de Óleo", img: "/oleo.png", href: "/app/services/troca-de-oleo" },
  { title: "Revisão Completa", img: "/revisao.png", href: "/app/services/revisao-completa" },
  { title: "Freios e Suspensão", img: "/freios.png", href: "/app/services/freios-e-suspensao" },
  { title: "Diagnóstico Eletrônico", img: "/diagnostico.png", href: "/app/services/diagnostico-eletronico" },
  { title: "Ar Condicionado", img: "/ar-condicionado.png", href: "/app/services/ar-condicionado" },
  { title: "Alinhamento e Balanceamento", img: "/alinhamento.png", href: "/app/services/alinhamento-e-balanceamento" },
];

export default function ServiceList() {
  return (
    <>
      <h2 className="text-5xl font-bold mb-8 text-blue-700">Nossos Serviços</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((servico, i) => (
          <Link 
            key={i} 
            href={servico.href} 
            className="bg-white rounded-lg shadow-md p-6 hover:scale-105 transition cursor-pointer"
          >
            <Image
              src={servico.img}
              alt={servico.title}
              width={120}
              height={120}
              className="mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {servico.title}
            </h3>
          </Link>
        ))}
      </div>
    </>
  );
}
