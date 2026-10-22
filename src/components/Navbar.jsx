import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const categories = [
    { slug: "futebol", label: "Futebol" },
    { slug: "corrida", label: "Corrida" },
    { slug: "fitness", label: "Fitness" },
    { slug: "ciclismo", label: "Ciclismo" },
];

const baseLink = "text-sm font-semibold transition-colors";
const activeClass = "text-blue-700";
const idleClass = "text-slate-700 hover:text-blue-700";

function Icon({ children }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

const SearchIcon = () => (
    <Icon>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
    </Icon>
);
const UserIcon = () => (
    <Icon>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </Icon>
);
const HeartIcon = () => (
    <Icon>
        <path d="M12 20s-7-4.4-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.6-9 9-9 9z" />
    </Icon>
);
const BagIcon = () => (
    <Icon>
        <path d="M5 8h14l-1 12H6L5 8z" />
        <path d="M9 8a3 3 0 016 0" />
    </Icon>
);

function Badge({ count }) {
    if (!count) return null;
    return (
        <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-300 px-1 text-xs font-bold text-slate-900">
            {count}
        </span>
    );
}

function SearchForm({ className = "", onDone }) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const term = query.trim();
        if (!term) return;
        navigate(`/produtos?busca=${encodeURIComponent(term)}`);
        setQuery("");
        onDone?.();
    }

    return (
        <form onSubmit={handleSubmit} role="search" className={className}>
            <label htmlFor="busca" className="sr-only">
                Buscar produtos
            </label>
            <div className="relative">
                <input
                    id="busca"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar tênis, camisas, bolas..."
                    className="h-11 w-full rounded-full border border-slate-300 bg-white pl-5 pr-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none"
                />
                <button
                    type="submit"
                    aria-label="Buscar"
                    className="absolute right-1 top-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-blue-700"
                >
                    <SearchIcon />
                </button>
            </div>
        </form>
    );
}

function IconLink({ to, label, count, children }) {
    return (
        <Link
            to={to}
            aria-label={label}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-900 transition-colors hover:bg-slate-200"
        >
            {children}
            <Badge count={count} />
        </Link>
    );
}

export default function HomeNavbar({ cartCount = 0, favoritesCount = 0 }) {
    const [open, setOpen] = useState(false);
    const { pathname, search } = useLocation();

    const isCategoryActive = (slug) =>
        pathname === "/produtos" &&
        new URLSearchParams(search).get("categoria") === slug;

    const categoryClass = (slug) =>
        `${baseLink} ${isCategoryActive(slug) ? activeClass : idleClass}`;

    const navLinkClass = ({ isActive }) =>
        `${baseLink} ${isActive ? activeClass : idleClass}`;

    const close = () => setOpen(false);

    return (
        <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur">
            {/* Barra de avisos */}
            <div className="bg-slate-900 text-xs text-slate-200">
                <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4 py-2 text-center">
                    <span>
                        <strong className="text-lime-300">Frete grátis</strong> em compras
                        acima de R$ 299
                    </span>
                    <span className="hidden sm:inline">
                        <strong className="text-lime-300">10x sem juros</strong> no cartão
                    </span>
                </div>
            </div>

            {/* Linha principal */}
            <nav
                className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4"
                aria-label="Navegação principal"
            >
                <Link
                    to="/"
                    onClick={close}
                    className="shrink-0 text-xl font-extrabold tracking-tight text-slate-900"
                >
                    Quadra<span className="text-blue-700">Viva</span>
                </Link>

                <SearchForm className="mx-4 hidden max-w-xl flex-1 md:block" />

                <div className="ml-auto flex items-center gap-1">
                    <Link
                        to="/login"
                        className="mr-1 hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200 lg:inline-flex"
                    >
                        <UserIcon />
                        Entrar
                    </Link>
                    <IconLink
                        to="/favoritos"
                        label="Favoritos"
                        count={favoritesCount}
                    >
                        <HeartIcon />
                    </IconLink>
                    <IconLink to="/carrinho" label="Carrinho" count={cartCount}>
                        <BagIcon />
                    </IconLink>

                    <button
                        type="button"
                        className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-900 md:hidden"
                        aria-expanded={open}
                        aria-controls="menu-mobile"
                        aria-label={open ? "Fechar menu" : "Abrir menu"}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <Icon>
                            {open ? (
                                <path d="M6 6l12 12M18 6L6 18" />
                            ) : (
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            )}
                        </Icon>
                    </button>
                </div>
            </nav>

            {/* Linha de categorias (desktop) */}
            <div className="hidden border-y border-slate-200 md:block">
                <ul className="mx-auto flex h-11 max-w-6xl items-center gap-8 px-4">
                    <li>
                        <NavLink to="/produtos" end className={navLinkClass}>
                            Todos os produtos
                        </NavLink>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat.slug}>
                            <Link
                                to={`/produtos?categoria=${cat.slug}`}
                                className={categoryClass(cat.slug)}
                                aria-current={isCategoryActive(cat.slug) ? "page" : undefined}
                            >
                                {cat.label}
                            </Link>
                        </li>
                    ))}
                    <li className="ml-auto">
                        <NavLink
                            to="/ofertas"
                            className={({ isActive }) =>
                                `${baseLink} rounded-full px-3 py-1 ${isActive
                                    ? "bg-blue-700 text-white"
                                    : "bg-lime-300 text-slate-900 hover:bg-lime-200"
                                }`
                            }
                        >
                            Ofertas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contato" className={navLinkClass}>
                            Contato
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Menu mobile */}
            {open && (
                <div
                    id="menu-mobile"
                    className="border-t border-slate-200 bg-stone-50 px-4 pb-4 pt-3 md:hidden"
                >
                    <SearchForm onDone={close} />

                    <ul className="mt-2">
                        <li>
                            <NavLink
                                to="/produtos"
                                end
                                className={(s) => `block py-3 ${navLinkClass(s)}`}
                                onClick={close}
                            >
                                Todos os produtos
                            </NavLink>
                        </li>
                        {categories.map((cat) => (
                            <li key={cat.slug}>
                                <Link
                                    to={`/produtos?categoria=${cat.slug}`}
                                    className={`block py-3 ${categoryClass(cat.slug)}`}
                                    onClick={close}
                                >
                                    {cat.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <NavLink
                                to="/ofertas"
                                className={(s) => `block py-3 ${navLinkClass(s)}`}
                                onClick={close}
                            >
                                Ofertas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contato"
                                className={(s) => `block py-3 ${navLinkClass(s)}`}
                                onClick={close}
                            >
                                Contato
                            </NavLink>
                        </li>
                    </ul>

                    <Link
                        to="/login"
                        onClick={close}
                        className="mt-3 flex h-11 items-center justify-center gap-2 rounded-full bg-slate-900 text-sm font-semibold text-white"
                    >
                        <UserIcon />
                        Entrar ou cadastrar
                    </Link>
                </div>
            )}
        </header>
    );
}