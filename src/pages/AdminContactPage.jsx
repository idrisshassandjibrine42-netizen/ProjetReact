import { useEffect, useMemo, useState } from "react";
import axios from "axios";
const API_URL = "https://backend-qv04.onrender.com/api/contacts";
function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(API_URL);
      console.log("MESSAGES :", response.data);
      if (response.data.success) {
        setContacts(response.data.contacts || response.data.messages || []);
      } else {
        setError("Impossible de récupérer les messages.");
      }
    } catch (error) {
      console.error(
        "Erreur récupération messages :",
        error.response?.data || error.message,
      );
      setError(
        error.response?.data?.message ||
          "Erreur lors du chargement des messages.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadContacts();
  }, []);
  const deleteContact = async (contactId) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible.",
    );
    if (!confirmation) return;
    try {
      setDeletingId(contactId);
      setMessage("");
      const response = await axios.delete(`${API_URL}/${contactId}`);
      if (response.data.success) {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== contactId),
        );
        if (selectedContact?._id === contactId) {
          setSelectedContact(null);
        }
        setMessage("Message supprimé avec succès.");
      } else {
        setMessage("Impossible de supprimer le message.");
      }
    } catch (error) {
      console.error(
        "Erreur suppression message :",
        error.response?.data || error.message,
      );
      setMessage(
        error.response?.data?.message || "Impossible de supprimer le message.",
      );
    } finally {
      setDeletingId(null);
    }
  };
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const searchText = search.toLowerCase().trim();
      const matchesSearch =
        !searchText ||
        contact.name?.toLowerCase().includes(searchText) ||
        contact.email?.toLowerCase().includes(searchText) ||
        contact.message?.toLowerCase().includes(searchText) ||
        contact._id?.toLowerCase().includes(searchText);
      const matchesDate =
        !dateFilter ||
        (contact.createdAt &&
          new Date(contact.createdAt).toISOString().slice(0, 10) ===
            dateFilter);
      return matchesSearch && matchesDate;
    });
  }, [contacts, search, dateFilter]);
  const statistics = useMemo(() => {
    const total = contacts.length;
    const today = new Date().toISOString().slice(0, 10);
    const todayCount = contacts.filter(
      (contact) =>
        contact.createdAt &&
        new Date(contact.createdAt).toISOString().slice(0, 10) === today,
    ).length;
    const uniqueEmails = new Set(
      contacts.map((contact) => contact.email).filter(Boolean),
    ).size;
    return { total, todayCount, uniqueEmails };
  }, [contacts]);
  const exportCSV = () => {
    if (filteredContacts.length === 0) {
      setMessage("Aucun message à exporter.");
      return;
    }
    const headers = ["ID", "Nom", "Email", "Message", "Date"];
    const rows = filteredContacts.map((contact) => [
      contact._id,
      contact.name,
      contact.email,
      contact.message,
      contact.createdAt ? new Date(contact.createdAt).toLocaleString() : "",
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");
    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "messages-contacts.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setMessage("Messages exportés avec succès.");
  };
  if (loading) {
    return (
      <section className="lux-container py-16">
        {" "}
        <p className="text-graphite"> Chargement des messages... </p>{" "}
      </section>
    );
  }
  return (
    <section className="lux-container py-16">
      {" "}
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        {" "}
        <div>
          {" "}
          <p className="text-sm uppercase tracking-[0.18em] text-gold">
            {" "}
            Administration{" "}
          </p>{" "}
          <h1 className="font-display text-4xl text-ink">
            {" "}
            Messages de contact{" "}
          </h1>{" "}
          <p className="mt-3 text-graphite">
            {" "}
            Consultez les messages envoyés par les utilisateurs.{" "}
          </p>{" "}
        </div>{" "}
        <div className="flex flex-wrap gap-3">
          {" "}
          <button onClick={loadContacts} className="lux-button-primary">
            {" "}
            🔄 Actualiser{" "}
          </button>{" "}
          <button onClick={exportCSV} className="lux-button-primary">
            {" "}
            📥 Exporter CSV{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      {message && (
        <div className="mb-6 rounded-lg border border-line bg-white p-4 font-semibold text-gold">
          {" "}
          {message}{" "}
        </div>
      )}{" "}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          {" "}
          <p className="font-semibold text-red-500"> {error} </p>{" "}
          <button onClick={loadContacts} className="lux-button-primary mt-4">
            {" "}
            Réessayer{" "}
          </button>{" "}
        </div>
      )}{" "}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {" "}
        <div className="lux-card">
          {" "}
          <p className="text-sm text-graphite"> Total des messages </p>{" "}
          <p className="mt-2 font-display text-3xl text-ink">
            {" "}
            {statistics.total}{" "}
          </p>{" "}
        </div>{" "}
        <div className="lux-card">
          {" "}
          <p className="text-sm text-graphite"> Messages aujourd'hui </p>{" "}
          <p className="mt-2 font-display text-3xl text-ink">
            {" "}
            {statistics.todayCount}{" "}
          </p>{" "}
        </div>{" "}
        <div className="lux-card">
          {" "}
          <p className="text-sm text-graphite"> Expéditeurs différents </p>{" "}
          <p className="mt-2 font-display text-3xl text-ink">
            {" "}
            {statistics.uniqueEmails}{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
      <div className="lux-card mt-8">
        {" "}
        <h2 className="font-display text-2xl text-ink">
          {" "}
          Rechercher un message{" "}
        </h2>{" "}
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {" "}
          <input
            type="text"
            className="lux-input"
            placeholder="Nom, email, message ou ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />{" "}
          <input
            type="date"
            className="lux-input"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />{" "}
        </div>{" "}
        <div className="mt-4 flex flex-wrap justify-between gap-3">
          {" "}
          <p className="text-sm text-graphite">
            {" "}
            {filteredContacts.length} message(s){" "}
          </p>{" "}
          <button
            onClick={() => {
              setSearch("");
              setDateFilter("");
            }}
            className="text-sm font-semibold text-gold"
          >
            {" "}
            Réinitialiser les filtres{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      <div className="mt-8">
        {" "}
        {filteredContacts.length === 0 ? (
          <div className="lux-card">
            {" "}
            <p className="text-graphite"> Aucun message trouvé. </p>{" "}
          </div>
        ) : (
          <div className="space-y-5">
            {" "}
            {filteredContacts.map((contact) => (
              <div key={contact._id} className="lux-card">
                {" "}
                <div className="flex flex-col justify-between gap-5 border-b border-line pb-5 lg:flex-row lg:items-center">
                  {" "}
                  <div>
                    {" "}
                    <p className="text-sm text-graphite"> Expéditeur </p>{" "}
                    <p className="mt-1 font-semibold text-ink">
                      {" "}
                      {contact.name}{" "}
                    </p>{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <p className="text-sm text-graphite"> Email </p>{" "}
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-1 block text-gold hover:underline"
                    >
                      {" "}
                      {contact.email}{" "}
                    </a>{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <p className="text-sm text-graphite"> Date </p>{" "}
                    <p className="mt-1 text-ink">
                      {" "}
                      {contact.createdAt
                        ? new Date(contact.createdAt).toLocaleString()
                        : "Date inconnue"}{" "}
                    </p>{" "}
                  </div>{" "}
                  <div className="flex gap-2">
                    {" "}
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-gray-50"
                    >
                      {" "}
                      👁️ Lire{" "}
                    </button>{" "}
                    <button
                      onClick={() => deleteContact(contact._id)}
                      disabled={deletingId === contact._id}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      {" "}
                      {deletingId === contact._id
                        ? "Suppression..."
                        : "🗑️ Supprimer"}{" "}
                    </button>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="mt-5">
                  {" "}
                  <p className="mb-2 text-sm text-graphite"> Message </p>{" "}
                  <p className="whitespace-pre-wrap text-ink">
                    {" "}
                    {contact.message}{" "}
                  </p>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>
        )}{" "}
      </div>{" "}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          {" "}
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">
            {" "}
            <div className="flex items-center justify-between border-b border-line pb-4">
              {" "}
              <div>
                {" "}
                <p className="text-sm text-gold"> Message de contact </p>{" "}
                <h2 className="font-display text-2xl text-ink">
                  {" "}
                  {selectedContact.name}{" "}
                </h2>{" "}
              </div>{" "}
              <button
                onClick={() => setSelectedContact(null)}
                className="rounded-full px-3 py-2 text-xl text-graphite hover:bg-gray-100"
              >
                {" "}
                ×{" "}
              </button>{" "}
            </div>{" "}
            <div className="mt-6 space-y-4">
              {" "}
              <div>
                {" "}
                <p className="text-sm text-graphite"> Nom </p>{" "}
                <p className="font-semibold text-ink">
                  {" "}
                  {selectedContact.name}{" "}
                </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-sm text-graphite"> Email </p>{" "}
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="font-semibold text-gold hover:underline"
                >
                  {" "}
                  {selectedContact.email}{" "}
                </a>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-sm text-graphite"> Date d'envoi </p>{" "}
                <p className="text-ink">
                  {" "}
                  {selectedContact.createdAt
                    ? new Date(selectedContact.createdAt).toLocaleString()
                    : "Date inconnue"}{" "}
                </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-sm text-graphite"> Message </p>{" "}
                <div className="mt-2 rounded-lg border border-line bg-gray-50 p-4">
                  {" "}
                  <p className="whitespace-pre-wrap leading-7 text-ink">
                    {" "}
                    {selectedContact.message}{" "}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="mt-8 flex flex-wrap justify-end gap-3">
              {" "}
              <a
                href={`mailto:${selectedContact.email}?subject=Réponse à votre message`}
                className="lux-button-primary"
              >
                {" "}
                Répondre par email{" "}
              </a>{" "}
              <button
                onClick={() => setSelectedContact(null)}
                className="rounded-lg border border-line px-5 py-3 font-semibold text-ink hover:bg-gray-50"
              >
                {" "}
                Fermer{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </section>
  );
}
export default AdminContactsPage;
