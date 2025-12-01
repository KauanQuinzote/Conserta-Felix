import Image from "next/image";

const services = [
  { title: "Troca de Óleo", img: "/oleo.png" },
  { title: "Revisão Completa", img: "/revisao.png" },
  { title: "Freios e Suspensão", img: "/freios.png" },
  { title: "Diagnóstico Eletrônico", img: "/diagnostico.png" },
  { title: "Ar Condicionado", img: "/ar-condicionado.png" },
  { title: "Alinhamento e Balanceamento", img: "/alinhamento.png" },
];

export default function ServiceList() {
  return (
    <>
      <h2 className="text-5xl font-bold mb-8 text-blue-700">Nossos Serviços</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((servico, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-6 hover:scale-105 transition"
          >
            <Image
              src={servico.img}
              alt={servico.title}
              width={120}
              height={120}
              className="mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">{servico.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
