import Card from "@/components/Card";

export default function WelcomeCard() {
  return (
    <Card width={1900} height={180}>
      <h1 className="text-3xl font-bold text-center mb-2 text-blue-800">
        Bem-vindo à Conserta Felix!
      </h1>
      <p className="text-center text-gray-700">
        Cuidamos do seu carro como se fosse nosso. Serviços rápidos, confiáveis e com garantia!
      </p>
    </Card>
  );
}
