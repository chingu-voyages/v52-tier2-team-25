import AdminHeading from "@/components/admin/AdminHeading";
import Map from "@/components/admin/workRoute/Map";

const WorkRoute = () => {
  return (
    <div className="flex flex-col justify-center w-full h-dvh">
      <AdminHeading heading="Work Route" />
      <Map />
    </div>
  );
};

export default WorkRoute;
