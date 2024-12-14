import { AppointmentSetter } from "./ui/AppointmentSetter";
import { HeadBar } from "./ui/Headbar";
import { Toast } from "./ui/Toast";
import { useState } from "react";

export function UserPage() {
  const [toastMessage, setToastMessage] = useState(null)
  return (
    <div className="w-screen h-screen flex flex-col relative overflow-x-hidden">
      <div>
        <HeadBar />
      </div>
      <div id="content" className="flex items-center justify-center w-full h-full">
        <AppointmentSetter />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)}/>
      </div>
    </div>
  );
}
