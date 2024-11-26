import { Landing } from "./pages/Landing/Landing";
import { Routes, Route } from "react-router-dom";
import { UserPage } from "./pages/UserPage/UserPage";
import Login from "./pages/Login/Login";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import SignUpForm from "./pages/Login/SignUpForm";

const App = () => {
  return (
    <Routes>
      {/* IF user isn't logged in, else admin, or resident page respectively */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="register" element={<SignUpForm />} />
      <Route path="/adminPage" element={<AdminPage />} />
      <Route path="/userPage" element={<UserPage />} />
    </Routes>
  );
};

export default App;
