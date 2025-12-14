import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const login = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      const storage = form.remember ? localStorage : sessionStorage;
      storage.setItem("token", res.data.access_token);

      toast.success("Login successful 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-3 w-full mb-3 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-3 w-full mb-3 rounded"
          onChange={handleChange}
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="remember"
            className="mr-2"
            onChange={handleChange}
          />
          <label className="text-sm">Remember me</label>
        </div>

        <button
          onClick={login}
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 text-white w-full py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-pink-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}