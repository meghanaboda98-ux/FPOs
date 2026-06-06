import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  updateInventory
} from "../services/inventoryService";

import {
  getAllProducts
} from "../services/productService";

function UpdateInventoryModal({
  open,
  onClose,
  onSuccess,
  inventoryData
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    farmer_name: "",
    phone_number: "",
    product_name: "",
    category: "",
    quantity: "",
    storage_temp: "",
    entry_date: ""
  });


  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {
      const data = await getAllProducts();
      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    }
  };


  // LOAD INVENTORY DATA
  useEffect(() => {

    if (inventoryData) {

      setFormData({

        farmer_name:
          inventoryData.farmer_name || "",

        phone_number:
          inventoryData.phone_number || "",

        product_name:
          inventoryData.product_name || "",

        category:
          inventoryData.category || "",

        quantity:
          inventoryData.quantity || "",

        storage_temp:
          inventoryData.storage_temp || "",

        entry_date:
          inventoryData.entry_date
            ?.slice(0, 16) || ""
      });
    }

  }, [inventoryData]);


  // FETCH PRODUCTS WHEN MODAL OPENS
  useEffect(() => {

    if (open) {

      fetchProducts();
    }

  }, [open]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;

    // AUTO UPDATE CATEGORY
    if (name === "product_name") {
      const selectedProduct = products.find(
        (product) =>
          product.name === value
      );
      setFormData({
        ...formData,
        product_name: value,
        category:
          selectedProduct?.category || ""
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };


  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,

        quantity:
          parseFloat(formData.quantity),
        storage_temp:
          parseFloat(formData.storage_temp)
      };

      await updateInventory(
        inventoryData.batch_id,
        payload
      );

      toast.success(
        "Inventory updated successfully"
      );
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.detail ||

        "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Update Inventory
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Modify inventory batch details.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* FARMER NAME */}
          <input
            type="text"
            name="farmer_name"
            value={formData.farmer_name}
            placeholder="Farmer Name"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          {/* PHONE NUMBER */}
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            placeholder="Phone Number"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          {/* PRODUCT */}
          <select
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          >
            <option value="">
              Select Product
            </option>
            {
              products.map((product) => (
                <option
                  key={product.id}
                  value={product.name}
                >
                  {product.name}
                </option>
              ))
            }
          </select>

          {/* CATEGORY */}
          <input
            type="text"
            name="category"
            value={formData.category}
            readOnly
            className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3"
          />

          {/* QUANTITY */}
          <input
            type="number"
            step="0.1"
            name="quantity"
            value={formData.quantity}
            placeholder="Quantity (kg)"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          {/* STORAGE TEMP */}
          <div className="relative">
            <input
              type="number"
              step="0.1"
              name="storage_temp"
              value={formData.storage_temp}
              placeholder="Storage Temperature"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-blue-500"
              required
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              °C
            </span>
          </div>

          {/* ENTRY DATE */}
          <input
            type="datetime-local"
            name="entry_date"
            value={formData.entry_date}
            onChange={handleChange}
            className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />
          {/* BUTTONS */}
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
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {
                loading
                  ? "Updating..."
                  : "Update Inventory"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UpdateInventoryModal;