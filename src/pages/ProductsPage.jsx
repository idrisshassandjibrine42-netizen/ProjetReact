import { useState, useEffect } from "react";
import productsData from "../data/productsData";
import productsContent from "../data/productsContent";
import ProductsCards from "../components/products/ProductsCards";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(productsData);
    setLoading(false);
  }, []);

  return (
    <section className="lux-container py-12">
      <h1 className="font-display text-4xl text-ink">
        {productsContent.title}
      </h1>

      {loading ? (
        <p className="text-sm text-graphite">{productsContent.loading}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {products.map((product) => (
            <ProductsCards key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;
