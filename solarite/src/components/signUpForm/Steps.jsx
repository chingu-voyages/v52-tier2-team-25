import PropTypes from "prop-types";

const Steps = ({ steps, currentStep, completedSteps }) => {
  return (
    <div className="flex flex-col flex-1 gap-4">
      {steps.map((step) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = step.id === currentStep;

        return (
          <div
            key={step.id}
            className={`flex gap-3 items-center p-2 rounded-lg transition-colors`}
          >
            <div className="step-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isCompleted || isCurrent ? "#16a34a" : "#5c5c5c"}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-check"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className={`${isCurrent ? "opacity-100" : "opacity-50"}`}>
              <p className="font-bold">{step.label}</p>
              <p>{step.details}</p>
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
