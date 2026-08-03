import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/productsData.js";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  //Etat pour les champs du formulaire
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageKey, setImageKey] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();
  const API_URL =
    import.meta.env.VITE_API_URL ||
    (typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:5001/api/products"
      : "https://backend-qv04.onrender.com/api/products");
  const IMAGE_BASE_URL =
    import.meta.env.VITE_IMAGE_URL ||
    "https://backend-qv04.onrender.com/images/product";

  const normalizeProduct = (product, index = 0) => ({
    ...product,
    _id: product._id ?? product.id ?? String(index + 1),
    id: product.id ?? product._id ?? index + 1,
    name: product.name ?? "Produit sans nom",
    price: Number(product.price || 0),
    imageKey: product.imageKey ?? product.slug ?? product.name,
  });

  const getFallbackProducts = () => productsData.map(normalizeProduct);

  //sécurité pour l'accès à la page admin
  useEffect(() => {
    const token = localStorage.getItem("lux_admin_token");
    if (!token) {
      navigate("/admin");
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const rest = await fetch(API_URL, {
        headers: { Accept: "application/json" },
      });
      if (!rest.ok) throw new Error("Impossible de charger les produits");

      const payload = await rest.json();
      const sourceProducts = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.products)
          ? payload.products
          : [];

      setProducts(sourceProducts.map(normalizeProduct));
    } catch (error) {
      console.warn("Chargement distant impossible, utilisation des produits locaux :", error);
      setProducts(getFallbackProducts());
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("lux_admin_token");
    navigate("/admin");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Suppression impossible");

      setProducts((prev) =>
        prev.filter((product) => (product._id ?? product.id) !== id),
      );
    } catch (error) {
      console.warn("Suppression impossible, retrait local :", error);
      setProducts((prev) =>
        prev.filter((product) => (product._id ?? product.id) !== id),
      );
    }
  };

  // Enregistrement d'un nouveau produit ou mise à jour d'un produit existant
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const productData = {
      name: name.trim(),
      price: Number(price),
      imageKey: imageKey.trim(),
      description: description.trim(),
    };

    try {
      let response;
      if (editingId) {
        response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });
      }

      if (!response.ok) throw new Error("Enregistrement impossible");

      const savedProduct = await response.json();
      const normalizedSavedProduct = normalizeProduct(savedProduct, products.length);

      setProducts((prev) =>
        editingId
          ? prev.map((product) =>
              (product._id ?? product.id) === editingId
                ? normalizedSavedProduct
                : product,
            )
          : [normalizedSavedProduct, ...prev],
      );
    } catch (error) {
      console.warn("Sauvegarde distante impossible, mise à jour locale :", error);
      const tempProduct = normalizeProduct(
        {
          ...productData,
          _id: editingId ?? String(Date.now()),
          id: editingId ?? Date.now(),
        },
        products.length,
      );

      setProducts((prev) =>
        editingId
          ? prev.map((product) =>
              (product._id ?? product.id) === editingId ? tempProduct : product,
            )
          : [tempProduct, ...prev],
      );
    }

    setName("");
    setPrice("");
    setImageKey("");
    setDescription("");
    setEditingId(null);
    setShowAddForm(false);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setImageKey(product.imageKey);
    setDescription(product.description);
    setShowAddForm(true);
  };
  return (
    <section className="lux-container py-12 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b pb-4 border-line">
        <h1 className="font-display text-3xl text-ink uppercase tracking-wider">
          Espace Admin
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
      {/* Formulaire d'ajout ou de modification de produit */}
      {showAddForm && (
        <form
          onSubmit={handleSaveProduct}
          className="lux-card p-6 bg-cream mb-8 space-y-4 max-w-2xl"
        >
          <h3 className="font-display text-lg uppercase text-ink">
            {editingId ? "Modifier le produit" : "Ajouter un produit"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="lux-label">Nom du modèle</label>
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
            {editingId ? "Enregistrer les modifications" : "Publier le produit"}
          </button>
        </form>
      )}
      {/* Liste tabulaire des produits */}
      <div className="overflow-x-auto bg-white rounded shadow-sm border border-line">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-line text-xs uppercase text-graphite tracking-wider font-semibold">
              <th className="p-4">Visuel</th>
              <th className="p-4">Modèle</th>
              <th className="p-4">Tarif</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line text-sm text-ink">
            {products.map((product) => {
              const imagePath = `${IMAGE_BASE_URL}/${product.imageKey ?? product.slug ?? "default"}-1.png`;

              return (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50/50 transition"
                >
                  <td className="p-4">
                    <img
                      src={imagePath}
                      alt={product.name}
                      className="h-12 w-12 object-contain bg-gray-50 rounded p-1"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `${IMAGE_BASE_URL}/default.png`;
                      }}
                    />
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">{product.price.toLocaleString()} DT</td>
                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => startEdit(product)}
                      className="text-gold hover:underline"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:underline"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default AdminDashboard;
