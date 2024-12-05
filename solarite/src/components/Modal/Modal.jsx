import React from 'react';

const Modal = ({ isOpen, onClose, appointment, role, onAssign }) => {
  if (!isOpen) return null; 

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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{appointment.type}</h3>
          <button onClick={onClose} className="text-white font-bold text-xl">X</button>
        </div>
        <div className="mt-4">
          <p><strong>Client:</strong> {appointment.user?.name}</p>  
          <p><strong>Day:</strong> {dayOfWeek}</p>
          <p><strong>Date:</strong> {formattedDate}</p>
          <p><strong>Time:</strong> {formattedTime}</p>
          <p><strong>Email:</strong> {appointment.user?.email || "N/A"}</p>
          <p><strong>Address:</strong> {appointment.user?.address || "N/A"}</p>
          <p><strong>Contact:</strong> {appointment.user?.contact || "N/A"}</p>
          <p><strong>Status:</strong> {(() => {
            if (today < appointmentDate) return "Upcoming";
            if (today > appointmentDate) return "Past";
            return "Due";
          })()}</p>

          {role === "employee" && !appointment.employee?.name && (
            <button
              onClick={() => onAssign(appointment.id)}
              className="bg-gray-400 text-white font-bold p-2 rounded-lg mt-4 w-full"
            >
              Assign to Me
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
