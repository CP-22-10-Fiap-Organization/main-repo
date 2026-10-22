import { useMemo, useState } from "react";
import Card from "../components/Card";


const PRODUTOS = [
    { id: 1, nome: "Chuteira Society Velocity", categoria: "Futebol", preco: 249.9, precoAntigo: 329.9, emoji: "👟", cor: "#dbeafe" },
    { id: 2, nome: "Bola de Campo Pro", categoria: "Futebol", preco: 129.9, emoji: "⚽", cor: "#dcfce7" },
    { id: 3, nome: "Camisa Treino Dry-Fit", categoria: "Futebol", preco: 89.9, precoAntigo: 119.9, emoji: "👕", cor: "#fee2e2" },
    { id: 4, nome: "Tênis de Corrida Aero", categoria: "Corrida", preco: 399.9, emoji: "👟", cor: "#fef3c7" },
    { id: 5, nome: "Relógio Esportivo GPS", categoria: "Corrida", preco: 549.0, precoAntigo: 699.0, emoji: "⌚", cor: "#e0e7ff" },
    { id: 6, nome: "Garrafa Térmica 750 ml", categoria: "Acessórios", preco: 59.9, emoji: "🧴", cor: "#cffafe" },
    { id: 7, nome: "Bola de Basquete Street", categoria: "Basquete", preco: 159.9, emoji: "🏀", cor: "#ffedd5" },
    { id: 8, nome: "Regata Basquete Court", categoria: "Basquete", preco: 79.9, emoji: "🎽", cor: "#fce7f3" },
    { id: 9, nome: "Halter Emborrachado 5 kg", categoria: "Academia", preco: 99.9, emoji: "🏋️", cor: "#e2e8f0" },
    { id: 10, nome: "Tapete de Yoga 6 mm", categoria: "Academia", preco: 74.9, precoAntigo: 99.9, emoji: "🧘", cor: "#ede9fe" },
    { id: 11, nome: "Mochila Esportiva 30 L", categoria: "Acessórios", preco: 139.9, emoji: "🎒", cor: "#d1fae5" },
    { id: 12, nome: "Corda de Pular Speed", categoria: "Academia", preco: 34.9, emoji: "➰", cor: "#fef9c3" },
];

const CATEGORIAS = ["Todos", "Futebol", "Corrida", "Basquete", "Academia", "Acessórios"];

export default function Produtos({ onAdicionar }) {
    const [busca, setBusca] = useState("");
    const [categoria, setCategoria] = useState("Todos");
    const [ordem, setOrdem] = useState("relevancia");
    const [aviso, setAviso] = useState("");

    const lista = useMemo(() => {
        const filtrados = PRODUTOS.filter(
            (p) =>
                (categoria === "Todos" || p.categoria === categoria) &&
                p.nome.toLowerCase().includes(busca.trim().toLowerCase())
        );
        if (ordem === "menor") return [...filtrados].sort((a, b) => a.preco - b.preco);
        if (ordem === "maior") return [...filtrados].sort((a, b) => b.preco - a.preco);
        return filtrados;
    }, [busca, categoria, ordem]);

    const adicionar = (produto) => {
        onAdicionar(produto);
        setAviso(`${produto.nome} foi adicionado ao carrinho.`);
    };

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="font-display text-4xl font-bold text-quadra">Produtos</h1>
            <p className="mt-1 text-slate-600">
                {lista.length} {lista.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>

            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
                    {CATEGORIAS.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setCategoria(c)}
                            aria-pressed={categoria === c}
                            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${categoria === c
                                    ? "border-quadra bg-quadra text-red-700"
                                    : "border-slate-300 bg-white text-slate-700 hover:border-quadra"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                        type="search"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        placeholder="Buscar produto"
                        aria-label="Buscar produto"
                        className="rounded border border-slate-300 bg-white px-3 py-2 text-sm"
                    />
                    <select
                        value={ordem}
                        onChange={(e) => setOrdem(e.target.value)}
                        aria-label="Ordenar produtos"
                        className="rounded border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                        <option value="relevancia">Mais relevantes</option>
                        <option value="menor">Menor preço</option>
                        <option value="maior">Maior preço</option>
                    </select>
                </div>
            </div>

            <p className="sr-only" role="status">{aviso}</p>

            {lista.length === 0 ? (
                <p className="mt-12 text-center text-slate-600">
                    Nenhum produto encontrado. Tente outra busca ou categoria.
                </p>
            ) : (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {lista.map((p) => (
                        <Card key={p.id} produto={p} onAdicionar={adicionar} />
                    ))}
                </div>
            )}
        </section>
    );
}
