import { useNavigate } from "react-router-dom";
import Appointments from "../Appointments/Appointments";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useAuth } from "../../hooks/useAuth";
import { HeadBar } from "../UserPage/ui/Headbar";

export const AdminPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { handleSignOut } = useLoginForm({ user, setUser });

  return (
    <div className="relative h-screen bg-slate-950">
      <div>
        <HeadBar />
      </div>
      <div className="flex justify-center items-center w-full h-full">
        Admin Page
        <Appointments />
      </div>
    </div>
  );
};
