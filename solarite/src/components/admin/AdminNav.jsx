import AdminLink from "./AdminLink";

const AdminNav = () => {
  return (
    <div className="flex flex-col gap-4">
      <AdminLink url={"appointments"} link="Appointments" />
      <AdminLink url={"route"} link="Work Route" />
      <AdminLink url={"past-jobs"} link="Past Jobs" />
    </div>
  );
};

export default AdminNav;
