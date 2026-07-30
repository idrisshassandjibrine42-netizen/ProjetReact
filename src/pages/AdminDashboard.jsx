import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5001/api/products";
  useEffect(() => {
    const token = localStorage.getItem("lux_admin_token");
    if (!token) {
      navigate("/admin/login");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("lux_admin_token");
    navigate("/admin/login");
  };
  return (
    <section className="lux-container py-12 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b pb-4 border-line">
        <h1 className="font-display text-2xl text-ink uppercase tracking-wider">
          Espace Admin
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Déconnexion
        </button>
      </div>
      <p className="text-gray-500">Sécurité opérationnelle.</p>
    </section>
  );
}
export default AdminDashboard;
