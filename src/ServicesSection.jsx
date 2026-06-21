import SectionTitle from "./components/common/SectionTitle";
import premium from "./assets/images/premium-quality.png";
import services from "./assets/images/costomer.png";
import livraison from "./assets/images/Livraison.gif";
import SectionCards from "./SectionCards";

function ServicesSection() {
  return (
    <section id="services">
      <SectionTitle title="Nos services" />

      <SectionCards
        image={services}
        title="Service client"
        description="Un accompagnement personnalisé pour vous accompagner dans votre choix."
      />
      <SectionCards
        image={premium}
        title="Collection signature"
        description="Chaque creation est choisie pour sa qualite de composition, sa tenue et sa personnalite olfactive."
      />
      <SectionCards
        image={livraison}
        title="Livraison rapide"
        description="Nous nous engageons à livrer votre commande dans les plus brefs délais, afin que vous puissiez profiter de votre parfum sans attendre."
      />
    </section>
  );
}

export default ServicesSection;
