import { Link } from "react-router-dom";

const formatarPreco = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Carrinho({ itens, onAlterarQuantidade, onRemover, onLimpar }) {
    const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);
    const subtotal = itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
    const economia = itens.reduce(
        (total, item) =>
            item.precoAntigo ? total + (item.precoAntigo - item.preco) * item.quantidade : total,
        0
    );

    if (itens.length === 0) {
        return (
            <section className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-20 text-center">
                <span className="text-7xl" aria-hidden="true">🛒</span>
                <h1 className="font-display text-3xl font-bold text-slate-900">
                    Seu carrinho está vazio
                </h1>
                <p className="text-slate-600">
                    Adicione produtos para ver o resumo da compra aqui.
                </p>
                <Link
                    to="/produtos"
                    className="inline-flex h-11 items-center rounded-full bg-blue-700 px-6 font-semibold text-white hover:bg-blue-800"
                >
                    Ver produtos
                </Link>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="font-display text-4xl font-bold text-blue-700">Carrinho</h1>
            <p className="mt-1 text-slate-600">
                {totalItens} {totalItens === 1 ? "item" : "itens"} no carrinho
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
                <ul className="flex flex-col gap-4">
                    {itens.map((item) => (
                        <li
                            key={item.id}
                            className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
                        >
                            <div
                                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg text-5xl"
                                style={{ backgroundColor: item.cor }}
                                aria-hidden="true"
                            >
                                {item.emoji}
                            </div>

                            <div className="flex flex-1 flex-col gap-1">
                                <span className="text-sm text-slate-500">{item.categoria}</span>
                                <h2 className="text-lg font-semibold leading-tight text-slate-900">
                                    {item.nome}
                                </h2>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-bold text-blue-700">
                                        {formatarPreco(item.preco)}
                                    </span>
                                    {item.precoAntigo && (
                                        <span className="text-sm text-slate-400 line-through">
                                            {formatarPreco(item.precoAntigo)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                <div
                                    className="flex items-center rounded-full border border-slate-300"
                                    role="group"
                                    aria-label={`Quantidade de ${item.nome}`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => onAlterarQuantidade(item.id, -1)}
                                        disabled={item.quantidade <= 1}
                                        aria-label={`Diminuir quantidade de ${item.nome}`}
                                        className="h-9 w-9 rounded-full text-lg text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        −
                                    </button>
                                    <span className="w-8 text-center font-medium" aria-live="polite">
                                        {item.quantidade}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => onAlterarQuantidade(item.id, 1)}
                                        aria-label={`Aumentar quantidade de ${item.nome}`}
                                        className="h-9 w-9 rounded-full text-lg text-slate-700 hover:bg-slate-100"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-right">
                                    <p className="font-bold text-slate-900">
                                        {formatarPreco(item.preco * item.quantidade)}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => onRemover(item.id)}
                                        className="text-sm text-red-600 underline hover:text-red-800"
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 lg:sticky lg:top-6">
                    <h2 className="text-xl font-bold text-slate-900">Resumo do pedido</h2>

                    <dl className="mt-4 flex flex-col gap-2 text-slate-700">
                        <div className="flex justify-between">
                            <dt>Subtotal ({totalItens} {totalItens === 1 ? "item" : "itens"})</dt>
                            <dd>{formatarPreco(subtotal)}</dd>
                        </div>
                        {economia > 0 && (
                            <div className="flex justify-between text-green-700">
                                <dt>Você economiza</dt>
                                <dd>{formatarPreco(economia)}</dd>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <dt>Frete</dt>
                            <dd>Calculado no checkout</dd>
                        </div>
                    </dl>

                    <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg font-bold text-slate-900">
                        <span>Total</span>
                        <span>{formatarPreco(subtotal)}</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => alert("Checkout ainda não foi criado.")}
                        className="mt-6 w-full rounded-full bg-blue-700 py-3 font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    >
                        Finalizar compra
                    </button>

                    <Link
                        to="/produtos"
                        className="mt-3 block text-center text-sm text-blue-700 underline hover:text-blue-800"
                    >
                        Continuar comprando
                    </Link>

                    <button
                        type="button"
                        onClick={onLimpar}
                        className="mt-3 w-full text-center text-sm text-slate-500 underline hover:text-slate-700"
                    >
                        Esvaziar carrinho
                    </button>
                </aside>
            </div>
        </section>
    );
}