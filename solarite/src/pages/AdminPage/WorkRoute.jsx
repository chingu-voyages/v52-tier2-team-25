import AdminHeading from "@/components/admin/AdminHeading";
import AppointmentSchedule from "@/components/admin/workRoute/AppointmentSchedule";
import Map from "@/components/admin/workRoute/Map";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/services/supabase";
import { useEffect, useState } from "react";

const WorkRoute = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [optimizedAppointments, setOptimizedAppointments] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.id) {
        console.error("No admin ID found");
        return;
      }

      const today = new Date();
      const formattedToday = `${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${today
        .getDate()
        .toString()
        .padStart(2, "0")}/${today.getFullYear()}`;

      const { data, error } = await supabase
        .from("appointment")
        .select(
          `
          id,
          created_at,
          user_id,
          appointment_time,
          admin_id,
          appointment_date,
          status,
          type,
          user:user_id (
            id,
            name,
            email,
            contact,
            address
          )
        `
        )
        .eq("admin_id", user.id)
        .eq("appointment_date", formattedToday);

      if (error) {
        console.error("Error fetching appointments:", error);
      } else {
        setAppointments(data);
      }
    };

    fetchAppointments();
  }, [user]);

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto p-6  lg:p-8 space-y-10">
      <AdminHeading heading="Work Route" />

      <div className="">
        <Map
          appointments={appointments}
          setOptimizedAppointments={setOptimizedAppointments}
        />
      </div>

      <div className="flex-shrink-0 overflow-y-auto">
        <AppointmentSchedule appointments={optimizedAppointments} />
      </div>
    </div>
  );
};

export default WorkRoute;
