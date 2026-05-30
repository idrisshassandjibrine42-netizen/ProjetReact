function productsCard(props) {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>Prix: {props.price} €</p>
      <p
        id="availability"
        className={props.availability ? "available" : "unavailable"}
      >
        {props.availability ? "Disponible" : "Rupture de stock"}
      </p>
      <img src={props.image} alt={props.title} />
      <div id="products-buttons">
        <button> Ajouter au panier</button>
        <button> Ajouter aux favoris</button>
      </div>
    </div>
  );
}

export default productsCard;
