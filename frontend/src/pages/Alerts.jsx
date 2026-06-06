import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import StatusBadge from "../components/StatusBadge";
import Notifications from "./Notifications";
import Profile from "./Profile";
import {
  getAllAlerts
} from "../services/alertService";

function Alerts() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    fetchAlerts();

  }, []);

  const fetchAlerts = async () => {

    try {

      const data =
        await getAllAlerts();

      setAlerts(data.alerts);

    }

    catch (error) {

      console.error(error);
    }
  };

  return (

    <>

      <div className="mb-6">

        <h1 className="text-2xl font-semibold text-gray-800">

          Alerts

        </h1>

        <p className="text-gray-500 mt-1">

          Monitor warning, critical and expired inventory.

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">

          <p className="text-sm text-yellow-700 font-medium">
            Warning Alerts
          </p>

          <h2 className="text-3xl font-semibold text-yellow-800 mt-2">

            {
              alerts.filter(
                (a) => a.status === "WARNING"
              ).length
            }

          </h2>

        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-5">

          <p className="text-sm text-red-700 font-medium">
            Critical Alerts
          </p>

          <h2 className="text-3xl font-semibold text-red-800 mt-2">

            {
              alerts.filter(
                (a) => a.status === "CRITICAL"
              ).length
            }

          </h2>

        </div>

        <div className="bg-gray-100 border border-gray-300 rounded-xl p-5">

          <p className="text-sm text-gray-700 font-medium">
            Expired Products
          </p>

          <h2 className="text-3xl font-semibold text-gray-800 mt-2">

            {
              alerts.filter(
                (a) => a.status === "EXPIRED"
              ).length
            }

          </h2>

        </div>

      </div>

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
                  Remaining Days
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {
                alerts.map((alert, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-all"
                  >

                    <td className="px-6 py-4 text-sm text-gray-700">

                      {alert.batch_id}

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">

                      {alert.farmer_name}

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">

                      {alert.product_name}

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">

                      {alert.remaining_days}

                    </td>

                    <td className="px-6 py-4">

                      <StatusBadge
                        status={alert.status}
                      />

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </>
  );
}

export default Alerts;