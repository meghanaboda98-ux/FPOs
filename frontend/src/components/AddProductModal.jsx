import { useState } from "react";
import toast from "react-hot-toast";
import { createProduct } from "../services/productService";

function AddProductModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    optimal_temperature: "",
    humidity: "",
    shelf_life: "",
    respiration_rate: "",
    storage_type: "",
    min_temperature: "",
    max_temperature: "",
    quality_threshold: ""
  });

  const getPredictionDefaults = (category) => {
    if (category === "Vegetable") {
      return {
        model: "first",
        k_ref: 0.006,
        Ea: 48000
      };
    }

    if (category === "Fruit") {
      return {
        model: "first",
        k_ref: 0.007,
        Ea: 50000
      };
    }

    if (category === "Dairy") {
      return {
        model: "first",
        k_ref: 0.015,
        Ea: 55000
      };
    }

    if (category === "Meat") {
      return {
        model: "first",
        k_ref: 0.022,
        Ea: 62000
      };
    }

    return {
      model: "first",
      k_ref: 0.005,
      Ea: 45000
    };
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.optimal_temperature ||
      !formData.humidity ||
      !formData.shelf_life ||
      !formData.respiration_rate ||
      !formData.storage_type ||
      !formData.min_temperature ||
      !formData.max_temperature ||
      !formData.quality_threshold
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const defaults = getPredictionDefaults(formData.category);

      const payload = {
        name: formData.name,
        category: formData.category,
        optimal_temperature: Number(formData.optimal_temperature),
        humidity: Number(formData.humidity),
        shelf_life: Number(formData.shelf_life),
        respiration_rate: Number(formData.respiration_rate),
        storage_type: formData.storage_type,
        min_temperature: Number(formData.min_temperature),
        max_temperature: Number(formData.max_temperature),
        quality_threshold: Number(formData.quality_threshold),

        model: defaults.model,
        k_ref: defaults.k_ref,
        Ea: defaults.Ea
      };

      await createProduct(payload);

      toast.success("Product added successfully");

      setFormData({
        name: "",
        category: "",
        optimal_temperature: "",
        humidity: "",
        shelf_life: "",
        respiration_rate: "",
        storage_type: "",
        min_temperature: "",
        max_temperature: "",
        quality_threshold: ""
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Add Product Master
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add a new product that is not already in the product master list.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Product Name"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 bg-white"
            required
          >
            <option value="">Select Category</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
          </select>

          <input
            type="text"
            name="storage_type"
            value={formData.storage_type}
            placeholder="Storage Type"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="number"
            step="0.1"
            name="optimal_temperature"
            value={formData.optimal_temperature}
            placeholder="Optimal Temperature °C"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="number"
            step="0.1"
            name="min_temperature"
            value={formData.min_temperature}
            placeholder="Min Temperature °C"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="number"
            step="0.1"
            name="max_temperature"
            value={formData.max_temperature}
            placeholder="Max Temperature °C"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="number"
            step="0.1"
            name="humidity"
            value={formData.humidity}
            placeholder="Humidity %"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="number"
            name="shelf_life"
            value={formData.shelf_life}
            placeholder="Shelf Life Days"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="number"
            step="0.1"
            name="respiration_rate"
            value={formData.respiration_rate}
            placeholder="Respiration Rate"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="number"
            step="0.1"
            name="quality_threshold"
            value={formData.quality_threshold}
            placeholder="Quality Threshold"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <div className="md:col-span-3 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              model, k_ref and Ea are automatically assigned based on category.
              Inventory will use this product master data automatically.
            </p>
          </div>

          <div className="md:col-span-3 flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;