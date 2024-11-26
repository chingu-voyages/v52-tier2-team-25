import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useAuth } from "../../hooks/useAuth";
import useAppointments from "../../hooks/useAppointments"; 

const Appointments = () => {
  const { user } = useAuth(); 
  const { appointments, loading, role } = useAppointments(user); 

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Appointments</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : appointments.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead>Employee Assigned</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Appointment Time</TableHead>
              <TableHead>Resident Name</TableHead>
              <TableHead>Resident Email</TableHead>
              <TableHead>Resident Address</TableHead>
              <TableHead>Resident Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.employee?.name || "Unassigned"}</TableCell>
                <TableCell>{appointment.appointment_date}</TableCell>
                <TableCell>{appointment.appointment_time}</TableCell>             
                <TableCell>{appointment.user?.name || "N/A"}</TableCell>
                <TableCell>{appointment.user?.email || "N/A"}</TableCell>
                <TableCell>{appointment.user?.address || "N/A"}</TableCell>
                <TableCell>{appointment.user?.contact || "N/A"}</TableCell>
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
