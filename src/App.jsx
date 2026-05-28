import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import StatsSection from "./StatsSection";
import heroImage from "./assets/home-hero.webp";
import SectionTitle from "./SectionTitle";
function App() {
  return (
    <main>
      <HeroSection />
      <section>
        <SectionTitle title="Découvrez notre collection de parfums d'exception" />
        <img src={heroImage} alt="Collection de parfums Maison parfums" />
      </section>
      <ServicesSection />
      <StatsSection />
    </main>
  );
}
export default App;
