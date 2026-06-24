import { Link, useParams } from "react-router-dom";
import productsData from "../data/productsData";

function ProductDetailsPage() {
  const { id } = useParams();
  const product = productsData.find((item) => item.id === parseInt(id, 10));

  if (!product) {
    return (
      <section className="lux-container py-20">
        <h1 className="font-display text-3xl text-ink">Produit introuvable</h1>

        <p className="mt-3 text-graphite">
          parfum n'existe pas dans la collection
        </p>

        <Link to="/products" className="lux-Button-primary mt-6">
          retour à la collection
        </Link>
      </section>
    );
  }

  return (
    <section className="pb-12 md:pb-16">
      <div className="lux-container flex flex-col gap-10 py-10 lg:flex-row">
        <div className="overflow-hidden bg-white shadow-lg lg:w-[55%]">
          <img
            src={product.imageKey}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col justify-center lg:w-[45%]">
          <p className="text-sm uppercase tracking-[0.22em] text-gold">
            {product.category}
          </p>

          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-none text-ink">
            {product.name}
          </h1>

          <p className="mt-3 text-lg text-bronze">{product.brand}</p>

          <div className="mt-6 flex items-start gap-1 font-display text-ink">
            <span className="text-4xl leading-none">
              {product.price.toLocaleString()}
            </span>
            <span className="pt-1 text-[0.8rem] uppercase tracking-[0.14em] text-graphite">
              DT
            </span>
          </div>

          <p className="mt-6 leading-8 text-graphite">{product.details}</p>

          <p className="mt-4 text-sm font-semibold text-ink">
            {product.available ? "Disponible" : "Indisponible"}
          </p>

          <button type="button" className="lux-button-primary mt-8 w-fit">
            Ajouter au panier
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
