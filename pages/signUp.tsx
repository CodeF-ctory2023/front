import React, { useState } from "react";
import { FormPartner } from "@/components/FormPartner";
import { FormVehicle } from "@/components/FormVehicle";
import CustomStepper from "@/components/CustomStepper";
import CustomButton from "@/components/CustomButton";
import { DriverSolicitude } from "@/interfaces/driverSolicitude";

const SignUp = () => {
    const [activeStep, setActiveStep] = useState(0);

    const [formData, setFormData] = useState<DriverSolicitude>({
        id: '',
        id_type: '',
        name: '',
        surname: '',
        email: '',
        genre: '',
        phone: '',
        home_address: '',
        city: '',
        country: '',
        birthDate: new Date(),
        age: 0,
        licenseNumber: '',
        licenseType: '',
        licenseDate: new Date(),
        licenseExpirationDate: new Date(),
        licenseCountry: '',

    });

    const handleNextStep = () => {
        if (activeStep == 0) {
            const formPartnerJSON = JSON.stringify(formData);
            console.table(formPartnerJSON);
            setActiveStep(activeStep + 1);
        }
    };

    const handleFormDataChange = (fieldName: keyof DriverSolicitude, value: string) => {
        setFormData({ ...formData, [fieldName]: value });
    };

    const steps = [
        {
            label: 'Datos personales',
            content: <FormPartner
                formData={formData}
                onChange={handleFormDataChange}
            />
        },
        {
            label: 'Datos del Vehículo',
            content: <FormVehicle />
        }
    ]
    return (
        <div className="container mx-auto mt-10 border-solid border-2 border-radius rounded-lg 
                            max-w-4xl font-roboto border-sky-700 border-opacity-50">

            <div className="p-8">
                <CustomStepper
                    steps={steps} 
                    activeStep={activeStep}
                />
                {/* <button onClick={handlePreviousStep} disabled={activeStep === 0}>Anterior</button> */}
            </div>

            <div className="text-center">
                <CustomButton
                    text="Continuar"
                    variant="contained"
                    handleClick={handleNextStep}
                    className="mb-4 p-2 px-5"
                    disabled={activeStep === steps.length - 1} />
            </div>
        </div>
    )
};

export default SignUp;
