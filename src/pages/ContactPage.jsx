import { useState } from "react";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formMessage, setFormMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      setFormMessage("Veuillez remplir tous les champs.");
      return;
    }

    setFormMessage("Message envoye avec succes.");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <section className="lux-container py-16">
      <h1 className="font-display text-4xl text-ink">Contact</h1>
      <p className="mt-3 max-w-2xl text-graphite">
        Envoyez un message simple. Cette page pourra etre connectee au backend
        plus tard.
      </p>

      <form onSubmit={handleSubmit} className="lux-card mt-8 max-w-2xl">
        <label className="lux-label">Nom</label>
        <input
          className="lux-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="lux-label mt-5 block">Email</label>
        <input
          className="lux-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="lux-label mt-5 block">Message</label>
        <textarea
          className="lux-input min-h-32"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={handleSubmit} className="lux-button-primary mt-8">
          Envoyer
        </button>

        {formMessage ? (
          <p className="mt-4 font-semibold text-gold">{formMessage}</p>
        ) : null}
      </form>
    </section>
  );
}

export default ContactPage;
