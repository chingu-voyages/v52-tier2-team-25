import React from "react";
import { jsPDF } from "jspdf";

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

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    const marginLeft = 10;
    let currentY = 20; 
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41); 
    doc.text("Appointment Details", marginLeft, currentY);
    currentY += 10;
  
    doc.setDrawColor(200, 200, 200); 
    doc.line(marginLeft, currentY, 200, currentY); 
    currentY += 10;
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50); 
    const fields = [
      { label: "Client", value: appointment.user?.name || "N/A" },
      { label: "Day", value: dayOfWeek },
      { label: "Date", value: formattedDate },
      { label: "Time", value: formattedTime },
      { label: "Email", value: appointment.user?.email || "N/A" },
      { label: "Address", value: appointment.user?.address || "N/A" },
      { label: "Contact", value: appointment.user?.contact || "N/A" },
      {
        label: "Status",
        value:
          today < appointmentDate
            ? "Upcoming"
            : today > appointmentDate
            ? "Past"
            : "Due",
      },
    ];
  
    fields.forEach(({ label, value }) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, marginLeft, currentY);
      doc.setFont("helvetica", "normal");
      doc.text(value, marginLeft + 40, currentY); 
      currentY += 10;
    });
  
    currentY += 20;
    doc.setFontSize(14);
    doc.setFont("times", "italic");
    doc.text("Generated by Solarite", marginLeft, currentY);
  
    doc.save(`appointment-details-${appointment.id}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{appointment.type}</h3>
          <button onClick={onClose} className="text-white font-bold text-xl">
            X
          </button>
        </div>
        <div className="mt-4">
          <p>
            <strong>Client:</strong> {appointment.user?.name}
          </p>
          <p>
            <strong>Day:</strong> {dayOfWeek}
          </p>
          <p>
            <strong>Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>Time:</strong> {formattedTime}
          </p>
          <p>
            <strong>Email:</strong> {appointment.user?.email || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {appointment.user?.address || "N/A"}
          </p>
          <p>
            <strong>Contact:</strong> {appointment.user?.contact || "N/A"}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {(() => {
              if (today < appointmentDate) return "Upcoming";
              if (today > appointmentDate) return "Past";
              return "Due";
            })()}
          </p>

          {role === "employee" && !appointment.employee?.name && (
            <button
              onClick={() => onAssign(appointment.id)}
              className="bg-gray-400 text-white font-bold p-2 rounded-lg mt-4 w-full"
            >
              Assign to Me
            </button>
          )}

          <button
            onClick={downloadPDF}
            className="bg-blue-500 text-white font-bold p-2 rounded-lg mt-4 w-full"
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;