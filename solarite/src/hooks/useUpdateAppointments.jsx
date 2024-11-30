import { useState } from "react";
import { supabase } from "../services/supabase";

const useUpdateAppointment = () => {
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateAppointment = async (appointmentId, employeeId) => {
    setUpdating(true);
    setUpdateError(null);

    try {
      const { data, error } = await supabase
        .from("appointment")
        .update({ admin_id: employeeId })
        .eq("id", appointmentId);

      if (error) {
        console.error("Error updating appointment:", error.message);
        setUpdateError(error.message);
        return null;
      }

      return true; // Return updated appointment data
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setUpdateError(err.message);
      return null;
    } finally {
      setUpdating(false);
    }
  };

  return { updateAppointment, updating, updateError };
};

export default useUpdateAppointment;
