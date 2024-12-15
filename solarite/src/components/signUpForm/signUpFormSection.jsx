import PropTypes from "prop-types";
import { useState, useRef } from "react";
import Steps from "@/components/signUpForm/Steps";
import { Email, Password, Address, Profile } from "./formSteps";
import { useFormContext } from "@/context/FormContext";

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
const stepValidation = {
  1: ["email", "emailConfirm", "name"],
  2: ["password", "passwordConfirm"],
  3: ["address", "phone"],
  4: ["profileName"],
};

const SignUpFormSection = ({ handleFormRegisterSubmit }) => {
  const { values, errors, validateData, setErrors } = useFormContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const formRef = useRef(null);

  const isStepCompleted = async (stepId) => {
    const requiredFields = stepValidation[stepId];
    if (!requiredFields) return true;

    const stepValues = requiredFields.reduce((acc, field) => {
      acc[field] = values[field] || "";
      return acc;
    }, {});

    const fieldResults = requiredFields.map((field) => {
      const value = stepValues[field];
      const isFieldFilled = value && value.trim().length > 0;
      return isFieldFilled;
    });

    const hasAllFields = fieldResults.every((result) => result === true);

    const newErrors = { ...errors };

    if (!hasAllFields) {
      requiredFields.forEach((field) => {
        if (!stepValues[field] || stepValues[field].trim() === "") {
          newErrors[field] = "This field is required";
        }
      });
    }

    await Promise.all(
      requiredFields.map(async (field) => {
        if (stepValues[field] && stepValues[field].trim() !== "") {
          await validateData(stepValues, field);
        }
      })
    );

    setErrors(newErrors);

    const hasNoErrors = requiredFields.every((field) => !errors[field]);

    return hasAllFields && hasNoErrors;
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      const isCompleted = await isStepCompleted(currentStep);
      if (isCompleted) {
        setCompletedSteps((prev) => [...prev, currentStep]);
        setCurrentStep((prev) => prev + 1);
      }
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
    <form ref={formRef} className="gap-4 py-8 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col  md:flex-row px-4 md:px-10 lg:px-14 py-8 rounded-xl shadow-2xl backdrop-blur-3xl bg-white/25 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row w-full justify-center md:justify-start md:w-[45%]">
          <Steps
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </div>

        <div className="hidden sm:block  w-[1px] bg-gray-300/50" />

        <div className="flex flex-col flex-1 items-center space-y-5">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {steps[currentStep - 1].label}
            </h2>
            <p className="text-sm sm:text-base md:text-lg">
              {steps[currentStep - 1].details}
            </p>
          </div>

          <div className="">{renderStep()}</div>
          <div className="flex gap-x-4 text-white">
            <button
              type="button"
              className={`w-36 py-2 bg-[#00fa00] font-semibold text-slate-200
                 hover:text-white hover:bg-[#00fa00]/50 focus:outline-none focus:ring-1 focus:ring-[#00fa00]/50 rounded-lg ${
                   currentStep === 1 ? "hidden" : ""
                 }`}
              onClick={handleBack}
            >
              Back
            </button>

            {currentStep < steps.length ? (
              <button
                type="button"
                className="py-2 w-28 lg:w-36 bg-[#00fa00] font-semibold text-slate-200
            hover:text-white hover:bg-[#00fa00]/50 focus:outline-none focus:ring-1 focus:ring-[#00fa00]/50 rounded-lg"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFormRegisterSubmit}
                className="py-2 w-28 lg:w-36 bg-[#00fa00] font-semibold text-slate-200
            hover:text-white hover:bg-[#00fa00]/50 focus:outline-none focus:ring-1 focus:ring-[#00fa00]/50 rounded-lg"
              >
                Submit
              </button>
            )}
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
