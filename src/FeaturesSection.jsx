import SectionTitle from "./SectionTitle";
import ProductsCards from "./ProductsCards";
import "./featuresSection.css";

function FeaturesSection() {
  const products = [
    {
      id: 1,
      name: "Rolex Submariner",
      price: 8400,
      availability: true,
      image: "../src/assets/parfum1.png",
      description: "Une montre elegante et intemporelle.",
    },
    {
      id: 2,
      name: "Omega Seamaster",
      price: 1200,
      availability: false,
      image: "../src/assets/parfum2.png",
      description: "Une montre moderne au style affirme.",
    },
    {
      id: 3,
      name: "Tag Heuer Carrera",
      price: 1300,
      availability: true,
      image: "../src/assets/parfum3.png",
      description: "Une montre sportive et robuste.",
    },
  ];
  return (
    <section id="features">
      <SectionTitle title="Nos modèles de luxe" />
      <div id="features-products">
        {products.map((product) => {
          return (
            <ProductsCards
              key={product.id}
              title={product.name}
              price={product.price}
              availability={product.availability}
              image={product.image}
            />
          );
        })}
      </div>
    </section>
  );
}

export default FeaturesSection;
