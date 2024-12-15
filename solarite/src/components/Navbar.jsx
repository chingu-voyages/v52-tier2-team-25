import { Link } from "react-router-dom";
import solariteLogo from "/solarite-logo-w.svg";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "../services/supabase";

export function Navbar() {
  const navigate = useNavigate();
  const gotToPath = (obj) => {
    navigate(obj.path, { state: obj.state });
  };
  const { user } = useAuth();

  const navigateTo = async () => {
    if (!user) {
      gotToPath({ path: "/login", state: "login" });
      return;
    }

    try {
      const { data: employeeData, error: employeeError } = await supabase
        .from("employee")
        .select("id")
        .eq("id", user.id)
        .single();

      if (employeeError || !employeeData) {
        gotToPath({ path: "/user", state: "user" });
      } else {
        gotToPath({ path: "/admin/appointments", state: "admin" });
      }
    } catch (err) {
      console.error("Error checking user role:", err.message);
      alert("An unexpected error. Please try again.");
    }
  };

  return (
    <header className="flex justify-between w-full items-center z-10 text-white p-5 fixed backdrop-blur-[5px]">
      <Link to="/">
        <img src={solariteLogo} alt="solarite logo" className="w-h-14 h-14" />
      </Link>

      <Button
        onClick={navigateTo}
        label="Login"
        className="py-2 text-black transition-all duration-500 bg-white rounded-full px-9 hover:bg-transparent hover:border hover:text-white"
      />
    </header>
  );
}
