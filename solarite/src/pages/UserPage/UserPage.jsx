import { AppointmentSetter } from "./ui/AppointmentSetter";
import { HeadBar } from "./ui/Headbar";

export function UserPage() {
  return (
    <div className="w-screen h-screen flex flex-col relative overflow-x-hidden">
      <div>
        <HeadBar />
      </div>
      <div id="content" className="flex items-center justify-center w-full py-12">
        <AppointmentSetter />
      </div>
    </div>
  );
}
