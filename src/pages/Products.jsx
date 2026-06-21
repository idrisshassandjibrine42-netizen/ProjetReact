import { useState } from "react";
import SectionTitle from "../components/common/SectionTitle";
import ProductsCards from "../components/products/productsCards";

const products = [
  {
    id: 1,
    name: "Rolex Submariner",
    price: 8400,
    availability: true,
    image: "../src/assets/images/parfum1.png",
    description: "Un parfum elegant et intemporelle.",
  },
  {
    id: 2,
    name: "Omega Seamaster",
    price: 1200,
    availability: false,
    image: "../src/assets/images/parfum2.png",
    description: "Un parfum moderne au style affirme.",
  },
  {
    id: 3,
    name: "Tag Heuer Carrera",
    price: 1300,
    availability: true,
    image: "../src/assets/images/parfum3.png",
    description: "Un parfum sportif et robuste.",
  },
];

function Products() {
  const [cartItems, setCartItems] = useState([]);
  function addToCart(product) {
    setCartItems([...cartItems, product]);
  }
  return (
    <section id="products">
      <SectionTitle title="Nos modèles de luxe" />
      <div id="products-list">
        {products.map((product) => {
          return (
            <ProductsCards
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Products;
