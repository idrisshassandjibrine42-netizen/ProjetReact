import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="lux-card group overflow-hidden">
      <div className="relative aspect-[4/4.25] overflow-hidden border bg-white">
        <Link to={`/products/${product.id}`} className="block h-full w-full">
          <img
            src={product.imageKey}
            alt={product.name}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="mt-4">
        <p className="text-[11px] uppercase tracking-[0.26em] text-gold">
          {product.brand}
        </p>

        <Link to={`/products/${product.id}`} className="mt-1.5 block">
          <h3 className="font-display text-[1.7rem] leading-none text-ink transition hover:text-bronze">
            {product.name}
          </h3>
        </Link>

        <div
          className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.12em] text
graphite"
        >
          <span>{product.caseSize}</span>
          <span>{product.movement}</span>
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-graphite">
              Prix
            </p>
            <div className="mt-1 flex items-start gap-1 font-display text-ink">
              <span className="text-[2rem] leading-none">
                {product.price.toLocaleString()}
              </span>
              <span className="pt-1 text-[0.8rem] uppercase tracking-[0.14em] text-graphite">
                DT
              </span>
            </div>
          </div>

          <Link to={`/products/${product.id}`} className="lux-button-primary">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
