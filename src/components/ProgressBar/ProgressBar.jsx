import React from "react";

const ProgressBar = ({ steps, currentStep, setCurrentStep }) => {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, i) => {
        const isCompleted = i + 1 < currentStep;
        const isActive = i + 1 === currentStep;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => setCurrentStep(i + 1)} 
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
                  ${isCompleted ? "bg-yellow-500 border-yellow-500 text-white" : ""}
                  ${isActive ? "bg-yellow-100 border-yellow -500 text-yellow-500" : ""}
                  ${
                    !isCompleted && !isActive
                      ? "bg-gray-200 border-gray-300 text-gray-500"
                      : ""
                  }`}
              >
                {i + 1}
              </button>
              <p
                className={`mt-2 text-sm ${
                  isCompleted || isActive ? "text-yellow-500" : "text-gray-500"
                }`}
              >
                {step}
              </p>
            </div>

            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mb-10 ${
                  isCompleted ? "bg-yellow-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;
