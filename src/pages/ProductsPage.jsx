import { useState, useEffect } from "react";
import SectionHeading from "../components/common/SectionHeading";
import ProductsCards from "../components/products/productsCards.jsx";
import axios from "axios";
import productsData from "../data/productsData.js";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const normalizeProduct = (product, index) => ({
    ...product,
    id: product.id ?? product._id ?? index + 1,
    _id: product._id ?? product.id ?? index + 1,
    slug:
      product.slug ??
      product.name
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    imageKey: product.imageKey ?? product.slug ?? product.name,
    price: Number(product.price || 0),
  });

  const getFilteredProducts = () => {
    const filteredProducts = products.filter(
      (product) =>
        product.price >= Number(minPrice || 0) &&
        product.price <= Number(maxPrice || Number.MAX_SAFE_INTEGER),
    );
    setProducts(filteredProducts);
  };

  useEffect(() => {
    let isMounted = true;

    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://backend-qv04.onrender.com/api/products",
          {
            timeout: 4000,
          },
        );
        if (!isMounted) return;

        const payload = response.data;
        const sourceProducts = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.products)
            ? payload.products
            : [];

        const normalizedProducts = sourceProducts.map(normalizeProduct);
        setProducts(normalizedProducts);
        setLoading(false);
      } catch (error) {
        console.warn(
          "Backend indisponible, utilisation des produits locaux :",
          error,
        );
        if (!isMounted) return;

        const fallbackProducts = productsData.map((product, index) =>
          normalizeProduct(product, index),
        );
        setProducts(fallbackProducts);
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <p className="mt-8 text-sm text-graphite">Chargement des produits...</p>
    );
  }
  return (
    <section className="lux-container py-16">
      <SectionHeading eyebrow="Nos produits" />
      <form>
        <div className="form-zone">
          <label>MinPrice :</label>
          <input
            type="number"
            name="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <label>MaxPrice :</label>
          <input
            type="number"
            name="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button
            className="lux-button-primary min-w-[150px] text-center"
            type="button"
            onClick={getFilteredProducts}
          >
            Filtrer
          </button>
        </div>
      </form>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {products.length === 0 ? (
          <p className="mt-8 text-sm text-graphite">Aucun produit trouvé.</p>
        ) : (
          products.map((product) => (
            <ProductsCards key={product._id} product={product} />
          ))
        )}
      </div>
    </section>
  );
}

export default Products;
