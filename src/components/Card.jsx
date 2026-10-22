import { Link } from "react-router-dom";

const brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export default function Card({
    id,
    name,
    category,
    price,
    oldPrice,
    image,
    badge,
    onAddToCart,
}) {
    const discount =
        oldPrice && oldPrice > price
            ? Math.round(((oldPrice - price) / oldPrice) * 100)
            : null;

    return (
        <article className="group flex flex-col">
            <Link
                to={`/produtos/${id}`}
                className="relative block aspect-square overflow-hidden rounded-2xl bg-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                aria-label={`Ver ${name}`}
            >
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div
                        className="flex h-full w-full items-center justify-center text-7xl font-extrabold text-stone-400"
                        aria-hidden="true"
                    >
                        {name.charAt(0)}
                    </div>
                )}

                {(badge || discount) && (
                    <span className="absolute left-3 top-3 rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-slate-900">
                        {badge ?? `-${discount}%`}
                    </span>
                )}
            </Link>

            <div className="mt-3 flex flex-1 flex-col">
                <p className="text-xs text-slate-500">{category}</p>
                <h3 className="mt-0.5 text-base font-semibold leading-snug text-slate-900">
                    <Link to={`/produtos/${id}`} className="hover:text-blue-700">
                        {name}
                    </Link>
                </h3>

                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-slate-900">
                        {brl.format(price)}
                    </span>
                    {oldPrice && (
                        <span className="text-sm text-slate-400 line-through">
                            {brl.format(oldPrice)}
                        </span>
                    )}
                </div>
                <p className="text-xs text-slate-500">
                    ou 10x de {brl.format(price / 10)} sem juros
                </p>

                <button
                    type="button"
                    onClick={() => onAddToCart?.(id)}
                    className="mt-4 h-10 rounded-full border border-slate-900 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
                >
                    Adicionar ao carrinho
                </button>
            </div>
        </article>
    );
}