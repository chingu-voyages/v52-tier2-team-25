import { useState } from "react";
import Logo from "../Logo";
import AdminInfo from "./AdminInfo";
import AdminNav from "./AdminNav";
import { Menu, X } from "lucide-react";

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-sky-900 text-white lg:hidden"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 flex flex-col items-center w-64 bg-sky-900 h-dvh pt-6
          transform transition-transform duration-300 ease-in-out z-50
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:w-1/6
        `}
      >
        <Logo />

        <AdminNav toggleSidebar={toggleSidebar} />

        <AdminInfo />
      </aside>
    </>
  );
};

export default AdminSidebar;
