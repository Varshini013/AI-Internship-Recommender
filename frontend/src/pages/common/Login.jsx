import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= HANDLE LOGIN ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Please select your role");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, role: backendRole } = res.data;

      // 🔐 Role mismatch protection
      if (backendRole !== formData.role) {
        alert(`You are registered as ${backendRole}. Please select correct role.`);
        setLoading(false);
        return;
      }

      /* ================= SAVE AUTH ================= */
      localStorage.setItem("token", token);
      localStorage.setItem("role", backendRole);

      /* ================= REDIRECT ================= */
      if (backendRole === "admin") navigate("/admin", { replace: true });
      else if (backendRole === "mentor") navigate("/mentor", { replace: true });
      else navigate("/student", { replace: true });

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-slate-800">

      {/* ===== STATIC BACKGROUND IMAGE (VITE SAFE) ===== */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: "url('/hero-bg.webp')" }}
      />
      <div className="fixed inset-0 bg-white/70 -z-10" />

      {/* ===== LOGIN CARD ===== */}
      <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl shadow-lg w-full max-w-md p-8">

        <h2 className="text-2xl font-semibold text-center text-emerald-700 mb-2">
          Welcome Back
        </h2>

        <p className="text-sm text-slate-500 text-center mb-6">
          Login to PM Internship Portal
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password */}
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Login As
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-medium transition
              ${loading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-slate-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-emerald-700 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

/* ================= INPUT COMPONENT ================= */

const Input = ({ label, name, type, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2 border border-slate-300 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
  </div>
);

export default Login;
