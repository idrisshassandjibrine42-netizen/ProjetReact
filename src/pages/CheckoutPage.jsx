import { useCart } from "../hooks/useCart";
import { useState } from "react";

function CheckoutPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [adresse, setAdresse] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const { cartItems, totalPrice } = useCart();

  function validateForm() {
    const newErrors = {};

    if (fullName.trim() === "") {
      newErrors.fullName = "Nom obligatoire";
    }
    if (phone.trim() === "") {
      newErrors.phone = "Téléphone obligatoire";
    }
    if (city === "") {
      newErrors.city = "Ville obligatoire";
    }
    if (adresse.trim() === "") {
      newErrors.adresse = "Adresse obligatoire";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("");
      return;
    }

    setMessage("Commande préparée avec succès.");
    setFullName("");
    setPhone("");
    setCity("");
    setAdresse("");
    setErrors({});
  }
  return (
    <section className="lux-container py-16">
      <div className="mb-10">
        <p className="text-sm uppercase text-gold">Checkout</p>
        <h1 className="text-4xl font-display text-ink">
          Finaliser la commande
        </h1>
        <p className="mt-3 max-w-2xl text-graphite">
          Finalisez votre commande avec un parcours d'achat simple et securise.
        </p>
      </div>
      <div className="flex flex-col-reverse gap-10 lg:flex-row">
        <form className="lux-card flex-1">
          <h2 className="font-display text-2xl text-ink">
            Informations de livraison
          </h2>

          <div className="mt-5">
            <label className="lux-label">Nom complet</label>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-2">{errors.fullName} </p>
            )}
            <input
              className="lux-input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Entrez votre nom complet"
            />
          </div>
          <div className="mt-5">
            <label className="lux-label">Téléphone</label>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2">{errors.phone} </p>
            )}
            <input
              className="lux-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Entrez votre numéro de téléphone"
            />
          </div>
          <div className="mt-5">
            <label className="lux-label">Ville</label>
            {errors.city && (
              <p className="text-red-500 text-sm mt-2">{errors.city} </p>
            )}
            <select
              className="lux-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Sélectionnez votre ville</option>
              <option value="ville1">Tunis</option>
              <option value="ville2">Sousse</option>
              <option value="ville3">Sfax</option>
              <option value="ville4">Nabeul</option>
            </select>
          </div>
          <div className="mt-5">
            <label className="lux-label">Adresse</label>
            {errors.adresse && (
              <p className="text-red-500 text-sm mt-2">{errors.adresse} </p>
            )}
            <textarea
              className="lux-input min-h-28"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              placeholder="Entrez votre adresse"
            />
          </div>

          <button onClick={handleSubmit} className="lux-button-primary mt-8">
            Confirmer la commande
          </button>

          {message && (
            <p className="mt-4 text-sm font-semibold text-gold">{message}</p>
          )}
        </form>

        <aside className="lux-card lg:w-[360px]">
          <h2 className="font-display text-2xl text-ink">Résumé</h2>

          {cartItems.length === 0 ? (
            <p className="mt-6 text-graphite">Votre panier est vide.</p>
          ) : (
            <>
              <div className="mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://backend-qv04.onrender.com/images/product/${item.imageKey}-1.png`}
                        alt={item.name}
                        className="h-14 w-14 rounded object-cover"
                      />

                      <div>
                        <p className="font-medium text-ink">{item.name}</p>
                        <p className="text-sm text-graphite">
                          Quantité : {item.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-ink">
                      {(item.price * item.quantity).toLocaleString()} TND
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <div className="flex justify-between">
                  <span className="text-sm uppercase tracking-[0.18em] text-graphite">
                    Total
                  </span>
                  <span className="font-display text-2xl text-ink">
                    {Number(totalPrice).toLocaleString()} TND
                  </span>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

export default CheckoutPage;
