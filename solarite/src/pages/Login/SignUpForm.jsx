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
    <main className="lg:space-y-6 space-y-4w-full text-white bg-gradient-to-b from-sky-800 to-green-200">
      <SignUpNav />

      <FormContext.Provider value={formState}>
        <SignUpFormSection
          handleFormRegisterSubmit={formState.handleFormRegisterSubmit}
        />
      </FormContext.Provider>

      <p className="text-center">
        Already have an account?{" "}
        <a
          onClick={() => navigate("/login")}
          className="underline cursor-pointer hover:text-[#00fa00]"
        >
          Log in
        </a>
      </p>

      <SignUpFooter />
    </main>
  );
};

export default SignUpForm;
