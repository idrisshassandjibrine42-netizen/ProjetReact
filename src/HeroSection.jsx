import { Link } from "react-router-dom";
import SectionTitle from "./components/common/SectionTitle";

function HeroSection() {
  return (
    <section id="hero">
      <SectionTitle title="Des créations olfactives pensées pour ceux qui collectionnent les sillages comme des signatures." />

      <p>
        Flacons éditoriaux, compositions rares et accompagnement conciergerie
        pour une expérience parfum plus premium, plus simple et plus désirée.
      </p>
      <div className="hero-actions">
        <Link to="/Products">Découvrir</Link>
        <Link to="/Contact">Contactez-nous</Link>
      </div>
    </section>
  );
}

export default HeroSection;
