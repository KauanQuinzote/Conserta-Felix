import Card from "@/components/Card";
import Felix from "@/components/Felix";

export default function Panel() {
    return (
        <main>
            <Card width={900} height={500}>
            <h1>Bem-vindo ao Painel</h1>
            <Felix width={300} height={300} />
            </Card>
        </main>
    );
}