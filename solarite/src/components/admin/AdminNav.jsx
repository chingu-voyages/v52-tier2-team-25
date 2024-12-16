import AdminLink from "./AdminLink";

const AdminNav = ({ toggleSidebar }) => {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <AdminLink
        url={"appointments"}
        link="Appointments"
        toggleSidebar={toggleSidebar}
      />
      <AdminLink
        url={"route"}
        link="Work Route"
        toggleSidebar={toggleSidebar}
      />
      <AdminLink
        url={"past-jobs"}
        link="Past Jobs"
        toggleSidebar={toggleSidebar}
      />
      <AdminLink
        url={"all-appointments"}
        link="All Apointments"
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

export default AdminNav;
