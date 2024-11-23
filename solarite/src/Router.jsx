import { Route, Routes, BrowserRouter } from "react-router-dom";
import { UserPage } from "./pages/UserPage/UserPage";
import { Login } from "./pages/Login/Login";
import { Landing } from "./pages/Landing/Landing";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* IF user isn't logged in, else admin, or resident page respectively */}
        <Route path="/" element={<Landing />} />{" "}
        <Route path="/login" element={<Login />} />
        <Route path="/userPage" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}
