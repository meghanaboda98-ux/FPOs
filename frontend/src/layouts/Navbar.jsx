import { useNavigate } from "react-router-dom";
import {

  removeToken

} from "../utils/auth";


function Navbar() {

  const navigate = useNavigate();
  const handleLogout = () => {

    removeToken();
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (

    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">

      {/* LEFT */}

      <div>

        <h2 className="text-2xl font-bold text-gray-800">

          Cold Chain Monitoring Dashboard

        </h2>

        <p className="text-xs text-gray-500">

          CAAS Inventory & Warehouse Monitoring

        </p>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-5">

        {/* ROLE */}

        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">

          {
            localStorage.getItem("role")
          }

        </div>

        {/* USER */}

        <div className="text-sm text-gray-600 font-medium">

          {
            localStorage.getItem("name")
          }

        </div>

        {/* LOGOUT */}

        <button

          onClick={handleLogout}

          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"

        >

          Logout

        </button>

      </div>

    </div>
  );
}
export default Navbar;