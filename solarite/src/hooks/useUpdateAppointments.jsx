import { useState } from "react";
import { supabase } from "../services/supabase";

const useUpdateAppointment = () => {
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateAppointment = async (appointmentId, updates) => {
    setUpdating(true);
    setUpdateError(null);

    try {
      const { data, error } = await supabase
        .from("appointment")
        .update(updates) 
        .eq("id", appointmentId);

      if (error) {
        console.error("Error updating appointment:", error.message);
        setUpdateError(error.message);
        return null;
      }

      return true; 
    } catch (err) {
      console.error("Error:", err.message);
      setUpdateError(err.message);
      return null;
    } finally {
      setUpdating(false);
    }
  };

  return { updateAppointment, updating, updateError };
};

export default useUpdateAppointment;
