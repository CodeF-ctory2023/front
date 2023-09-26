import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

interface StepItem {
  label: string;
  content: JSX.Element;
}

interface CustomStepperProps {
  steps: StepItem[];
  activeStep: number; // Prop para rastrear el paso activo
}

const CustomStepper: React.FC<CustomStepperProps> = ({ steps, activeStep }) => {
  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {steps[activeStep].content}
      </div>
    </div>
  );
};

export default CustomStepper;
