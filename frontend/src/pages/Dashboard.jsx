import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {

  getDashboardAnalytics,

  getCategoryAnalytics,

  getStatusAnalytics

} from "../services/analyticsService";

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid

} from "recharts";


function Dashboard() {

  const [dashboard, setDashboard] =
    useState({});

  const [categoryData, setCategoryData] =
    useState([]);

  const [statusData, setStatusData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    fetchDashboard();

  }, []);


  const fetchDashboard = async () => {

    try {

      setLoading(true);

      const dashboardRes =
        await getDashboardAnalytics();

      const categoryRes =
        await getCategoryAnalytics();

      const statusRes =
        await getStatusAnalytics();

      setDashboard(dashboardRes);

      setCategoryData(
        categoryRes.categories || []
      );

      setStatusData(
        statusRes.status || []
      );

    }

    catch (error) {

      console.error(error);
    }

    finally {

      setLoading(false);
    }
  };


  if (loading) {

    return (

      <MainLayout>

        <div className="text-gray-500">

          Loading dashboard...

        </div>

      </MainLayout>
    );
  }


  return (

    <MainLayout>

      <div className="mb-8">

        <h1 className="text-2xl font-semibold text-gray-800">

          Dashboard

        </h1>

        <p className="text-gray-500 mt-1">

          Cold storage operational analytics and monitoring.

        </p>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          <p className="text-sm text-gray-500 mb-2">

            Total Inventory

          </p>

          <h2 className="text-3xl font-semibold text-gray-800">

            {dashboard.total_inventory || 0}

          </h2>

        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          <p className="text-sm text-gray-500 mb-2">

            Active Batches

          </p>

          <h2 className="text-3xl font-semibold text-gray-800">

            {dashboard.active_inventory || 0}

          </h2>

        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          <p className="text-sm text-gray-500 mb-2">

            Critical Alerts

          </p>

          <h2 className="text-3xl font-semibold text-red-600">

            {dashboard.critical_inventory || 0}

          </h2>

        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          <p className="text-sm text-gray-500 mb-2">

            Dispatched

          </p>

          <h2 className="text-3xl font-semibold text-blue-600">

            {dashboard.dispatched_inventory || 0}

          </h2>

        </div>

      </div>


      {/* CHARTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* CATEGORY CHART */}

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-lg font-semibold text-gray-800">

              Category Distribution

            </h2>

            <p className="text-sm text-gray-500 mt-1">

              Inventory grouped by product category.

            </p>

          </div>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="count"
                  nameKey="_id"
                  outerRadius={110}
                />

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* STATUS CHART */}

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-lg font-semibold text-gray-800">

              Inventory Status

            </h2>

            <p className="text-sm text-gray-500 mt-1">

              Operational inventory conditions.

            </p>

          </div>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={statusData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="_id" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="count" />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Dashboard;