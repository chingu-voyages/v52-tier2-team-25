import React, { useState, useEffect } from "react";
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
import useUpdateAppointment from "@/hooks/useUpdateAppointments";
import { Button } from "../../components/Button";
import { supabase } from "../../services/supabase";

const AppointmentsTable = () => {
  const { user } = useAuth();
  const { appointments, loading, role, refreshAppointments } =
    useAppointments(user);
  const { updateAppointment, updating } = useUpdateAppointment();
  const [searchTerm, setSearchTerm] = useState("");
  const today = new Date();

  const handleClickAssign = async (appointmentId) => {
    const success = await updateAppointment(appointmentId, {
      admin_id: user.id,
    });
    if (success) {
      refreshAppointments();
    }
  };

  useEffect(() => {
    const syncStatuses = async () => {
      for (const appointment of appointments) {
        const appointmentDate = new Date(appointment.appointment_date).setHours(
          0,
          0,
          0,
          0
        );
        let newStatus = "Due";
        if (today < appointmentDate) newStatus = "Upcoming";
        else if (today > appointmentDate) newStatus = "Past";

        if (appointment.status !== newStatus) {
          const { error } = await supabase
            .from("appointment")
            .update({ status: newStatus })
            .eq("id", appointment.id);

          if (error) {
            console.error(`Error: ${appointment.id}:`, error.message);
          }
        }
      }
    };

    if (appointments.length > 0) {
      syncStatuses();
    }
  }, [appointments]);

  const filteredAppointments = appointments.filter((appointment) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (appointment.appointment_date?.toLowerCase() || "").includes(
        searchLower
      ) ||
      (appointment.appointment_time?.toLowerCase() || "").includes(
        searchLower
      ) ||
      (appointment.user?.name?.toLowerCase() || "").includes(searchLower) ||
      (appointment.user?.email?.toLowerCase() || "").includes(searchLower) ||
      (appointment.user?.address?.toLowerCase() || "").includes(searchLower) ||
      (appointment.user?.contact?.toLowerCase() || "").includes(searchLower) ||
      (appointment.employee?.name?.toLowerCase() || "").includes(searchLower) ||
      (appointment.status?.toLowerCase() || "").includes(searchLower)
    );
  });

  return (
    <div className="p-4 text-black h-dvh overflow-y-auto">
      <h1 className="text-xl text-sky-900 font-bold mb-4">All Appointments</h1>
      <input
        type="text"
        placeholder="Search appointments..."
        className="mb-4 p-2 border rounded w-full text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredAppointments.length > 0 ? (
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
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  {appointment.employee?.name ||
                    (role === "employee" && (
                      <Button
                        label={updating ? "Assigning..." : "Assign to Me"}
                        onClick={() => handleClickAssign(appointment.id)}
                      />
                    ))}
                </TableCell>
                <TableCell>{appointment.appointment_date}</TableCell>
                <TableCell>{appointment.appointment_time}</TableCell>
                <TableCell>{appointment.user?.name || "N/A"}</TableCell>
                <TableCell>{appointment.user?.email || "N/A"}</TableCell>
                <TableCell>{appointment.user?.address || "N/A"}</TableCell>
                <TableCell>{appointment.user?.contact || "N/A"}</TableCell>

                <TableCell>
                  {(() => {
                    const appointmentDate = new Date(
                      appointment.appointment_date
                    );
                    if (today < appointmentDate) {
                      return "Upcoming";
                    } else if (today > appointmentDate) {
                      return "Past";
                    } else {
                      return "Due";
                    }
                  })()}
                </TableCell>
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

export default AppointmentsTable;
