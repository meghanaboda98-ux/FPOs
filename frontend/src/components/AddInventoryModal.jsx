import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { createInventory } from "../services/inventoryService";
import { getAllProducts } from "../services/productService";

function AddInventoryModal({ open, onClose, onSuccess }) {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    farmer_name: "",
    phone_number: "",
    product_name: "",
    quantity: ""
  });

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();

      console.log("Products API Response:", data);

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts(data?.products || []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
      setProducts([]);
    }
  };

  useEffect(() => {
    if (open) {
      fetchProducts();
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.farmer_name ||
      !formData.phone_number ||
      !formData.product_name ||
      !formData.quantity
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        farmer_name: formData.farmer_name,
        phone_number: formData.phone_number,
        product_name: formData.product_name,
        quantity: Number(formData.quantity)
      };

      await createInventory(payload);

      toast.success("Inventory added successfully");

      setFormData({
        farmer_name: "",
        phone_number: "",
        product_name: "",
        quantity: ""
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Failed to add inventory"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Add Inventory
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add farmer product batch into cold storage.
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
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            type="text"
            name="farmer_name"
            value={formData.farmer_name}
            placeholder="Farmer Name"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            placeholder="Phone Number"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <select
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 bg-white"
            required
          >
            <option value="">Select Product</option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.name}
              >
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            placeholder="Quantity (kg)"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <div className="md:col-span-2 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              Category, temperature, humidity, shelf life, Ea, k_ref,
              quality, spoilage and dispatch priority will be filled
              automatically from Product Master.
            </p>
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 pt-4">
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
              {loading ? "Adding..." : "Add Inventory"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddInventoryModal;