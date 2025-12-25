import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle signup submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      alert("Please select a role");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/register", formData);

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-slate-800">

      {/* ===== STATIC BACKGROUND IMAGE ===== */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: "url('/src/assets/hero-bg.webp')" }}
      />
      <div className="fixed inset-0 bg-white/70 -z-10" />

      {/* ===== SIGNUP CARD ===== */}
      <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl shadow-lg w-full max-w-lg p-8">
        
        <h2 className="text-2xl font-semibold text-center text-emerald-700 mb-2">
          Create an Account
        </h2>

        <p className="text-sm text-slate-500 text-center mb-6">
          Register for PM Internship Portal
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <Input
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

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
              Register As
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-medium transition
              ${loading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
              }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-slate-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-700 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

/* ===== REUSABLE INPUT COMPONENT ===== */

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

export default Signup;
