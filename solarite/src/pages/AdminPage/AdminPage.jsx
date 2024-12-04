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
    <div className="bg-slate-950 h-screen relative">
      <div>
        <HeadBar />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        Admin Page
        <Appointments />
      </div>

    </div>
  )
}
