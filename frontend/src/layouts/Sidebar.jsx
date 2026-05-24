import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const role = localStorage.getItem("role");

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
    },

    {
      name: "Inventory",
      path: "/inventory",
    },

    {
      name: "Alerts",
      path: "/alerts",
    },
  ];

  if (role === "SUPER_ADMIN" || role === "FPO_MANAGER") {
    menuItems.push({
      name: "Analytics",

      path: "/analytics",
    });

    menuItems.push({
      name: "Products",

      path: "/products",
    });
  }

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-800">CAAS</h1>

        <p className="text-sm text-gray-500 mt-1">Cold Storage Platform</p>
      </div>

      <div className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all
              
              ${
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
