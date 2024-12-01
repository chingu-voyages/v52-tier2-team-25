import PropTypes from "prop-types";
import { useState, useRef } from "react";
import Steps from "@/components/signUpForm/Steps";
import { Email, Password, Address, Profile } from "./formSteps";

const steps = [
  {
    id: 1,
    label: "Your Details",
    details: "Please provide your name and email",
    component: Email,
  },
  {
    id: 2,
    label: "Choose Password",
    details: "Must be at least 8 characters",
    component: Password,
  },
  {
    id: 3,
    label: "Address and Phone",
    details: "Set Must be a valid Los Angeles address and real Phone number",
    component: Address,
  },
  {
    id: 4,
    label: "Profile Setup",
    details: "Extra details idk",
    component: Profile,
  },
];

const SignUpFormSection = ({ handleFormRegisterSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const formRef = useRef(null);

  const isStepCompleted = (stepId) => completedSteps.includes(stepId);

  const handleNext = () => {
    if (currentStep < steps.length) {
      if (!isStepCompleted(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === steps.length) {
      formRef.current.requestSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      completedSteps.pop();
    }
  };

  const renderStep = () => {
    const step = steps.find((s) => s.id === currentStep);
    if (step) {
      const StepComponent = step.component;
      return <StepComponent />;
    }
    return null;
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleFormRegisterSubmit}
      className="gap-4 py-8 lg:h-[610px] px-20"
    >
      <div className="flex px-14 py-8 h-full rounded-xl shadow-2xl backdrop-blur-3xl bg-white/25">
        <Steps
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />

        <div className="h-full w-[1px] bg-gray-300/50" />

        <div className="flex flex-col flex-1 items-center space-y-5">
          <div className="text-center">
            <h2 className="text-4xl font-bold">
              {steps[currentStep - 1].label}
            </h2>
            <p className="">{steps[currentStep - 1].details}</p>
          </div>

          <div className="h-[60%]">{renderStep()}</div>
          <div className="flex gap-x-4 text-white">
            <button
              className={`w-36 py-2 bg-[#00fa00] font-semibold text-slate-200
                 hover:text-white hover:bg-[#00fa00]/50 focus:outline-none focus:ring-1 focus:ring-[#00fa00]/50 rounded-lg ${
                   currentStep === 1 ? "hidden" : ""
                 }`}
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className={`py-2 w-36 bg-[#00fa00] font-semibold text-slate-200
                 hover:text-white hover:bg-[#00fa00]/50 focus:outline-none focus:ring-1 focus:ring-[#00fa00]/50  rounded-lg ${
                   currentStep === steps.length
                     ? "bg-blue-600 focus:bg-blue-600/50 hover:bg-blue-600/50"
                     : ""
                 }`}
              onClick={handleNext}
            >
              {currentStep === steps.length ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpFormSection;

SignUpFormSection.propTypes = {
  handleFormRegisterSubmit: PropTypes.func.isRequired,
};
