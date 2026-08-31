import { useState } from "react";
import axios from "axios";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      setFormMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setLoading(true);
      setFormMessage("");

      const response = await axios.post(
        "https://backend-qv04.onrender.com/api/contacts",
        {
          name,
          email,
          message,
        },
      );

      if (response.data.success) {
        setFormMessage("Message envoyé avec succès.");

        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);

      setFormMessage(
        error.response?.data?.message || "Erreur lors de l'envoi du message.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="lux-container py-16">
      <h1 className="font-display text-4xl text-ink">Contact-nous</h1>

      <p className="mt-3 max-w-2xl text-graphite">
        Envoyez un message simple. Nous vous répondrons dans les plus brefs
        délais.
      </p>

      <form onSubmit={handleSubmit} className="lux-card mt-8 max-w-2xl">
        <label className="lux-label">Nom</label>

        <input
          type="text"
          className="lux-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom"
        />

        <label className="lux-label mt-5 block">Email</label>

        <input
          type="email"
          className="lux-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
        />

        <label className="lux-label mt-5 block">Message</label>

        <textarea
          className="lux-input min-h-32"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Votre message"
        />

        <button
          type="submit"
          disabled={loading}
          className="lux-button-primary mt-8"
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>

        {formMessage ? (
          <p className="mt-4 font-semibold text-gold">{formMessage}</p>
        ) : null}
      </form>
    </section>
  );
}

export default ContactPage;
