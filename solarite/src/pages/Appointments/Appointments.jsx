import React, { useState } from "react";
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

const statusOptions = ["upcoming", "past", "due"];

const Appointments = () => {
  const { user } = useAuth();
  const { appointments, loading, role, refreshAppointments } = useAppointments(user);
  const { updateAppointment, updating } = useUpdateAppointment();
  const [searchTerm, setSearchTerm] = useState("");

  const handleClickAssign = async (appointmentId) => {
    const success = await updateAppointment(appointmentId, { admin_id: user.id });
    if (success) {
      refreshAppointments();
    }
  };

  // Função para atualizar o status do agendamento
  const handleStatusChange = async (appointmentId, newStatus) => {
    const success = await updateAppointment(appointmentId, { status: newStatus });
    if (success) {
      refreshAppointments(); // Atualiza a lista de agendamentos após a mudança
    }
  };

  // Filtro de agendamentos
  const filteredAppointments = appointments.filter((appointment) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (appointment.appointment_date?.toLowerCase() || "").includes(searchLower) ||
      (appointment.appointment_time?.toLowerCase() || "").includes(searchLower) ||
      (appointment.user?.name?.toLowerCase() || "").includes(searchLower) ||
      (appointment.user?.email?.toLowerCase() || "").includes(searchLower) ||
      (appointment.user?.address?.toLowerCase() || "").includes(searchLower) ||
      (appointment.user?.contact?.toLowerCase() || "").includes(searchLower) ||
      (appointment.employee?.name?.toLowerCase() || "").includes(searchLower)
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Appointments</h1>
      <input
        type="text"
        placeholder="Search appointments..."
        className="mb-4 p-2 border rounded w-full"
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
                  {appointment.employee?.name || (
                    role === "employee" && (
                      <Button
                        label={updating ? "Assigning..." : "Assign to Me"}
                        onClick={() => handleClickAssign(appointment.id)}
                      />
                    )
                  )}
                </TableCell>
                <TableCell>{appointment.appointment_date}</TableCell>
                <TableCell>{appointment.appointment_time}</TableCell>
                <TableCell>{appointment.user?.name || "N/A"}</TableCell>
                <TableCell>{appointment.user?.email || "N/A"}</TableCell>
                <TableCell>{appointment.user?.address || "N/A"}</TableCell>
                <TableCell>{appointment.user?.contact || "N/A"}</TableCell>
                <TableCell>
                  <select
                    value={appointment.status || "upcoming"}
                    onChange={(e) => handleStatusChange(appointment.id, e.target.value)} 
                    className="p-1 border rounded"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
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

export default Appointments;
