import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div id="header-content">
        <h1 id="web-title">Maison Parfums</h1>

        <button id="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        <nav id="main-nav" className={isOpen ? "active" : ""}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Accueil
          </Link>

          <Link to="/products" onClick={() => setIsOpen(false)}>
            Produits
          </Link>

          <Link to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>

          <Link to="/cart" onClick={() => setIsOpen(false)}>
            Panier ({totalItems})
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
