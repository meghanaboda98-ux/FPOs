import { useNavigate } from "react-router-dom";

import {
  removeToken
} from "../utils/auth";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    removeToken();

    localStorage.removeItem("role");

    navigate("/login");
  };

  return (

    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      <div>

        <h2 className="text-lg font-semibold text-gray-800">
          CAAS Dashboard
        </h2>

      </div>

      <div className="flex items-center gap-4">

        <div className="text-sm text-gray-600">

          {
            localStorage.getItem("role")
          }

        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-all"
        >

          Logout

        </button>

      </div>

    </div>
  );
}

export default Navbar;