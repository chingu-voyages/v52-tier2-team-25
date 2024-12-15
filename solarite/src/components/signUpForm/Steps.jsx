import PropTypes from "prop-types";

const Steps = ({ steps, currentStep, completedSteps }) => {
  return (
    <div className="flex md:flex-col gap-4 text-center md:text-left">
      {steps.map((step) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = step.id === currentStep;

        return (
          <div
            key={step.id}
            className={`flex flex-col md:flex-row gap-3 items-center md:p-2 rounded-lg transition-colors`}
          >
            <div className="step-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={
                  isCompleted || isCurrent
                    ? "oklch(88.24% 0.2491 139.76)"
                    : "oklch(90.88% 0.1579 99.53)"
                }
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-check"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className={`${isCurrent ? "opacity-100" : "opacity-65"}`}>
              <p
                className={`text-sm sm:text-base md:text-lg font-semibold ${
                  isCurrent ? "block" : "hidden sm:block"
                }`}
              >
                {step.label}
              </p>
              <p
                className={`text-xs sm:text-sm md:text-base ${
                  isCurrent ? "block" : "hidden sm:block"
                }`}
              >
                {step.details}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;

Steps.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired,
    })
  ).isRequired,
  currentStep: PropTypes.number.isRequired,
  completedSteps: PropTypes.arrayOf(PropTypes.number).isRequired,
};
