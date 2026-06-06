import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function MainLayout() {

  return (

    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN SECTION */}

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* NAVBAR */}

        <Navbar />

        {/* PAGE CONTENT */}

        <main className="flex-1 overflow-y-auto p-6">

          <Outlet />

        </main>

        {/* FOOTER */}

        <Footer />

      </div>

    </div>
  );
}

export default MainLayout;