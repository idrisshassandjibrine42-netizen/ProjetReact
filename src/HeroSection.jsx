import SectionTitle from "./SectionTitle";

function HeroSection() {
  return (
    <section id="hero">
      <h1>Mason parfums</h1>
      <SectionTitle
        title=" Des creations olfactives pensees pour ceux qui collectionnent les
        sillages comme des signatures."
      />

      <p>
        Flacons editoriaux, compositions rares et accompagnement conciergerie
        pour une experience parfum plus premium, plus simple et plus desiree.
      </p>
      <div className="hero-actions">
        <a href="products.html">Découvrir</a>
        <a href="contact.html">Contactez-nous</a>
      </div>
    </section>
  );
}

export default HeroSection;
