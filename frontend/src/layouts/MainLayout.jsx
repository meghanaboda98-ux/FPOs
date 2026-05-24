import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout({ children }) {

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 flex-1">

        <Navbar />

        <div className="p-6">

          {children}

        </div>

      </div>

    </div>
  );
}

export default MainLayout;