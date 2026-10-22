import { Link } from "react-router-dom";

const columns = [
  {
    title: "Esportes",
    links: [
      { to: "/produtos?categoria=futebol", label: "Futebol" },
      { to: "/produtos?categoria=corrida", label: "Corrida" },
      { to: "/produtos?categoria=fitness", label: "Fitness" },
      { to: "/produtos?categoria=ciclismo", label: "Ciclismo" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { to: "/trocas", label: "Trocas e devoluções" },
      { to: "/entregas", label: "Prazos de entrega" },
      { to: "/guia-de-tamanhos", label: "Guia de tamanhos" },
      { to: "/contato", label: "Fale conosco" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { to: "/sobre", label: "Sobre nós" },
      { to: "/lojas", label: "Nossas lojas" },
      { to: "/privacidade", label: "Privacidade" },
      { to: "/termos", label: "Termos de uso" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link to="/" className="text-xl font-extrabold text-white">
            Quadra<span className="text-lime-300">Viva</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Tênis, roupas e equipamentos para quem treina de verdade. Frete
            grátis em compras acima de R$ 299.
          </p>

          <form
            className="mt-6 flex max-w-sm gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="newsletter" className="sr-only">
              Seu e-mail
            </label>
            <input
              id="newsletter"
              type="email"
              placeholder="Seu e-mail"
              className="h-11 min-w-0 flex-1 rounded-full border border-slate-600 bg-transparent px-4 text-sm text-white placeholder:text-slate-500 focus:border-lime-300 focus:outline-none"
            />
            <button
              type="submit"
              className="h-11 rounded-full bg-lime-300 px-5 text-sm font-bold text-slate-900 transition-colors hover:bg-lime-200"
            >
              Assinar
            </button>
          </form>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-sm font-bold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="transition-colors hover:text-lime-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-slate-800">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-slate-500">
          © {new Date().getFullYear()} QuadraViva Artigos Esportivos. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  );
}