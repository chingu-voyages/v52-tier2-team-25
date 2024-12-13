import AdminLink from "./AdminLink";

const AdminNav = () => {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <AdminLink url={"appointments"} link="Appointments" />
      <AdminLink url={"route"} link="Work Route" />
      <AdminLink url={"past-jobs"} link="Past Jobs" />
      <AdminLink url={"all-appointments"} link="All Apointments" />
    </div>
  );
};

export default AdminNav;
