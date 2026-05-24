import { useState } from "react";

import toast from "react-hot-toast";

import {
  createProduct
} from "../services/productService";

function AddProductModal({

  open,
  onClose,
  onSuccess

}) {

  const [formData, setFormData] =
    useState({

      product_name: "",

      category: "",

      optimal_temp: "",

      model: "first",

      k_ref: "",

      Ea: "",

      quality_limit: ""
    });

  if (!open) return null;

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData({

      ...formData,

      [name]: value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createProduct({

        ...formData,

        optimal_temp:
          parseFloat(formData.optimal_temp),

        k_ref:
          parseFloat(formData.k_ref),

        Ea:
          parseFloat(formData.Ea),

        quality_limit:
          parseFloat(formData.quality_limit)
      });

      toast.success(
        "Product added successfully"
      );

      onSuccess();

      onClose();

    }

    catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.detail
        || "Failed to add product"
      );
    }
  };

  return (

    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-2xl border border-gray-200 shadow-xl p-8">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-xl font-semibold text-gray-800">

              Add Product

            </h2>

            <p className="text-gray-500 text-sm mt-1">

              Configure respiration and storage parameters.

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
            name="product_name"
            placeholder="Product Name"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <select
            name="category"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          >

            <option value="">
              Select Category
            </option>

            <option value="Vegetable">
              Vegetable
            </option>

            <option value="Fruit">
              Fruit
            </option>

            <option value="Dairy">
              Dairy
            </option>

            <option value="Meat">
              Meat
            </option>

          </select>

          <div className="relative">

            <input
              type="number"
              name="optimal_temp"
              placeholder="Optimal Temperature"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-blue-500"
              required
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">

              °C

            </span>

          </div>

          <select
            name="model"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          >

            <option value="first">
              First Order
            </option>

            <option value="zero">
              Zero Order
            </option>

            <option value="second">
              Second Order
            </option>

          </select>

          <input
            type="number"
            step="0.0001"
            name="k_ref"
            placeholder="k_ref"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="number"
            name="Ea"
            placeholder="Activation Energy (Ea)"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="number"
            step="0.01"
            name="quality_limit"
            placeholder="Quality Limit"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >

              Cancel

            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
            >

              Add Product

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddProductModal;