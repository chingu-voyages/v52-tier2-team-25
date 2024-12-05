import Logo from "../Logo";
import AdminInfo from "./AdminInfo";
import AdminNav from "./AdminNav";

const AdminSidebar = () => {
  return (
    <div className="flex flex-col items-center w-1/6 bg-sky-900 h-dvh">
      <Logo />

      <AdminNav />

      <AdminInfo />
    </div>
  );
};

export default AdminSidebar;
