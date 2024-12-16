import AdminSidebar from "@/components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

export const AdminDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 overflow-hidden pt-16 lg:pt-0">
        <Outlet />
      </div>
    </div>
  );
};
