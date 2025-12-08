'use client'
import Banner from "@/components/Banner";
import WelcomeCard from "@/components/WelcomeCard";
import ServiceList from "@/components/Servicos";
import Feedbacks from "@/components/Feedbacks";
import ContactSection from "@/components/ContatoSecao";

export default function HomePage() {
  return (
    <main>

      <div className="flex justify-center h-max">
        <img src="/Banner.png" alt="Banner Conserta Félix" className="w-full object-cover md:w-[1600px]" />
      </div>


      {/* Welcome */}
      <section className="flex justify-center z-10">
        <WelcomeCard />
      </section>

      {/* Serviços */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <ServiceList />
      </section>

      {/* Depoimentos */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20">
        <Feedbacks />
      </section>

      {/* Contato */}
      <footer>
        <ContactSection />
      </footer>
    </main>
  );
}
