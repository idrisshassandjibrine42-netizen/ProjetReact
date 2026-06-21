function ProductsCards(props) {
  const { product, addToCart } = props;

  if (!product) return null;

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>Prix: {product.price} €</p>
      <img src={product.image} alt={product.name} />
      <p
        id="availability"
        className={product.availability ? "available" : "unavailable"}
      >
        {product.availability ? "Disponible" : "Rupture de stock"}
      </p>
      <div id="products-buttons">
        {product.availability && (
          <button onClick={() => addToCart(product)}>Ajouter au panier</button>
        )}
        <button>Ajouter aux favoris</button>
      </div>
    </div>
  );
}

export default ProductsCards;
