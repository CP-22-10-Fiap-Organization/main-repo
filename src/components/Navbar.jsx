import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
    { to: "/", label: "Início", end: true },
    { to: "/produtos", label: "Produtos" },
    { to: "/ofertas", label: "Ofertas" },
    { to: "/contato", label: "Contato" },
];

function linkClass({ isActive }) {
    return [
        "text-sm font-semibold transition-colors",
        isActive ? "text-blue-700" : "text-slate-700 hover:text-blue-700",
    ].join(" ");
}

export default function HomeNavbar({ cartCount = 0 }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-stone-50/95 backdrop-blur">
            <nav
                className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4"
                aria-label="Navegação principal"
            >
                <Link
                    to="/"
                    className="text-xl font-extrabold tracking-tight text-slate-900"
                    onClick={() => setOpen(false)}
                >
                    Quadra<span className="text-blue-700">Viva</span>
                </Link>

                {/* Desktop */}
                <ul className="hidden items-center gap-8 md:flex">
                    {links.map((item) => (
                        <li key={item.to}>
                            <NavLink to={item.to} end={item.end} className={linkClass}>
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <Link
                        to="/carrinho"
                        className="relative inline-flex h-10 items-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    >
                        Carrinho
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-300 px-1 text-xs font-bold text-slate-900">
                            {cartCount}
                        </span>
                    </Link>

                    {/* Botão mobile */}
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-900 md:hidden"
                        aria-expanded={open}
                        aria-controls="menu-mobile"
                        aria-label={open ? "Fechar menu" : "Abrir menu"}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            {open ? (
                                <path d="M6 6l12 12M18 6L6 18" />
                            ) : (
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Menu mobile */}
            {open && (
                <ul
                    id="menu-mobile"
                    className="border-t border-slate-200 bg-stone-50 px-4 py-2 md:hidden"
                >
                    {links.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.end}
                                className={(state) =>
                                    `block py-3 ${linkClass(state)}`
                                }
                                onClick={() => setOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}
