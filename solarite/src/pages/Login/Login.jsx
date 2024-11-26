import { useAuth } from "../../hooks/useAuth";
import LoginForm from "./LoginForm";
import { Navbar } from "@/components/Navbar";

export function Login() {
  const { user, setUser } = useAuth();

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gradient-to-b from-sky-900 to-sky-950">
      <Navbar />
      <div className="flex flex-col justify-center items-center pt-20 w-full h-full">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
