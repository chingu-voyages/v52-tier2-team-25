import { useNavigate } from "react-router-dom";
import SignUpNav from "@/components/signUpForm/signUpNav";
import SignUpFooter from "@/components/signUpForm/signUpFooter";
import SignUpFormSection from "@/components/signUpForm/signUpFormSection";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import { FormContext } from "@/context/FormContext";

const SignUpForm = () => {
  const navigate = useNavigate();

  const formState = useSignUpForm();

  return (
    <main className="px-10 py-16 space-y-6 w-full h-dvh bg-slate-300">
      <SignUpNav />

      <FormContext.Provider value={formState}>
        <SignUpFormSection
          handleFormRegisterSubmit={formState.handleFormRegisterSubmit}
        />
      </FormContext.Provider>

      <p className="text-center">
        Already have an account?{" "}
        <a
          onClick={navigate("/login")}
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
