import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { supabase } from "../../services/supabase";
import { useAuth } from "../../hooks/useAuth";

const Appointments = () => {
  const { user } = useAuth(); // Access the user from the AuthContext
  const [appointments, setAppointments] = useState([]);

  // Fetch user appointments
  const getUserAppointments = async () => {
    if (!user) {
      console.error("No user logged in.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("appointment")
        .select("id, created_at, appointment_date, appointment_time, admin_id")

      if (error) {
        console.error("Error fetching appointments:", error.message);
      } else {
        setAppointments(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
    }
  };

  useEffect(() => {
    getUserAppointments();
  }, [user]); // Re-fetch appointments if the user changes

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Appointments</h1>
      {appointments.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Appointment Time</TableHead>
              <TableHead>Admin ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.id}</TableCell>
                <TableCell>
                  {new Date(appointment.created_at).toLocaleString()}
                </TableCell>
                <TableCell>{appointment.appointment_date}</TableCell>
                <TableCell>{appointment.appointment_time}</TableCell>
                <TableCell>{appointment.admin_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-gray-500">No appointments found.</p>
      )}
    </div>
  );
};

export default Appointments;
