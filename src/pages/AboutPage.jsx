import SectionTitle from "../components/common/SectionTitle";

function About() {
  return (
    <section
      style={{ padding: "3rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}
    >
      <SectionTitle
        title="À propos de nous"
        subtitle="Découvrez notre histoire et notre passion pour les parfums de luxe."
      />

      <p style={{ lineHeight: 1.8, color: "#555", marginBottom: "1.5rem" }}>
        Bienvenue sur notre boutique en ligne dédiée aux parfums de luxe. Nous
        mettons un point d'honneur à vous proposer des fragrances soigneusement
        sélectionnées, alliant élégance, qualité et originalité.
      </p>

      <p style={{ lineHeight: 1.8, color: "#555", marginBottom: "1.5rem" }}>
        Notre équipe vous accompagne pour trouver la fragrance qui vous
        ressemble, que vous cherchiez un parfum signature, une odeur raffinée
        pour une occasion spéciale ou un cadeau intemporel.
      </p>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <div>
          <h3>Notre vision</h3>
          <p>
            Faire découvrir des parfums qui racontent une histoire et inspirent
            le quotidien.
          </p>
        </div>
        <div>
          <h3>Notre qualité</h3>
          <p>
            Des produits sélectionnés avec rigueur pour garantir une expérience
            premium.
          </p>
        </div>
        <div>
          <h3>Notre service</h3>
          <p>
            Un accompagnement personnalisé pour vous aider à choisir le parfum
            parfait.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
