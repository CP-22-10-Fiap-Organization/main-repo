
const formatarPreco = (valor) =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

export default function Card({ produto, onAdicionar }) {
    const { nome, categoria, preco, precoAntigo, emoji, cor } = produto;

    const desconto = precoAntigo
        ? Math.round((1 - preco / precoAntigo) * 100)
        : null;

    return (
        <article className="flex flex-col overflow-hidden rounded-lg border border-lime-200 bg-blue-700">
            <div
                className="relative flex h-44 items-center justify-center text-7xl"
                style={{ backgroundColor: cor }}
                aria-hidden="true"
            >
                {emoji}

                {desconto && (
                    <span className="absolute left-3 top-3 rounded bg-pista px-2 py-0.5 text-sm font-bold text-black">
                        -{desconto}%
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-1 p-4">
                <span className="text-sm text-white">{categoria}</span>

                <h3 className="font-display text-xl font-semibold leading-tight text-white">
                    {nome}
                </h3>

                <div className="mt-auto pt-3">
                    {precoAntigo && (
                        <p className="text-sm text-slate-200 line-through">
                            {formatarPreco(precoAntigo)}
                        </p>
                    )}

                    <p className="text-xl font-bold text-quadra">
                        {formatarPreco(preco)}
                    </p>

                    <button
                        type="button"
                        onClick={() => onAdicionar(produto)}
                        className="mt-3 w-full rounded bg-quadra py-2 font-medium text-black transition-colors hover:bg-pista focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pista"
                    >
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </article>
    );
}
