import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import {
  getCategoryAnalytics as getCategoryDistribution,
  getStatusAnalytics as getStatusDistribution,
  getDashboardAnalytics as getSpoilageOverview
} from "../services/analyticsService";

function Analytics() {

  const [categories, setCategories] = useState([]);

  const [statuses, setStatuses] = useState([]);

  const [spoilage, setSpoilage] = useState({});

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const categoryData =
        await getCategoryDistribution();

      const statusData =
        await getStatusDistribution();

      const spoilageData =
        await getSpoilageOverview();

      setCategories(categoryData.categories);

      setStatuses(statusData.statuses);

      setSpoilage(spoilageData);

    }

    catch (error) {

      console.error(error);
    }
  };

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#ca8a04",
    "#6b7280"
  ];

  return (

    <>

      <div className="mb-8">

        <h1 className="text-2xl font-semibold text-gray-800">

          Analytics

        </h1>

        <p className="text-gray-500 mt-1">

          Inventory insights and spoilage monitoring.

        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            Spoilage Percentage
          </p>

          <h2 className="text-4xl font-semibold text-gray-800 mt-3">

            {spoilage.spoilage_percentage || 0}%

          </h2>

          <p className="text-sm text-gray-400 mt-2">

            Overall expired inventory rate

          </p>

        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Batches
          </p>

          <h2 className="text-4xl font-semibold text-gray-800 mt-3">

            {spoilage.total_batches || 0}

          </h2>

        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            Expired Batches
          </p>

          <h2 className="text-4xl font-semibold text-gray-800 mt-3">

            {spoilage.expired_batches || 0}

          </h2>

        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-lg font-semibold text-gray-800">

              Category Distribution

            </h2>

          </div>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={categories}
                  dataKey="count"
                  nameKey="_id"
                  outerRadius={110}
                >

                  {
                    categories.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[index % COLORS.length]
                        }
                      />
                    ))
                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-lg font-semibold text-gray-800">

              Inventory Status

            </h2>

          </div>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={statuses}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="_id" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="count" fill="#2563eb" />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </>
  );
}

export default Analytics;