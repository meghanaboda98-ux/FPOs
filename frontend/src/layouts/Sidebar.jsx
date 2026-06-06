import {
    Link,
    useLocation
} from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const menuItems = [

        {
            name: "Dashboard",
            path: "/dashboard"
        },

        {
            name: "Inventory",
            path: "/inventory"
        },

        {
            name: "Products",
            path: "/products"
        },

        {
            name: "Analytics",
            path: "/analytics"
        },

        {
            name: "Alerts",
            path: "/alerts"
        },

        {
            name: "Recommendations",
            path: "/recommendations"
        },

        {
            name: "Shipments",
            path: "/shipments"
        },

        {
            name: "Warehouses",
            path: "/warehouses"
        },

        {
            name: "Notifications",
            path: "/notifications"
        },

        {
            name: "Profile",
            path: "/profile"
        }
    ];

    return (

        <div className="w-64 bg-blue-900 text-white min-h-screen p-5">

            <h1 className="text-3xl font-bold mb-10">
                CAAS
            </h1>

            <div className="flex flex-col gap-2">

                {
                    menuItems.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={`px-4 py-3 rounded-lg transition-all
                            ${
                                location.pathname === item.path
                                ? "bg-white text-blue-900 font-semibold"
                                : "hover:bg-blue-800"
                            }`}
                        >
                            {item.name}
                        </Link>

                    ))
                }

            </div>

        </div>
    );
}

export default Sidebar;