import Button from "./components/UI/Button";
import SectionTitle from "./components/common/SectionTitle";
import { useState } from "react";
import "./contactForm.css";
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [errors, setErrors] = useState({});
  function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};
    if (name.trim() === "") {
      newErrors.name = "Le nom est requis.";
      setErrors(newErrors);
    } else if (name.trim().length < 3) {
      newErrors.name = "Le nom doit contenir au moins 3 caractères.";
      setErrors(newErrors);
    } else if (name[0] !== name[0].toUpperCase()) {
      newErrors.name = "Le nom doit commencer par une majuscule.";
      setErrors(newErrors);
    }
    if (email.trim() === "") {
      newErrors.email = "L'email est requis.";
      setErrors(newErrors);
    }
    if (message.trim() === "") {
      newErrors.message = "Le message est requis.";
      setErrors(newErrors);
    }
  }
  return (
    <section id="contact-form">
      <SectionTitle
        title="Contactez-nous"
        subtitle="N'hésitez pas à nous contacter pour toute question ou demande d'information."
      />
      <form onSubmit={handleSubmit}>
        <div className="form-zone">
          <label>Nom:</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Saisissez votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-zone">
          <label>Email:</label>
          <input
            type="email"
            placeholder="example@email.com"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-zone">
          <label>Message:</label>
          <textarea
            name="message"
            id="message"
            placeholder="écrivez votre message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={errors.message ? "input-error" : ""}
          ></textarea>
          {errors.message && <p className="error-message">{errors.message}</p>}
        </div>
        <Button text="Envoyer" type="submit" />
        {formMessage && <p className="form-message">{formMessage}</p>}
      </form>
    </section>
  );
}

export default ContactForm;
