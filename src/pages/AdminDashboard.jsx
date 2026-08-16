import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  //Etats pour le formulaire d'ajout de produit
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageKey, setImageKey] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();
  const API_URL = "https://backend-qv04.onrender.com/api/products";
  const IMAGES_URL = "https://backend-qv04.onrender.com/images/product/";

  // Sécurité d'acces locale
  useEffect(() => {
    const token = localStorage.getItem("lux_admin_token");
    if (!token) {
      navigate("/admin");
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProducts(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("lux_admin_token");
    navigate("/admin");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    }
  };

  // Enregistrer (ajouter ou modifier)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const productData = { name, price: Number(price), imageKey, description };
    if (editingId) {
      // mode modification (put)
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    } else {
      // mode ajout (POST)
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
    }
    // Reinitialisation
    setName("");
    setPrice("");
    setImageKey("");
    setDescription("");
    setEditingId(null);
    setShowAddForm(false);
    fetchProducts();
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImageKey(product.imageKey);
    setDescription(product.description || "");
    setShowAddForm(true);
  };

  return (
    <section className="lux-container py-12">
      <div className="flex justify-between items-center mb-8 border-b pb-4 border-line">
        <h1 className="font-display text-3xl text-ink uppercase tracking-wide">
          {" "}
          Gestion-Admin
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingId(null);
            }}
            className="lux-button-primary bg-graphite"
          >
            {showAddForm ? "Fermer le formulaire" : "+ Ajouter un produit"}
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-600 transition"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/*Formulaire dynamique */}
      {showAddForm && (
        <form
          onSubmit={handleSaveProduct}
          className="lux-card p-6 bg-cream mb-8 space-y-4 max-w-2xl"
        >
          <h3 className="font-display text-lg uppercase text-ink">
            {editingId ? "Modifier le produit" : "Ajouter un produit"}
          </h3>
          <div className="gri grid-cols-2 gap-4">
            <div>
              <label className="lux-label">Nom du modéle</label>
              <input
                type="text"
                className="lux-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="lux-label">Prix (DT)</label>
              <input
                type="number"
                className="lux-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="lux-label">Clé de l'image (Ex: rolex-sub)</label>
            <input
              type="text"
              className="lux-input"
              value={imageKey}
              onChange={(e) => setImageKey(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="lux-label">Description détaillée</label>
            <textarea
              className="lux-input h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="lux-button-primary bg-graphite">
            {editingId
              ? "Enregistrer les modifications"
              : "Publier sur le catalogue"}
          </button>
        </form>
      )}
      {/*liste de tabulaire des produits*/}
      <div className="overflow-x-auto bg-white rounded shadow-sm border border-line">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-line text-xs uppercase text-graphite tracking-wider font-semibold">
              <th className="p-4">Visuel</th>
              <th className="p-4">Modéle</th>
              <th className="p-4">Tarif</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-sm text-ink">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50/50 transition">
                <td className="p-4">
                  <img
                    src={`${IMAGES_URL}/${product.imageKey}-1.png`}
                    alt={product.name}
                    className="w-12 h-12 object-contain bg-gray-50 rounded p-1"
                  />
                </td>
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4">{product.price.toLocaleString()} DT</td>
                <td className="p-4 text-right space-x-3">
                  <button
                    onClick={() => startEdit(product)}
                    className="text-gold hover: underline"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default AdminDashboard;
