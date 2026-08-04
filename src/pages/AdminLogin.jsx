import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    // Identifiants d'administration temporaires
    if (username === "admin" && password === "maison2026") {
      localStorage.setItem("lux_admin_token", "authenticated_secure_session");
      navigate("/admin/dashboard");
    } else {
      setError("Identifiants incorrects. Accès refusé.");
    }
  };
  return (
    <section className="lux-container py-20 max-w-md mx-auto">
      <div className="lux-card p-8 bg-white shadow-md rounded">
        <h2 className="font-display text-2xl text-ink uppercase tracking-wider mb-6 text-center">
          Connexion Admin
        </h2>
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="lux-label text-sm">Identifiant</label>
            <input
              type="text"
              className="lux-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="lux-label text-sm">Mot de passe</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="lux-input pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="lux-button-primary w-full mt-2">
            Se connecter
          </button>
        </form>
      </div>
    </section>
  );
}
export default AdminLogin;
