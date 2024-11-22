import './styles.css';
import { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function UserPage() {
  const [dateTime, setDateTime] = useState(new Date().toISOString());
  const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getUserAppointments();
  }, []);

  // Get user data and appointments
  const getUserAppointments = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
  
    if (userError) {
      console.error("Erro:", userError.message);
      return;
    }
  
    setUserId(user.id);
  
    const { data, error } = await supabase
      .from("appointment")
      .select("appointment_date, admin_id")
      .eq("user_id", user.id);
  
    if (error) {
      console.error("Erro:", error.message);
    } else {
      setAppointments(data);  
    }
  };

  //verification of the date
  const isAppointmentDate = (date) => {
    return appointments.find(app =>
      new Date(app.appointment_date).toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );
  };

  //handle the delete 
  const handleDateClick = async (date) => {
    const appointment = isAppointmentDate(date);
    if (appointment) {
      const confirmDelete = window.confirm("Are you sure you want to cancel?");
      if (confirmDelete) {
        const { error } = await supabase
          .from("appointment")
          .delete()
          .eq("user_id", userId)
          .eq("appointment_date", date.toISOString().split('T')[0]);  

        if (error) {
          console.error("Error:", error.message);
        } else {
          alert("The appointment was canceled");
          getUserAppointments();
        }
      }
    }
  };

  const addAppointment = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
  
    if (userError) {
      console.error("Erro:", userError.message);
      return;
    }
  
    const [date, time] = dateTime.split('T');  //split time and date
  
    const { error } = await supabase.from("appointment").insert([
      {
        user_id: user.id,
        appointment_date: date,  
        appointment_time: time,
        admin_id: null
      },
    ]);
  
    if (error) {
      console.error("Error:", error.message);
    } else {
      alert("Your appointment was saved");
      getUserAppointments();
    }
  };

  return (
    <div className="user-page">
      <h2>Add Appointment</h2>
      <input
        type="datetime-local"
        value={dateTime.slice(0, 16)}
        onChange={(e) => setDateTime(e.target.value)}
        className="bg-white"
      />
      <button onClick={addAppointment} className="bg-white p-2">Add Appointment</button>

      <h2>Calendar</h2>
      <Calendar
        className={'custom-calendar'}
        onClickDay={handleDateClick}
        tileClassName={({ date }) => {
          const appointment = isAppointmentDate(date);
          if (appointment) {
            return appointment.admin_id ? 'highlight-green ' : 'highlight-yellow';  
          }
          return null;
        }}
      />
      
      <style jsx>{`
        .highlight-yellow {
          background-color: #ede883;
          border-radius: 50%;
        }

        .highlight-green {
          background-color: #88e8a0;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
