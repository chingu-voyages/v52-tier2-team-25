import { Landing } from "./pages/Landing/Landing";
import { Routes, Route } from "react-router-dom";
import { UserPage } from "./pages/UserPage/UserPage";
import Login from "./pages/Login/Login";
import { AdminDashboard } from "./pages/AdminPage/AdminDashboard";
import SignUpForm from "./pages/Login/SignUpForm";
import Appointments from "./pages/AdminPage/Appointments";
import WorkRoute from "./pages/AdminPage/WorkRoute";
import PastJobs from "./pages/AdminPage/PastJobs";
import AppointmentsTable from "./pages/AppointmentsTable/Appointments";
import { UserProfile } from "./pages/UserProfilePage/UserProfile";

const App = () => {
  return (
    <Routes>
      {/* IF user isn't logged in, else admin, or resident page respectively */}
      <Route index element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUpForm />} />
      <Route path="admin" element={<AdminDashboard />}>
        <Route path="appointments" element={<Appointments />} />
        <Route path="route" element={<WorkRoute />} />
        <Route path="past-jobs" element={<PastJobs />} />
        <Route path="all-appointments" element={<AppointmentsTable />} />
      </Route>
      <Route path="/userPage" element={<UserPage />} />
      <Route path="/profile-settings" element={<UserProfile />} />
    </Routes>
  );
};

export default App;