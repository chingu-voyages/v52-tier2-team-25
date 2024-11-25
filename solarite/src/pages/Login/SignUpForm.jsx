import { useLoginForm } from "../../hooks/useLoginForm";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SignUpNav from "@/components/signUpForm/signUpNav";
import SignUpFooter from "@/components/signUpForm/signUpFooter";
import SignUpFormSection from "@/components/signUpForm/signUpFormSection";

const SignUpForm = () => {
  const location = useLocation();
  const { state } = location;
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const gotToPath = (obj) => {
    navigate(obj.path, { state: obj.state });
  };

  const { values, handleChangeValues, handleFormRegisterSubmit, setValues } =
    useLoginForm({ user, setUser, state });
  return (
    <main className="px-10 py-16 space-y-6 w-full h-dvh bg-slate-300">
      <SignUpNav />

      <SignUpFormSection
        onChange={handleChangeValues}
        values={values}
        handleFormRegisterSubmit={handleFormRegisterSubmit}
      />
      <p className="text-center">
        Already have an account?{" "}
        <a
          onClick={() => {
            console.log("clicked");
            setValues({
              email: "",
              password: "",
              passwordConfirm: "",
            });
            gotToPath({ path: "/login", state: "login" });
          }}
          className="underline cursor-pointer hover:text-green-600"
        >
          Log in
        </a>
      </p>
      <SignUpFooter />
    </main>
  );
};

export default SignUpForm;
