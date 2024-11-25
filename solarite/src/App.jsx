import { Landing } from "./pages/Landing/Landing";
import { Routes, Route } from "react-router-dom";
import { UserPage } from "./pages/UserPage/UserPage";
import Login from "./pages/Login/Login";
import Appointments from "./pages/Appointments/Appointments";

const App = () => {
  return (
    <Routes>
      {/* IF user isn't logged in, else admin, or resident page respectively */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userPage" element={<UserPage />} />
      <Route path="/appointments" element={<Appointments />} />
    </Routes>
  );
};

export default App;
