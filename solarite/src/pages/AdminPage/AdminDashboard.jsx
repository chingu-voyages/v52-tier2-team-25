import AdminSidebar from "@/components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

export const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <Outlet />
    </div>
  );
};
