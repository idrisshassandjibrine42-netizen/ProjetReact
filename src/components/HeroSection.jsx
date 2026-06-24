import Button from "./ui/Button";
import SectionHeading from "./common/SectionHeading";
import HomeContent from "../data/homeContent";
import heroImage from "../assets/hero/home-hero.webp";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ink text-white ">
      <img
        src={heroImage}
        alt="Hero Image"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
      />

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative flex min-h-[calc(100svh-var(--site-header-height))] flex-col items-center justify-end pb-10 pt-16 text-center md:pb-12 ">
        <SectionHeading
          eyebrow="Bienvenue dans l'univers de la parfumerie de luxe"
          title={HomeContent.hero.title}
          text={HomeContent.hero.text}
        />
        <div className="flex mt-8 flex-col gap-4 sm:flex-row">
          <Button link="/Products" text="Decouvrir" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
