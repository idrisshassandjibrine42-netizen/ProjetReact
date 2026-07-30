import { useState, useEffect } from "react";
import SectionHeading from "./common/SectionHeading";
import ProductCard from "./products/productsCards";
import axios from "axios";

function RecentCollectionSection() {
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        const featured = response.data.filter((product) => product.featured);
        setFeaturedProduct(featured);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    getProducts();
  }, []);
  if (loading) {
    return (
      <div className="text-center text-xl p-10">
        Chargement de la collection...
      </div>
    );
  }
  return (
    <section className="lux-container py-16">
      <SectionHeading eyebrow="collection recente" />
      <div className="mt-10 flex flex-col snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 scrollbar-none [&::-moz-webkit-scroll]:hidden lg:flex-row">
        {featuredProduct.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default RecentCollectionSection;
