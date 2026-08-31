import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://backend-qv04.onrender.com/api/orders";

const statuses = [
  "En attente",
  "Confirmée",
  "En préparation",
  "Expédiée",
  "Livrée",
  "Annulée",
];

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Toutes");
  const [dateFilter, setDateFilter] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // =========================
  // RÉCUPÉRER LES COMMANDES
  // =========================

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        setError("Impossible de récupérer les commandes.");
      }
    } catch (error) {
      console.error("Erreur récupération commandes :", error);

      setError(
        error.response?.data?.message ||
          "Erreur lors du chargement des commandes.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // =========================
  // MODIFIER LE STATUT
  // =========================

  const changeStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      setMessage("");

      const response = await axios.put(`${API_URL}/${orderId}/status`, {
        status,
      });

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status } : order,
          ),
        );

        setMessage("Statut mis à jour avec succès.");

        if (selectedOrder?._id === orderId) {
          setSelectedOrder((prev) => ({
            ...prev,
            status,
          }));
        }
      }
    } catch (error) {
      console.error("Erreur statut :", error);

      setMessage(
        error.response?.data?.message || "Impossible de modifier le statut.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // =========================
  // SUPPRIMER
  // =========================

  const deleteOrder = async (orderId) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette commande ? Cette action est irréversible.",
    );

    if (!confirmation) return;

    try {
      setDeletingId(orderId);
      setMessage("");

      const response = await axios.delete(`${API_URL}/${orderId}`);

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId),
        );

        setSelectedOrder(null);
        setMessage("Commande supprimée avec succès.");
      }
    } catch (error) {
      console.error("Erreur suppression :", error);

      setMessage(
        error.response?.data?.message || "Impossible de supprimer la commande.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // FILTRAGE
  // =========================

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        order.fullName?.toLowerCase().includes(searchText) ||
        order.phone?.toLowerCase().includes(searchText) ||
        order.city?.toLowerCase().includes(searchText) ||
        order._id?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "Toutes" || order.status === statusFilter;

      const matchesDate =
        !dateFilter ||
        new Date(order.createdAt).toISOString().slice(0, 10) === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, search, statusFilter, dateFilter]);

  // =========================
  // STATISTIQUES
  // =========================

  const statistics = useMemo(() => {
    const total = orders.length;

    const pending = orders.filter(
      (order) => order.status === "En attente",
    ).length;

    const confirmed = orders.filter(
      (order) => order.status === "Confirmée",
    ).length;

    const preparation = orders.filter(
      (order) => order.status === "En préparation",
    ).length;

    const shipped = orders.filter(
      (order) => order.status === "Expédiée",
    ).length;

    const delivered = orders.filter(
      (order) => order.status === "Livrée",
    ).length;

    const cancelled = orders.filter(
      (order) => order.status === "Annulée",
    ).length;

    const revenue = orders
      .filter((order) => order.status !== "Annulée")
      .reduce((total, order) => total + Number(order.totalPrice || 0), 0);

    const products = orders.reduce(
      (total, order) =>
        total +
        (order.items || []).reduce(
          (sum, item) => sum + Number(item.quantity || 0),
          0,
        ),
      0,
    );

    return {
      total,
      pending,
      confirmed,
      preparation,
      shipped,
      delivered,
      cancelled,
      revenue,
      products,
    };
  }, [orders]);

  // =========================
  // EXPORT CSV
  // =========================

  const exportCSV = () => {
    if (filteredOrders.length === 0) {
      setMessage("Aucune commande à exporter.");
      return;
    }

    const headers = [
      "ID",
      "Nom",
      "Téléphone",
      "Ville",
      "Adresse",
      "Statut",
      "Total",
      "Date",
    ];

    const rows = filteredOrders.map((order) => [
      order._id,
      order.fullName,
      order.phone,
      order.city,
      order.adresse?.replace(/\n/g, " "),
      order.status,
      order.totalPrice,
      new Date(order.createdAt).toLocaleString(),
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
    link.download = "commandes.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setMessage("Commandes exportées avec succès.");
  };

  // =========================
  // CHARGEMENT
  // =========================

  if (loading) {
    return (
      <section className="lux-container py-16">
        <p className="text-graphite">Chargement des commandes...</p>
      </section>
    );
  }

  return (
    <section className="lux-container py-16">
      {/* HEADER */}

      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-gold">
            Administration
          </p>

          <h1 className="font-display text-4xl text-ink">
            Gestion des commandes
          </h1>

          <p className="mt-3 text-graphite">
            Consultez, recherchez et gérez toutes les commandes.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={loadOrders} className="lux-button-primary">
            🔄 Actualiser
          </button>

          <button onClick={exportCSV} className="lux-button-primary">
            📥 Exporter CSV
          </button>

          <Link to="/contacts1">
            <button type="button" className="lux-button-primary ">
              Liste de messages
            </button>
          </Link>
        </div>
      </div>

      {/* MESSAGE */}

      {message && (
        <div className="mb-6 rounded-lg border border-line bg-white p-4 font-semibold text-gold">
          {message}
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="font-semibold text-red-500">{error}</p>

          <button onClick={loadOrders} className="lux-button-primary mt-4">
            Réessayer
          </button>
        </div>
      )}

      {/* STATISTIQUES */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lux-card">
          <p className="text-sm text-graphite">Total commandes</p>
          <p className="mt-2 text-3xl font-display text-ink">
            {statistics.total}
          </p>
        </div>

        <div className="lux-card">
          <p className="text-sm text-graphite">En attente</p>
          <p className="mt-2 text-3xl font-display text-ink">
            {statistics.pending}
          </p>
        </div>

        <div className="lux-card">
          <p className="text-sm text-graphite">Livrées</p>
          <p className="mt-2 text-3xl font-display text-ink">
            {statistics.delivered}
          </p>
        </div>

        <div className="lux-card">
          <p className="text-sm text-graphite">Chiffre d'affaires</p>
          <p className="mt-2 text-3xl font-display text-ink">
            {statistics.revenue.toLocaleString()} TND
          </p>
        </div>
      </div>

      {/* AUTRES STATISTIQUES */}

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lux-card">
          <p className="text-sm text-graphite">Confirmées</p>
          <p className="mt-2 text-2xl font-semibold text-ink">
            {statistics.confirmed}
          </p>
        </div>

        <div className="lux-card">
          <p className="text-sm text-graphite">En préparation</p>
          <p className="mt-2 text-2xl font-semibold text-ink">
            {statistics.preparation}
          </p>
        </div>

        <div className="lux-card">
          <p className="text-sm text-graphite">Expédiées</p>
          <p className="mt-2 text-2xl font-semibold text-ink">
            {statistics.shipped}
          </p>
        </div>

        <div className="lux-card">
          <p className="text-sm text-graphite">Articles commandés</p>
          <p className="mt-2 text-2xl font-semibold text-ink">
            {statistics.products}
          </p>
        </div>
      </div>

      {/* FILTRES */}

      <div className="lux-card mt-8">
        <h2 className="font-display text-2xl text-ink">
          Rechercher une commande
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <input
            type="text"
            className="lux-input"
            placeholder="Nom, téléphone, ville ou ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="lux-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Toutes">Tous les statuts</option>

            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="lux-input"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        <div className="mt-4 flex justify-between">
          <p className="text-sm text-graphite">
            {filteredOrders.length} commande(s)
          </p>

          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("Toutes");
              setDateFilter("");
            }}
            className="text-sm font-semibold text-gold"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      {/* COMMANDES */}

      <div className="mt-8">
        {filteredOrders.length === 0 ? (
          <div className="lux-card">
            <p className="text-graphite">Aucune commande trouvée.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order._id} className="lux-card">
                {/* EN-TÊTE */}

                <div className="flex flex-col justify-between gap-5 border-b border-line pb-5 lg:flex-row lg:items-center">
                  <div>
                    <p className="text-sm text-graphite">Commande</p>

                    <p className="mt-1 break-all font-semibold text-ink">
                      #{order._id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-graphite">Date</p>

                    <p className="mt-1 text-ink">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* STATUT */}

                  <div>
                    <p className="mb-2 text-sm text-graphite">Statut</p>

                    <select
                      className="lux-input"
                      value={order.status || "En attente"}
                      disabled={updatingId === order._id}
                      onChange={(e) => changeStatus(order._id, e.target.value)}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-gray-50"
                    >
                      👁️ Détails
                    </button>

                    <button
                      onClick={() => deleteOrder(order._id)}
                      disabled={deletingId === order._id}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      {deletingId === order._id
                        ? "Suppression..."
                        : "🗑️ Supprimer"}
                    </button>
                  </div>
                </div>

                {/* CONTENU */}

                <div className="mt-6 grid gap-8 lg:grid-cols-2">
                  {/* CLIENT */}

                  <div>
                    <h2 className="font-display text-xl text-ink">
                      Informations client
                    </h2>

                    <div className="mt-4 space-y-2 text-graphite">
                      <p>
                        <strong>Nom :</strong> {order.fullName}
                      </p>

                      <p>
                        <strong>Téléphone :</strong> {order.phone}
                      </p>

                      <p>
                        <strong>Ville :</strong> {order.city}
                      </p>

                      <p>
                        <strong>Adresse :</strong> {order.adresse}
                      </p>
                    </div>
                  </div>

                  {/* PRODUITS */}

                  <div>
                    <h2 className="font-display text-xl text-ink">Produits</h2>

                    <div className="mt-4 space-y-3">
                      {order.items?.map((item, index) => (
                        <div
                          key={item._id || index}
                          className="flex justify-between gap-4 border-b border-line pb-3"
                        >
                          <div>
                            <p className="font-medium text-ink">{item.name}</p>

                            <p className="text-sm text-graphite">
                              {item.price?.toLocaleString()} TND ×{" "}
                              {item.quantity}
                            </p>
                          </div>

                          <p className="font-semibold text-ink">
                            {(
                              Number(item.price) * Number(item.quantity)
                            ).toLocaleString()}{" "}
                            TND
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex justify-between border-t border-line pt-4">
                      <span className="font-semibold text-ink">Total</span>

                      <span className="font-display text-2xl text-ink">
                        {Number(order.totalPrice).toLocaleString()} TND
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODALE DÉTAILS */}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <p className="text-sm text-gold">Détails de la commande</p>

                <h2 className="font-display text-2xl text-ink">
                  #{selectedOrder._id}
                </h2>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full px-3 py-2 text-xl text-graphite hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-display text-xl text-ink">Client</h3>

                <div className="mt-3 space-y-2 text-graphite">
                  <p>
                    <strong>Nom :</strong> {selectedOrder.fullName}
                  </p>

                  <p>
                    <strong>Téléphone :</strong> {selectedOrder.phone}
                  </p>

                  <p>
                    <strong>Ville :</strong> {selectedOrder.city}
                  </p>

                  <p>
                    <strong>Adresse :</strong> {selectedOrder.adresse}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl text-ink">Commande</h3>

                <div className="mt-3 space-y-2 text-graphite">
                  <p>
                    <strong>Statut :</strong> {selectedOrder.status}
                  </p>

                  <p>
                    <strong>Date :</strong>{" "}
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>

                  <p>
                    <strong>Total :</strong>{" "}
                    {Number(selectedOrder.totalPrice).toLocaleString()} TND
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-xl text-ink">
                Articles commandés
              </h3>

              <div className="mt-4 space-y-3">
                {selectedOrder.items?.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex justify-between border-b border-line pb-3"
                  >
                    <div>
                      <p className="font-medium text-ink">{item.name}</p>

                      <p className="text-sm text-graphite">
                        Quantité : {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      {(
                        Number(item.price) * Number(item.quantity)
                      ).toLocaleString()}{" "}
                      TND
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="lux-button-primary"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default OrdersPage;
