import { useState, useEffect } from "react";
import ProductsCards from "../components/products/productsCards.jsx";
import axios from "axios";
import productsData from "../data/productsData.js";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
      <h1>Nos produits</h1>

      <form className="my-6">
        <div className="flex flex-wrap items-end gap-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          {/* Prix minimum */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="minPrice"
              className="whitespace-nowrap font-medium text-gray-700"
            >
              Prix minimum :
            </label>
            <input
              id="minPrice"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="400"
              className="w-24 rounded border border-gray-300 px-2 py-1"
            />
          </div>

          {/* Prix maximum */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="maxPrice"
              className="whitespace-nowrap font-medium text-gray-700"
            >
              Prix maximum :
            </label>
            <input
              id="maxPrice"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="600"
              className="w-24 rounded border border-gray-300 px-2 py-1"
            />
          </div>

          {/* Bouton à droite */}
          <div className="ml-auto">
            <button
              type="button"
              onClick={getFilteredProducts}
              className="lux-button-primary min-w-[150px]"
            >
              Filtrer
            </button>
          </div>
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
