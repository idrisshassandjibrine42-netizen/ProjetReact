import "./SectionCards.css";
import Premium from "./assets/images/premium-quality.png";

function SectionCards(props) {
  return (
    <div className="card">
      <div className="card-header">
        <img src={props.image || Premium} alt="" />
        <h3>Service : {props.title}</h3>
      </div>
      <p>{props.description}</p>
    </div>
  );
}

export default SectionCards;
