import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div id="header-content">
        <h1 id="web-title">Maison Parfums</h1>
        <button id="menu-toggle">Menu</button>
        <nav id="main-nav">
          <Link to="/">Accueil</Link>
          <Link to="/Products">Produits</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/Cart">Panier</Link>
          <Link to="/About">À propos</Link>
        </nav>
      </div>
    </header>
  );
}
export default Navbar;
