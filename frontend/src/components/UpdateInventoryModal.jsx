import { useState, useEffect } from "react";

import toast from "react-hot-toast";

import {
  updateInventory
} from "../services/inventoryService";


function UpdateInventoryModal({

  open,

  onClose,

  onSuccess,

  inventoryData

}) {

  const [formData, setFormData] =
    useState({

      farmer_name: "",

      phone_number: "",

      product_name: "",

      category: "",

      quantity: "",

      storage_temp: "",

      entry_date: ""
    });


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

      await updateInventory(

        inventoryData.batch_id,

        formData
      );

      toast.success(
        "Inventory updated successfully"
      );

      onSuccess();

      onClose();

    }

    catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.detail
        || "Update failed"
      );
    }
  };


  return (

    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-2xl border border-gray-200 shadow-xl p-8">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-xl font-semibold text-gray-800">

              Update Inventory

            </h2>

            <p className="text-gray-500 text-sm mt-1">

              Modify inventory batch details.

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
            value={formData.farmer_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={formData.product_name}
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

          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <div className="relative">

            <input
              type="number"
              name="storage_temp"
              placeholder="Storage Temp"
              value={formData.storage_temp}
              onChange={handleChange}
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
            value={formData.entry_date}
            onChange={handleChange}
            className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
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

              Update Inventory

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default UpdateInventoryModal;