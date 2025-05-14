
import React from 'react';
import { Check } from "lucide-react";

interface FormProgressStepsProps {
  currentStep: number;
  steps: string[];
}

const FormProgressSteps: React.FC<FormProgressStepsProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep >= index;
          const isCompleted = currentStep > index;
          
          return (
            <div
              key={step}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
        
        {/* Progress line */}
        <div className="absolute top-4 h-0.5 w-full bg-muted -z-10">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{
              width: `${((Math.max(0, currentStep - 1)) / (steps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FormProgressSteps;
