import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="lux-container py-20 text-center">
      <p className="text-sm uppercase tracking-[0.22em] text-gold">404</p>
      <h1 className="mt-3 font-display text-4xl text-ink">Page introuvable</h1>
      <p className="mt-4 text-graphite">La page demandée n'existe pas.</p>
      <Link to="/" className="lux-button-primary mt-8">
        Retour à l'accueil
      </Link>
    </section>
  );
}

export default NotFoundPage;
