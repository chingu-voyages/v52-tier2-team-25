import { useState, useEffect } from "react";
import { supabase } from "@/services/supabase";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "@/components/Button";

export function AppointmentSetter() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState();
  const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState(null);
  const [clickTimeout, setClickTimeout] = useState(null);

  useEffect(() => {
    getUserAppointments();
  }, []);

  // Fetch user appointments
  const getUserAppointments = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error:", userError.message);
      return;
    }

    setUserId(user.id);

    const { data, error } = await supabase
      .from("appointment")
      .select("appointment_date, appointment_time, admin_id")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error:", error.message);
    } else {
      setAppointments(data);
    }
  };

  //check the date of the calendar and the appointmens on supabase
  const getAppointmentByDate = (date) => {
    return appointments.find(
      (app) => app.appointment_date === date.toISOString().split("T")[0]
    );
  };

  //single or double click
  const handleDateClick = (date) => {
    const appointment = getAppointmentByDate(date); //check if the date has an appointment

    if (!appointment) return;

    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      deleteAppointment(date);
    } else {
      setClickTimeout(
        setTimeout(() => {
          alert(`Appointment time: ${appointment.appointment_time}`);
          setClickTimeout(null);
        }, 300)
      ); //to do the double click
    }
  };

  // Delete appointment
  const deleteAppointment = async (date) => {
    const confirmDelete = window.confirm("Are you sure you want to cancel?");
    if (confirmDelete) {
      const { error } = await supabase
        .from("appointment")
        .delete()
        .eq("user_id", userId)
        .eq("appointment_date", date.toISOString().split("T")[0]);

      if (error) {
        console.error("Error:", error.message);
      } else {
        alert("Appointment was canceled!");
        getUserAppointments();
      }
    }
  };

  // Add appointment
  const addAppointment = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Erro:", userError.message);
      return;
    }

    const { error } = await supabase.from("appointment").insert([
      {
        user_id: user.id,
        appointment_date: date,
        appointment_time: time,
        admin_id: null,
      },
    ]);

    if (error) {
      console.error("Error:", error.message);
    } else {
      alert("The appointment request was saved");
      getUserAppointments();
    }
  };

  return (
    <div className="flex flex-wrap gap-5 bg-white rounded-lg absolute w-full h-full items-center justify-center">
      <div className="rounded-l-lg w-[50%]">
        <div className="flex flex-col gap-4 w-96 m-auto p-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-gray-300 p-3 rounded-lg"
          />
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-gray-300 p-3 rounded-lg"
          >
            {Array.from({ length: 10 }, (_, i) => {
              const hour = 8 + i;
              return (
                <option key={hour} value={`${hour.toString()}:00`}>
                  {`${hour}:00`}
                </option>
              );
            })}
          </select>
          <Button label="Create Appointment" onClick={addAppointment} />
        </div>
      </div>

      <div className="flex w-full justify-center items-center">
        <Calendar
          className="custom-calendar rounded-r-lg p-7 text-lg font-semibold text-sky-900 flex flex-col items-center justify-center"
          onClickDay={handleDateClick}
          tileClassName={({ date }) => {
            const appointment = getAppointmentByDate(date);
            if (appointment) {
              return appointment.admin_id
                ? "highlight-green"
                : "highlight-orange";
            }
            return null;
          }}
        />
        <style>{`
        .highlight-orange {
          background-color: #ff6d09;
          border-radius: 50%;
          color: white;

          &:hover {
            color: black;
          }
        }
        .highlight-green {
          background-color: #88e8a0;  
          border-radius: 50%;
          color: white;

          &:hover {
            color: white;
          }
        }
      `}</style>
      </div>
    </div>
  );
}
