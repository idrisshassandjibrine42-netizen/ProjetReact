import { useState, useEffect } from "react";
import SectionHeading from "../components/common/SectionHeading";
import ProductsCards from "../components/products/ProductsCards.jsx";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const getFiltredProducts = () => {
    const filtredProduct = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );
    setProducts(filtredProduct);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    getProducts();
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
            onClick={getFiltredProducts}
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
