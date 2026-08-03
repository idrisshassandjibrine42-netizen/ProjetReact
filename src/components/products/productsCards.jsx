import { FiShoppingBag, FiStar } from "react-icons/fi";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <article className="lux-cart group overflow-hidden">
      <div
        className="relative aspect-4/4.25 overflow-hidden border"
        style={{
          background:
            product.cardBackground ||
            "linear-gradient(180deg, rgba(255, 255, 255, 0.95) rgba(245, 245, 245, 0.88) ",
          borderColor: "rgba(255, 255, 255, 0.4",
        }}
      >
        <Link to={`/products/${product.id}`} className="block h-full w-full">
          <div className="absolute inset-0 bg-glow opacity-25 " />
          <img
            src={`https://backend-qv04.onrender.com/images/product/${product.imageKey}-1.png`}
            alt={product.name}
            className="h-auto w-auto object-cover object-center transition duration-500 group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-gold">
              {product.brand}
            </p>
            <Link to={`/products/${product.id}`} className="mt-1.5 block">
              <h3 className="font-display text-[1.7rem] leading-none text-ink transition hover:text-bronze">
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink">
            <FiStar className="text-gold" />
            {product.rating}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-graphite">
          <span>{product.caseSize}</span>
          <span>{product.movement}</span>
        </div>
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.22em] text-graphite">
              Prix
            </p>
            <div className="mt-1 flex items-start gap-1 whitespace-nowrap font-display text-ink">
              <span className="text-[2rem] leading-none">{product.price}</span>
              <span className="pt-1 text-[0.8rem] uppercase tracking-[0.14em] text-graphite">
                TND
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:justify-end">
            <button
              className="lux-button-primary min-w-[150px] "
              onClick={() => addToCart(product)}
              type="button"
            >
              <FiShoppingBag />
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
