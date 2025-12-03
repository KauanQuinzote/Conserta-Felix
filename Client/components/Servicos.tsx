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
      <h2 className="text-5xl font-bold mb-8 text-blue-700">Principais Serviços</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((servico, i) => (
          <Link
            key={i}
            href={servico.href}
            className="
              relative group
              bg-white rounded-xl shadow-md
              overflow-hidden cursor-pointer
              transition
            "
          >
            <Image
              src={servico.img}
              alt={servico.title}
              width={300}
              height={300}
              className="w-full h-40 object-contain p-4 transition duration-300 group-hover:scale-110"
            />

            <div
              className="
                absolute inset-0 
                bg-black/60 
                opacity-0 group-hover:opacity-100 
                flex flex-col items-center justify-center 
                transition-all duration-300
              "
            >
              <h3 className="text-white text-xl font-semibold mb-2 drop-shadow">
                {servico.title}
              </h3>

              <span className="
                text-sm text-white bg-blue-600 
                px-4 py-1 rounded-full 
                shadow-md
                hover:bg-blue-700
                transition
              ">
                Ver mais
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
