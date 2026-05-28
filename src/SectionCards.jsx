import "./SectionCards.css";
function SectionCards(props) {
  return (
    <div className="card">
      <div className="card-header">
        <img src={props.image} alt="" />
        <h3>Service : {props.title}</h3>
      </div>
      <p>{props.description}</p>
    </div>
  );
}

export default SectionCards;
