import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

function Navbar() {
  const { totalItems } = useCart();
  return (
    <header>
      <div id="header-content">
        <h1 id="web-title">Maison Parfums</h1>
        <button id="menu-toggle">Menu</button>
        <nav id="main-nav">
          <Link to="/">Accueil</Link>
          <Link to="/products">Produits</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Panier({totalItems})</Link>
          <Link to="/about">À propos</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
export default Navbar;
