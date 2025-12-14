import { Link, useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();

  // token check (supports Remember Me)
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const loggedIn = !!token;
  const admin = isAdmin();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-pink-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">
        <Link to="/">🍬 Sweet Shop</Link>
      </h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>

        {/* Admin link only for admin */}
        {admin && <Link to="/admin">Admin</Link>}

        {/* Login / Logout toggle */}
        {!loggedIn && <Link to="/login">Login</Link>}

        {loggedIn && (
          <button
            onClick={handleLogout}
            className="bg-white text-pink-600 px-3 py-1 rounded font-semibold"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}