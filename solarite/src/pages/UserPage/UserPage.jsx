import { useState } from "react";
import { supabase } from "../../services/supabase";


export function UserPage() {
  const [dateTime, setDateTime] = useState(new Date().toISOString()); 

  const addAppointment = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error", userError.message);
      return;
    }

    const { error } = await supabase.from("appointment").insert([
      {
        user_id: user.id,
        appointment_time: dateTime, 
        admin_id: null
      },
    ]);

    if (error) {
      console.error("Error:", error.message);
    } else {
      console.log("Success!");
    }
  };

  return (
    <div className="user-page">
      <h2>Add an Appointment</h2>
      <input
        type="datetime-local"
        value={dateTime.slice(0, 16)} 
        onChange={(e) => setDateTime(e.target.value)}
      />
      <button onClick={addAppointment} className="bg-white p-2">Add Appointment</button>
    </div>
  );
}
