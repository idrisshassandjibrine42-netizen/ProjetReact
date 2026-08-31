import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://backend-qv04.onrender.com/api/contacts";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Charger les messages
  const fetchContacts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL);

      if (response.data.success) {
        setContacts(response.data.contacts);
      }
    } catch (error) {
      console.error("Erreur récupération contacts :", error);
      alert("Impossible de charger les messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Supprimer un message
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer ce message ?",
    );

    if (!confirmation) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      setContacts((prev) => prev.filter((contact) => contact._id !== id));

      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));

      setSelectedContact(null);
    } catch (error) {
      console.error("Erreur suppression :", error);
      alert("Impossible de supprimer le message.");
    }
  };

  // Sélectionner / désélectionner
  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };

  // Sélectionner tous
  const handleSelectAll = () => {
    if (selectedIds.length === filteredContacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContacts.map((contact) => contact._id));
    }
  };

  // Supprimer plusieurs messages
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      alert("Sélectionnez au moins un message.");
      return;
    }

    const confirmation = window.confirm(
      `Voulez-vous supprimer ${selectedIds.length} message(s) ?`,
    );

    if (!confirmation) return;

    try {
      await axios.delete(API_URL, {
        data: {
          ids: selectedIds,
        },
      });

      setContacts((prev) =>
        prev.filter((contact) => !selectedIds.includes(contact._id)),
      );

      setSelectedIds([]);
    } catch (error) {
      console.error("Erreur suppression multiple :", error);
      alert("Impossible de supprimer les messages.");
    }
  };

  // Recherche
  const filteredContacts = contacts.filter((contact) => {
    const text = search.toLowerCase();

    return (
      contact.name?.toLowerCase().includes(text) ||
      contact.email?.toLowerCase().includes(text) ||
      contact.message?.toLowerCase().includes(text)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* En-tête */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Messages de contact
            </h1>

            <p className="mt-1 text-gray-500">
              Gestion des messages reçus par les utilisateurs
            </p>
          </div>

          <button onClick={fetchContacts} className="lux-button-primary">
            🔄 Actualiser
          </button>
        </div>

        {/* Statistiques */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Total des messages</p>

            <p className="mt-2 text-3xl font-bold text-gray-800">
              {contacts.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Résultats</p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {filteredContacts.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Sélectionnés</p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {selectedIds.length}
            </p>
          </div>
        </div>

        {/* Recherche + suppression */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder="🔍 Rechercher par nom, email ou message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
            className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            🗑️ Supprimer sélection
          </button>
        </div>

        {/* Tableau */}
        <div className="overflow-hidden rounded-xl bg-white shadow">
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Chargement des messages...
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              Aucun message trouvé.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={
                          filteredContacts.length > 0 &&
                          selectedIds.length === filteredContacts.length
                        }
                        onChange={handleSelectAll}
                      />
                    </th>

                    <th className="px-4 py-4 text-left">Nom</th>

                    <th className="px-4 py-4 text-left">Email</th>

                    <th className="px-4 py-4 text-left">Message</th>

                    <th className="px-4 py-4 text-left">Date</th>

                    <th className="px-4 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredContacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(contact._id)}
                          onChange={() => handleSelect(contact._id)}
                        />
                      </td>

                      <td className="px-4 py-4 font-medium text-gray-800">
                        {contact.name}
                      </td>

                      <td className="px-4 py-4 text-gray-600">
                        {contact.email}
                      </td>

                      <td className="max-w-xs truncate px-4 py-4 text-gray-600">
                        {contact.message}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString(
                          "fr-FR",
                        )}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setSelectedContact(contact)}
                            className="rounded-lg bg-blue-100 px-3 py-2 text-blue-700 hover:bg-blue-200"
                          >
                            👁️
                          </button>

                          <button
                            onClick={() => handleDelete(contact._id)}
                            className="rounded-lg bg-red-100 px-3 py-2 text-red-700 hover:bg-red-700"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal détail */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Détail du message
              </h2>

              <button
                onClick={() => setSelectedContact(null)}
                className="text-2xl text-gray-500 hover:text-gray-800"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nom</p>

                <p className="font-semibold text-gray-800">
                  {selectedContact.name}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>

                <a
                  href={`mailto:${selectedContact.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {selectedContact.email}
                </a>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>

                <p className="text-gray-800">
                  {new Date(selectedContact.createdAt).toLocaleString("fr-FR")}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Message</p>

                <div className="mt-2 rounded-lg bg-gray-100 p-4 text-gray-800">
                  {selectedContact.message}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <a
                href={`mailto:${selectedContact.email}`}
                className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
              >
                📧 Répondre
              </a>

              <button
                onClick={() => handleDelete(selectedContact._id)}
                className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
