import { useState } from "react";
import SectionTitle from "./components/common/SectionTitle";
import ProductsCards from "./components/products/productsCards";
import "./featuresSection.css";

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

function FeaturesSection() {
  const [cartItems, setCartItems] = useState([]);
  function addToCart(product) {
    setCartItems([...cartItems, product]);
  }

  function removeFromCart(index) {
    const newCart = cartItems.filter((product, i) => i !== index);
    setCartItems(newCart);
  }

  function removeAllFromCart() {
    setCartItems([]);
  }
  return (
    <section id="features">
      <SectionTitle title="Nos modèles de luxe" />
      <section id="cart">
        <h3>Contenu du panier</h3>
        <button onClick={() => removeAllFromCart()}>Vider le panier</button>
        {cartItems.map((product, index) => {
          return (
            <div key={index}>
              <p>{product.name}</p>
              <p>Prix: {product.price} DNT</p>
              <button onClick={() => removeFromCart(index)}>Supprimer</button>
            </div>
          );
        })}
      </section>

      <div id="features-products">
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
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : cartItems.length === 1 ? (
        <p> vous avez{cartItems.length} produit dans le panier</p>
      ) : (
        <p> vous avez {cartItems.length} produits dans le panier</p>
      )}
      <p>
        Total = {cartItems.reduce((total, product) => total + product.price, 0)}
        DNT
      </p>
    </section>
  );
}

export default FeaturesSection;
