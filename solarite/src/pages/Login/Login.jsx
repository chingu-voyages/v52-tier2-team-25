import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useLoginForm } from "../../hooks/useLoginForm";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Navbar } from "@/components/Navbar";

export function Login() {
  const location = useLocation();
  const { state } = location;
  const { user, setUser } = useAuth();

  const { handleSignOut } = useLoginForm({ user, setUser, state });

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gradient-to-b from-sky-900 to-sky-950">
      <Navbar />
      <div className="flex flex-col justify-center items-center pt-20 w-full h-full">
        {user ? (
          <div id="authenticated">
            <h2>{user.email}</h2>
            <button onClick={handleSignOut}>Sign out</button>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}

export default Login;
