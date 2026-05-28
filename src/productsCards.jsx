function productsCard(props) {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>Prix: {props.price} €</p>
      <p>{props.description}</p>
      <img src={props.image} alt="" />
      <button> Ajouter au panier</button>
      <button> Ajouter aux favoris</button>
    </div>
  );
}

export default productsCard;
