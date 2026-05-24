import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getAllProducts
} from "../services/productService";

import AddProductModal from "../components/AddProductModal";

function Products() {

  const [products, setProducts] =
    useState([]);

  const [openModal, setOpenModal] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const data =
        await getAllProducts();

      setProducts(data.products);

    }

    catch (error) {

      console.error(error);
    }

    finally {

      setLoading(false);
    }
  };

  return (

    <MainLayout>

      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-2xl font-semibold text-gray-800">

            Product Master

          </h1>

          <p className="text-gray-500 mt-1">

            Manage product respiration parameters and storage configurations.

          </p>

        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all"
        >

          Add Product

        </button>

      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Optimal Temp
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Model
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  k_ref
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Ea
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Quality Limit
                </th>

              </tr>

            </thead>

            <tbody>

              {
                loading ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-500"
                    >

                      Loading products...

                    </td>

                  </tr>

                ) : products.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-500"
                    >

                      No products available

                    </td>

                  </tr>

                ) : (

                  products.map((product) => (

                    <tr
                      key={product.product_name}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                    >

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {product.product_name}

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {product.category}

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {product.optimal_temp}°C

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {product.model}

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {product.k_ref}

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {product.Ea}

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">

                        {product.quality_limit}

                      </td>

                    </tr>
                  ))
                )
              }

            </tbody>

          </table>

        </div>

      </div>

      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchProducts}
      />

    </MainLayout>
  );
}

export default Products;