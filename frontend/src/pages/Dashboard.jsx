import { useEffect, useState } from "react";
import {
    getDashboardAnalytics,
    getCategoryAnalytics,
    getStatusAnalytics
} from "../services/analyticsService";

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
function Dashboard() {
    const [dashboard, setDashboard] = useState({});
    const [categoryData, setCategoryData] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [loading, setLoading] = useState(true);
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
            console.log(
                "Dashboard:",
                dashboardRes
            );
            console.log(
                "Category:",
                categoryRes
            );
            console.log(
                "Status:",
                statusRes
            );
            setDashboard(
                dashboardRes || {}
            );
            setCategoryData(
                categoryRes?.categories || []
            );
            setStatusData(
                statusRes?.statuses || []
            );
        } catch (error) {

            console.error(
                "Dashboard Error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">
                    Loading Dashboard...
                </h2>
            </div>
        );
    }
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>
                <p className="text-gray-500">
                    Cold Chain Monitoring Overview
                </p>
            </div>
            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-600">
                        Total Inventory
                    </h3>
                    <h2 className="text-3xl font-bold">
                        {dashboard.total_inventory || 0}
                    </h2>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-600">
                        Active Batches
                    </h3>
                    <h2 className="text-3xl font-bold text-green-600">
                        {dashboard.active_batches || 0}
                    </h2>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-600">
                        Critical Batches
                    </h3>
                    <h2 className="text-3xl font-bold text-red-600">
                        {dashboard.critical_batches || 0}
                    </h2>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-600">
                        Dispatched Batches
                    </h3>
                    <h2 className="text-3xl font-bold text-blue-600">
                        {dashboard.dispatched_batches || 0}
                    </h2>
                </div>
            </div>

            {/* SECOND ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-600">
                        Total Shipments
                    </h3>
                    <h2 className="text-3xl font-bold">
                        {dashboard.total_shipments || 0}
                    </h2>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-600">
                        Warehouses
                    </h3>
                    <h2 className="text-3xl font-bold">
                        {dashboard.total_warehouses || 0}
                    </h2>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-600">
                        Cold Rooms
                    </h3>
                    <h2 className="text-3xl font-bold">
                        {dashboard.total_coldrooms || 0}
                    </h2>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-gray-600">
                        Warning Batches
                    </h3>
                    <h2 className="text-3xl font-bold text-yellow-500">
                        {dashboard.warning_batches || 0}
                    </h2>
                </div>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-4">
                        Category Distribution
                    </h2>
                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <PieChart>

                            <Pie
                                data={categoryData}
                                dataKey="count"
                                nameKey="category"
                                outerRadius={100}
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-4">
                        Status Distribution
                    </h2>
                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >
                        <BarChart
                            data={statusData}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                            />
                            <XAxis
                                dataKey="status"
                            />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="count"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;