import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const categories = [
    { slug: "futebol", label: "Futebol", color: "bg-blue-700 text-white" },
    { slug: "corrida", label: "Corrida", color: "bg-lime-300 text-slate-900" },
    { slug: "fitness", label: "Fitness", color: "bg-slate-900 text-white" },
    { slug: "ciclismo", label: "Ciclismo", color: "bg-stone-200 text-slate-900" },
];

const brands = ["Nike", "Adidas", "Puma", "Olympikus", "Mizuno", "Asics"];

// Troque por dados da sua API. Se `image` for omitido, o card mostra um placeholder.
const featured = [
    { id: 1, name: "Tênis de corrida Velocity 3", category: "Corrida", price: 449.9, oldPrice: 599.9 },
    { id: 2, name: "Chuteira society Arena Pro", category: "Futebol", price: 319.9, badge: "Novo" },
    { id: 3, name: "Camiseta dry-fit Treino", category: "Fitness", price: 89.9, oldPrice: 119.9 },
    { id: 4, name: "Bola de futebol campo Oficial", category: "Futebol", price: 159.9 },
    { id: 5, name: "Capacete de ciclismo Aero", category: "Ciclismo", price: 279.9, oldPrice: 349.9 },
    { id: 6, name: "Garrafa térmica 750 ml", category: "Fitness", price: 69.9 },
    { id: 7, name: "Shorts de corrida Leve", category: "Corrida", price: 99.9, badge: "Novo" },
    { id: 8, name: "Luva de academia Grip", category: "Fitness", price: 59.9, oldPrice: 79.9 },
];

const newArrivals = [
    { id: 9, name: "Tênis casual Urban Flex", category: "Lifestyle", price: 379.9, badge: "Novo" },
    { id: 10, name: "Jaqueta corta-vento Trilha", category: "Corrida", price: 289.9, badge: "Novo" },
    { id: 11, name: "Mochila esportiva 30 L", category: "Fitness", price: 199.9, badge: "Novo" },
    { id: 12, name: "Meião de futebol Pro", category: "Futebol", price: 39.9, badge: "Novo" },
];

const reviews = [
    {
        name: "Camila R.",
        city: "São Paulo, SP",
        text: "O tênis chegou em dois dias e serviu perfeitamente. Já estou treinando com ele para a minha primeira meia maratona.",
    },
    {
        name: "Rafael S.",
        city: "Belo Horizonte, MG",
        text: "Troquei a chuteira por um número menor sem burocracia nenhuma. Atendimento rápido e direto.",
    },
    {
        name: "Juliana M.",
        city: "Curitiba, PR",
        text: "Preço bom e parcelamento sem juros. Comprei o kit de academia completo de uma vez só.",
    },
];

export default function Home() {
    const [cartCount, setCartCount] = useState(0);
    const [toast, setToast] = useState("");

    function handleAddToCart(id) {
        const product = [...featured, ...newArrivals].find((p) => p.id === id);
        setCartCount((n) => n + 1);
        setToast(`${product?.name ?? "Produto"} foi adicionado ao carrinho`);
        window.clearTimeout(handleAddToCart.timer);
        handleAddToCart.timer = window.setTimeout(() => setToast(""), 2500);
    }

    return (
        <div className="flex min-h-screen flex-col bg-stone-50 text-slate-900">
            <Navbar cartCount={cartCount} favoritesCount={0} />

            <main className="flex-1">
                {/* Hero */}
                <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
                    <div>
                        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
                            Equipamento certo para o seu próximo treino.
                        </h1>
                        <p className="mt-5 max-w-md text-lg text-slate-600">
                            Tênis, chuteiras e roupas técnicas com até 10x sem juros e frete
                            grátis acima de R$ 299.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                to="/produtos"
                                className="inline-flex h-12 items-center rounded-full bg-blue-700 px-7 font-semibold text-white transition-colors hover:bg-blue-800"
                            >
                                Ver produtos
                            </Link>
                            <Link
                                to="/ofertas"
                                className="inline-flex h-12 items-center rounded-full border border-slate-900 px-7 font-semibold transition-colors hover:bg-slate-900 hover:text-white"
                            >
                                Ofertas da semana
                            </Link>
                        </div>
                    </div>

                    {/* Bloco visual: troque por uma foto de produto/atleta */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-blue-700">
                        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-lime-300" />
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-slate-900" />
                        <p className="absolute bottom-6 left-6 max-w-[14rem] text-2xl font-extrabold leading-tight text-white">
                            Coleção de corrida 2026
                        </p>
                    </div>
                </section>

                {/* Marcas */}
                <section aria-label="Marcas" className="border-y border-slate-200">
                    <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-6">
                        {brands.map((brand) => (
                            <li
                                key={brand}
                                className="text-lg font-extrabold text-slate-400 transition-colors hover:text-slate-900"
                            >
                                {brand}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Categorias */}
                <section className="mx-auto max-w-6xl px-4 py-16">
                    <h2 className="text-2xl font-extrabold">Compre por esporte</h2>
                    <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {categories.map((cat) => (
                            <li key={cat.slug}>
                                <Link
                                    to={`/produtos?categoria=${cat.slug}`}
                                    className={`flex h-36 items-end rounded-2xl p-5 text-xl font-extrabold transition-transform hover:-translate-y-1 ${cat.color}`}
                                >
                                    {cat.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Mais vendidos */}
                <section className="mx-auto max-w-6xl px-4 pb-20">
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl font-extrabold">Mais vendidos</h2>
                        <Link
                            to="/produtos"
                            className="text-sm font-semibold text-blue-700 hover:underline"
                        >
                            Ver todos
                        </Link>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
                        {featured.map((product) => (
                            <Card
                                key={product.id}
                                {...product}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                </section>

                {/* Banners promocionais */}
                <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-20 md:grid-cols-2">
                    <Link
                        to="/ofertas"
                        className="flex min-h-64 flex-col justify-end rounded-3xl bg-lime-300 p-8 transition-transform hover:-translate-y-1"
                    >
                        <p className="text-3xl font-extrabold leading-tight">
                            Até 40% de desconto em tênis de corrida
                        </p>
                        <p className="mt-2 text-slate-800">Somente até domingo.</p>
                        <span className="mt-5 inline-flex h-11 w-fit items-center rounded-full bg-slate-900 px-6 text-sm font-semibold text-white">
                            Aproveitar ofertas
                        </span>
                    </Link>

                    <Link
                        to="/produtos?categoria=futebol"
                        className="flex min-h-64 flex-col justify-end rounded-3xl bg-blue-700 p-8 text-white transition-transform hover:-translate-y-1"
                    >
                        <p className="text-3xl font-extrabold leading-tight">
                            Monte o kit completo do seu time
                        </p>
                        <p className="mt-2 text-blue-100">
                            Camisa, calção e meiões com preço especial na compra do conjunto.
                        </p>
                        <span className="mt-5 inline-flex h-11 w-fit items-center rounded-full bg-white px-6 text-sm font-semibold text-slate-900">
                            Ver futebol
                        </span>
                    </Link>
                </section>

                {/* Lançamentos */}
                <section className="mx-auto max-w-6xl px-4 pb-20">
                    <div className="flex items-end justify-between">
                        <h2 className="text-2xl font-extrabold">Acabaram de chegar</h2>
                        <Link
                            to="/produtos?ordem=recentes"
                            className="text-sm font-semibold text-blue-700 hover:underline"
                        >
                            Ver lançamentos
                        </Link>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
                        {newArrivals.map((product) => (
                            <Card
                                key={product.id}
                                {...product}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                </section>

                {/* Depoimentos */}
                <section className="bg-stone-100">
                    <div className="mx-auto max-w-6xl px-4 py-16">
                        <h2 className="text-2xl font-extrabold">
                            Quem treina com a gente
                        </h2>
                        <ul className="mt-8 grid gap-6 md:grid-cols-3">
                            {reviews.map((review) => (
                                <li key={review.name} className="rounded-2xl bg-white p-6">
                                    <blockquote className="leading-relaxed text-slate-700">
                                        {review.text}
                                    </blockquote>
                                    <p className="mt-5 font-bold">{review.name}</p>
                                    <p className="text-sm text-slate-500">{review.city}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Faixa de benefícios */}
                <section className="bg-slate-900 text-white">
                    <ul className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm sm:grid-cols-3">
                        <li>
                            <p className="font-bold text-lime-300">Frete grátis</p>
                            <p className="mt-1 text-slate-300">Em compras acima de R$ 299.</p>
                        </li>
                        <li>
                            <p className="font-bold text-lime-300">Troca em 30 dias</p>
                            <p className="mt-1 text-slate-300">Não serviu? Devolvemos o valor.</p>
                        </li>
                        <li>
                            <p className="font-bold text-lime-300">10x sem juros</p>
                            <p className="mt-1 text-slate-300">No cartão de crédito.</p>
                        </li>
                    </ul>
                </section>
            </main>

            <Footer />

            {/* Aviso ao adicionar ao carrinho */}
            <div
                role="status"
                aria-live="polite"
                className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 px-4"
            >
                {toast && (
                    <p className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg">
                        {toast}
                    </p>
                )}
            </div>
        </div>
    );
}