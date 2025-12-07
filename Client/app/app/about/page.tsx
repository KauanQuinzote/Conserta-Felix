import ContactSection from "@/components/ContatoSecao";

export default function Sobre() {
  return (
    <div className="w-full bg-white pb-20">
      {/* HEADER */}
      <section className="w-full bg-white py-20 text-center shadow-md">
        <h3 className="text-4xl md:text-5xl font-extrabold text-blue-700 drop-shadow-lg uppercase ">
          Sobre a Conserta Félix
        </h3>
        <p className="mt-4 text-blue-800 text-lg md:text-xl max-w-2xl mx-auto font-medium">
          Tecnologia, qualidade e um toque de criatividade no universo da mecânica automotiva.
        </p>
      </section>

      <section className="w-full flex justify-center mt-16 px-6">
        <div className="w-full max-w-5xl grid grid-cols-1 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold text-blue-700 mb-4">
              Uma oficina criada para ser diferente
            </h2>

            <p className="text-gray-800 leading-relaxed mb-4">
              A <span className="font-bold">Conserta Félix</span> nasceu com a proposta de unir
              <span className="font-semibold text-blue-700"> serviço automotivo profissional </span>
              com uma <span className="text-rose-600 font-semibold">identidade divertida e única</span>,
              inspirada no universo doce e vibrante de <span className="font-bold">Sugar Rush</span>,
              de Detona Ralph.
            </p>

            <p className="text-gray-800 leading-relaxed mb-4">
              Aqui, cada detalhe do atendimento — da recepção ao serviço final —
              foi pensado para trazer mais conforto, transparência e confiança para você.
            </p>

            <p className="text-gray-800 leading-relaxed mb-4">
              Usamos tecnologias modernas, equipamentos precisos e processos bem definidos.
              Tudo isso com um visual lúdico e descontraído, sem perder a
              <span className="font-bold text-blue-700"> seriedade e qualidade técnica</span>
              que seu carro merece.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20 px-6">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-10">
          Nossos Valores
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-200 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">Qualidade</h3>
            <p className="text-gray-700 leading-relaxed">
              Técnicas modernas, equipamentos profissionais e serviços realizados com precisão.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-200 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">Transparência</h3>
            <p className="text-gray-700 leading-relaxed">
              Explicamos cada etapa do processo e mostramos exatamente o que seu veículo precisa.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-200 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">Atendimento Humano</h3>
            <p className="text-gray-700 leading-relaxed">
              Comunicação leve, clara e eficiente, sempre colocando o cliente em primeiro lugar.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Nossa Missão
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed text-center">
            Oferecer uma experiência automotiva completa, moderna e acolhedora,
            combinando <span className="font-bold text-blue-700">excelência técnica</span> com uma
            <span className="font-bold text-rose-600"> identidade criativa </span> 
            que transforma a manutenção do seu carro em algo simples, confiável e até divertido.
          </p>
        </div>
      </section>
        <br></br>
        <footer>
            <ContactSection/>
        </footer>
    </div>
  );
}
