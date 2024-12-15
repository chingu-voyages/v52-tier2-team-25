import PropTypes from "prop-types";

const AppointmentSchedule = ({ appointments }) => {
  if (!appointments) return <div>Loading...</div>;
  const currentAppointment = appointments[1];
  const upcomingAppointments = appointments.slice(2);

  return (
    <div className="flex flex-col space-y-6">
      <Current appointment={currentAppointment} />
      <Upcoming appointments={upcomingAppointments} />
    </div>
  );
};

const Current = ({ appointment }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">Current Job</h2>
      <Appointment appointment={appointment} key={appointment.id} />
    </div>
  );
};

const Upcoming = ({ appointments }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">Upcoming</h2>
      {appointments.map((appointment, idx) => (
        <Appointment appointment={appointment} key={appointment.id} idx={idx} />
      ))}
    </div>
  );
};

const Appointment = ({ appointment, idx }) => {
  return (
    <div
      className={`flex flex-col md:flex-row space-y-1 md:space-y-0 md:text-sm lg:text-base justify-between rounded-md py-2 px-4 capitalize mx-4 ${
        idx % 2 === 0 ? "bg-blue-950 text-white" : "bg-slate-300"
      }`}
    >
      <p>{appointment.type}</p>
      <p>{appointment.user.name}</p>
      <p>{appointment.user.contact}</p>
      <p>{appointment.user.address}</p>
    </div>
  );
};

export default AppointmentSchedule;
