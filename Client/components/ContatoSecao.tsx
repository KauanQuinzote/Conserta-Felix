export default function ContactSection() {
  return (
    <section className="w-full py-16 bg-blue-900 text-white text-center">

      <div className="mt-8 max-w-4xl mx-auto">
        <iframe
          title="mapa"
          src="https://www.google.com/maps/embed?pb=!1m18..."
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">Entre em Contato</h2>
      <p>📞 (11) 99999-9999 | ✉️ contato@consertafelix.com.br</p>
      <p className="mt-2">📍 Rua dos Motores, 123 — São Paulo, SP</p>
    </section>
  );
}
