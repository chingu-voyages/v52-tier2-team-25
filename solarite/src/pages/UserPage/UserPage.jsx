// import { AppointmentSetter } from "./ui/AppointmentSetter";
import { HeadBar } from "./ui/Headbar";
import { Table } from "./ui/Table";
// import { Toast } from "./ui/Toast";

export function UserPage() {
  return (
    <div className="bg-slate-950 h-screen relative">
      <div>
        <HeadBar />
      </div>
      <div id="content" className="flex items-center justify-center w-full h-full">
        {/* <AppointmentSetter /> */}
        {/* <Toast message="there was an error" /> */}
        <Table />
      </div>
    </div>
  );
}
