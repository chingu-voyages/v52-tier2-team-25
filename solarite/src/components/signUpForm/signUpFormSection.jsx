import PropTypes from "prop-types";
import { useState } from "react";
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

const SignUpFormSection = ({ onChange, values, handleFormRegisterSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const isStepCompleted = (stepId) => completedSteps.includes(stepId);

  const handleNext = () => {
    if (currentStep < steps.length) {
      if (!isStepCompleted(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    const step = steps.find((s) => s.id === currentStep);
    if (step) {
      const StepComponent = step.component;
      return <StepComponent onChange={onChange} values={values} />;
    }
    return null;
  };
  return (
    <section className="flex gap-4 py-20 lg:h-[560px]">
      <Steps
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />
      <div className="flex flex-col flex-1 items-center space-y-5">
        <div className="text-center">
          <h2 className="text-4xl font-bold">{steps[currentStep - 1].label}</h2>
          <p className="">{steps[currentStep - 1].details}</p>
        </div>

        <div className="">{renderStep()}</div>
        <div className="flex gap-x-4 text-white">
          <button
            className="px-8 py-2 bg-green-600 rounded-lg"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </button>
          <button
            className="px-8 py-2 bg-green-600 rounded-lg"
            onClick={
              currentStep === steps.length
                ? handleFormRegisterSubmit
                : handleNext
            }
            disabled={currentStep === steps.length}
          >
            {currentStep === steps.length ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignUpFormSection;

SignUpFormSection.propTypes = {
  handleFormRegisterSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    passwordConfirm: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    // Add any other form values you need
  }).isRequired,
};
