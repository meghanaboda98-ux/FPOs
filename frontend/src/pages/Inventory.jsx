import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import StatusBadge from "../components/StatusBadge";

import {

  getAllInventory,

  dispatchInventory,

  deleteInventory

} from "../services/inventoryService";

import AddInventoryModal from "../components/AddInventoryModal";
import UpdateInventoryModal from "../components/UpdateInventoryModal";
import toast from "react-hot-toast";


function Inventory() {

  const [inventory, setInventory] = useState([]);

  const [openModal, setOpenModal] =
    useState(false);

  const [openUpdateModal, setOpenUpdateModal] =
    useState(false);

  const [selectedInventory, setSelectedInventory] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [total, setTotal] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const role =
    localStorage.getItem("role");


  useEffect(() => {

    fetchInventory();

  }, [

    search,
    statusFilter,
    categoryFilter,
    page
  ]);


  const fetchInventory = async () => {

    try {

      setLoading(true);

      const data =
        await getAllInventory(

          search,

          statusFilter,

          categoryFilter,

          page
        );

      setInventory(data.inventory);

      setTotal(data.total);

    }

    catch (error) {

      console.error(error);
    }

    finally {

      setLoading(false);
    }
  };


  const handleDispatch =
    async (batchId) => {

      try {

        await dispatchInventory(batchId);

        toast.success(
          "Inventory dispatched"
        );

        fetchInventory();

      }

      catch (error) {

        toast.error(
          error.response?.data?.detail
          || "Dispatch failed"
        );
      }
    };


  const handleDelete =
    async (batchId) => {

      const confirmDelete =
        window.confirm(
          "Delete this inventory batch?"
        );

      if (!confirmDelete) return;

      try {

        await deleteInventory(batchId);

        toast.success(
          "Inventory deleted"
        );

        fetchInventory();

      }

      catch (error) {

        toast.error(
          error.response?.data?.detail
          || "Delete failed"
        );
      }
    };

    const handleEdit = (item) => {

       setSelectedInventory(item);

       setOpenUpdateModal(true);
    };

  return (

    <MainLayout>

      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-2xl font-semibold text-gray-800">

            Inventory

          </h1>

          <p className="text-gray-500 mt-1">

            Monitor all stored product batches.

          </p>

        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all"
        >

          Add Inventory

        </button>

      </div>


      {/* SEARCH + FILTERS */}

      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search farmer, batch or product..."
            value={search}
            onChange={(e) => {

              setPage(1);

              setSearch(e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => {

              setPage(1);

              setStatusFilter(e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          >

            <option value="">
              All Status
            </option>

            <option value="ACTIVE">
              ACTIVE
            </option>

            <option value="WARNING">
              WARNING
            </option>

            <option value="CRITICAL">
              CRITICAL
            </option>

            <option value="EXPIRED">
              EXPIRED
            </option>

            <option value="DISPATCHED">
              DISPATCHED
            </option>

          </select>

          <select
            value={categoryFilter}
            onChange={(e) => {

              setPage(1);

              setCategoryFilter(e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          >

            <option value="">
              All Categories
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

          <button
            onClick={() => {

              setSearch("");

              setStatusFilter("");

              setCategoryFilter("");

              setPage(1);
            }}
            className="border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-all"
          >

            Reset Filters

          </button>

        </div>

      </div>


      {/* TABLE */}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Batch ID
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Farmer
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Quantity
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Quality
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Remaining Days
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {
                loading ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center py-10 text-gray-500"
                    >

                      Loading inventory...

                    </td>

                  </tr>

                ) : inventory.length === 0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center py-10 text-gray-500"
                    >

                      No inventory available

                    </td>

                  </tr>

                ) : (

                  inventory.map((item) => (

                    <tr
                      key={item.batch_id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                    >

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {item.batch_id}

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {item.farmer_name}

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {item.product_name}

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {item.quantity}

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {item.quality}

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {item.remaining_days}

                      </td>

                      <td className="px-6 py-4">

                        <StatusBadge
                          status={item.status}
                        />

                      </td>

                      <td className="px-6 py-4">

                       <div className="flex items-center gap-3">

  {
    (
      role === "SUPER_ADMIN"
      || role === "FPO_MANAGER"
    )

    && (

      <button
        onClick={() => handleEdit(item)}
        className="text-sm px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
      >

        Edit

      </button>
    )
  }

  {
    (
      role === "SUPER_ADMIN"
      || role === "FPO_MANAGER"
    )

    &&

    item.status !== "DISPATCHED"

    && (

      <button
        onClick={() =>
          handleDispatch(item.batch_id)
        }
        className="text-sm px-3 py-1 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50 transition-all"
      >

        Dispatch

      </button>
    )
  }

  {
    role === "SUPER_ADMIN"

    && (

      <button
        onClick={() =>
          handleDelete(item.batch_id)
        }
        className="text-sm px-3 py-1 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 transition-all"
      >

        Delete

      </button>
    )
  }

</div>

                      </td>

                    </tr>
                  ))
                )
              }

            </tbody>

          </table>

        </div>

      </div>


      {/* PAGINATION */}

      <div className="flex items-center justify-between mt-6">

        <p className="text-sm text-gray-500">

          Total Records: {total}

        </p>

        <div className="flex gap-3">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >

            Previous

          </button>

          <div className="px-4 py-2 text-sm text-gray-600">

            Page {page}

          </div>

          <button
            disabled={inventory.length === 0}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >

            Next

          </button>

        </div>

      </div>


      {/* MODAL */}

      <AddInventoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchInventory}
      />

      <UpdateInventoryModal

  open={openUpdateModal}

  onClose={() =>
    setOpenUpdateModal(false)
  }

  onSuccess={fetchInventory}

  inventoryData={selectedInventory}

/>

    </MainLayout>
  );
}

export default Inventory;