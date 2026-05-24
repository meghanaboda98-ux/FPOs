import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      toast.success("User registered successfully");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-sm p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-1">
            Register operator or manager account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Name</label>

            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm text-gray-600 mb-2">Role</label>

            <select
              name="role"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Role</option>

              <option value="FPO_MANAGER">FPO Manager</option>

              <option value="CAAS_OPERATOR">CAAS Operator</option>
            </select>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all"
            >
              Register
            </button>

            <div className="text-center text-sm text-gray-500">
              Already have an account?
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 cursor-pointer ml-1 hover:underline"
              >
                Login
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
