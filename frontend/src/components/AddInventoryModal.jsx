import { useEffect, useState } from "react";

import { createInventory } from "../services/inventoryService";

import toast from "react-hot-toast";
function AddInventoryModal({ open, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    farmer_name: "",
    phone_number: "",

    product_name: "",
    category: "",

    quantity: "",
    storage_temp: "",

    entry_date: "",
  });

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();

      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createInventory(formData);

      onSuccess();
      toast.success("Inventory added successfully.");

      onClose();
    } catch (error) {
      toast.error("Failed to add inventory.");
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Add Inventory
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add new product batch into storage.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            type="text"
            name="farmer_name"
            placeholder="Farmer Name"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
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
            name="quantity"
            placeholder="Quantity (Eg: 5 kg)"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <div className="relative">
            <input
              type="number"
              name="storage_temp"
              onChange={handleChange}
              placeholder="Storage Temp"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-blue-500"
              required
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              °C
            </span>
          </div>

          <input
            type="datetime-local"
            name="entry_date"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInventoryModal;
