import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

import { saveToken, saveRole } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      saveToken(data.access_token);

      saveRole(data.role);

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-sm p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">CAAS Login</h1>

          <p className="text-gray-500 mt-1">Cold Storage Management Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Email</label>

            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Password</label>

            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all"
          >
            Login
          </button>

          <div className="text-center text-sm text-gray-500 pt-2">
            Don’t have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer ml-1"
            >
              Register
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
