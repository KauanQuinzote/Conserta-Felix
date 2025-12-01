const testimonials = [
  {
    nome: "Carlos A.",
    texto: "Excelente atendimento! Resolveram rápido o problema do meu carro.",
  },
  {
    nome: "Fernanda M.",
    texto: "Oficina super confiável e preços justos. Recomendo!",
  },
  {
    nome: "João P.",
    texto: "Equipe atenciosa e serviço de qualidade. Voltarei com certeza.",
  },
];

export default function Feedbacks() {
  return (
    <div className="max-w-5xl mx-auto text-center px-6">
      <h2 className="text-5xl font-bold text-blue-700 mb-8">
        O que dizem nossos clientes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((dep, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic">"{dep.texto}"</p>
            <p className="mt-4 font-semibold text-blue-800">— {dep.nome}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
