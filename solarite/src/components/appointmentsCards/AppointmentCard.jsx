import React, { useState } from "react";
import { Button } from "../../components/Button";
import Modal from "../Modal/Modal";

const AppointmentCard = ({ appointment, role, onAssign }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(true); 
  };

  const handleCloseModal = () => {
    setShowDetails(false); 
  };

  const today = new Date();
  const appointmentDate = new Date(appointment.appointment_date);
  const dayOfWeek = appointmentDate.toLocaleString("en-US", { weekday: "long" });
  const formattedDate = appointmentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = appointment.appointment_time;

  return (
    <div className="bg-gray-300 max-w-64 text-gray-900 p-4 rounded-md shadow-sm mb-4">
      <div className="flex flex-col ">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{appointment.type}</h3>
          <h4 className="text-md font-semibold">Client: {appointment.user?.name}</h4>
          <p>Assigned to:</p>
          <p>{appointment.employee?.name || "Unassigned"}</p>
          <p className="text-2xl text-center font-extrabold items-center"> {formattedTime}</p>
          <p className="text-sm text-center">{dayOfWeek}, {formattedDate}</p>
         
        </div>
        <Button
          label="Details"
          onClick={handleToggleDetails} 
        />
      </div>

      <Modal
        isOpen={showDetails}
        onClose={handleCloseModal}
        appointment={appointment}
        role={role}
        onAssign={onAssign}
      />
    </div>
  );
};

export default AppointmentCard;
