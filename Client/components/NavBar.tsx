import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link href="/servicos">Serviços</Link>
        <Link href="/veiculos">Veículos</Link>
        <Link href="/pedidos">Pedidos</Link>
      </div>
    </nav>
  );
}
