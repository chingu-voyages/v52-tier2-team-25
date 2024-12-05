import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import useAppointments from "../../hooks/useAppointments";
import useUpdateAppointment from "@/hooks/useUpdateAppointments";
import AppointmentCard from "@/components/appointmentsCards/AppointmentCard";
import Modal from "@/components/Modal/Modal";

const PastJobs = () => {
  const { user } = useAuth();
  const { appointments, loading, role, refreshAppointments } = useAppointments(user);
  const { updateAppointment, updating } = useUpdateAppointment();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null); 

  const handleClickAssign = async (appointmentId) => {
    const success = await updateAppointment(appointmentId, { admin_id: user.id });
    if (success) {
      refreshAppointments();
    }
  };

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const searchLower = searchTerm.toLowerCase();

    const isValidStatus = appointment.status === "Passed" ;
    return isValidStatus && (
      (appointment.appointment_date?.toLowerCase() || "").includes(searchLower) ||
      (appointment.appointment_time?.toLowerCase() || "").includes(searchLower) ||
      (appointment.type?.toLowerCase() || "").includes(searchLower) ||
      (appointment.user?.name?.toLowerCase() || "").includes(searchLower) ||
      (appointment.user?.email?.toLowerCase() || "").includes(searchLower) ||
      (appointment.user?.address?.toLowerCase() || "").includes(searchLower) ||
      (appointment.user?.contact?.toLowerCase() || "").includes(searchLower) ||
      (appointment.employee?.name?.toLowerCase() || "").includes(searchLower) ||
      (appointment.status?.toLowerCase() || "").includes(searchLower)
    );
  });
  useEffect(() => {
    const syncStatuses = async () => {
      for (const appointment of appointments) {
        const appointmentDate = new Date(appointment.appointment_date).setHours(0, 0, 0, 0);
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

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl text-gray-800 font-bold mb-4">Passed Jobs</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              role={role}
              onAssign={handleClickAssign}
              onClick={() => handleOpenModal(appointment)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No appointments found.</p>
      )}

      {selectedAppointment && (
        <Modal
          appointment={selectedAppointment}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};


export default PastJobs;
