import React, { useState } from "react";
import { FormPartner } from "@/components/FormPartner";
import { FormVehicle } from "@/components/FormVehicle";
import CustomStepper from "@/components/CustomStepper";
import CustomButton from "@/components/CustomButton";
import CustomModal from "@/components/CustomModal";
import { DriverSolicitude } from "@/interfaces/driverSolicitude";
import { VehicleModel } from "@/interfaces/vehicleModel";
import { useRouter } from "next/router";
import Typography from '@mui/material/Typography';
import { sendVehicleData } from "@/services/vehicleService";
import { sendDriverSolicitudeData } from "@/services/driverSolicitudeService";

const SignUp = () => {
    const [activeStep, setActiveStep] = useState(0);
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleModalClick = () => {
        router.push('/');
    }

    let [isFormValid, setIsFormValid] = useState(false);
    const [isFormValidVehicle, setIsFormValidVehicle] = useState(false);

    const handleFormValidityChange = (isValid:boolean) => {
        setIsFormValid(isValid);
    };

    const handleFormValidityChangeVehicle = (isValid:boolean) => {
        setIsFormValidVehicle(isValid);
    }

    
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

    const [formDataVehicle, setFormDataVehicle] = useState<VehicleModel>({
        license_plate: '',
        color: '',
        brand: '',
        model: '',
        fuel_type: '',
        capacity: 0,
        allow_luggage: false
    });

    const handleNextStep = async () => {
        if (activeStep === 0) {
            try {
                const formDriverJSON = JSON.stringify(formData);
                console.log('Datos del partner:', formDriverJSON);
                await sendDriverSolicitudeData(formData);
                console.log('Datos del partner enviados con éxito');
                setActiveStep(activeStep + 1);
                isFormValid = false;
            } catch (error) {
                console.error('Error al enviar datos del partner:', error);
            }
        }
        if (activeStep === 1) {
            try {
                const formVehicleJSON = JSON.stringify(formDataVehicle);
                console.log('Datos del vehículo:', formVehicleJSON);
                handleOpen();
                await sendVehicleData(formDataVehicle);
                console.log('Datos del vehículo enviados con éxito');
            } catch (error) {
                console.error('Error al enviar datos del vehículo:', error);
            }
        }
    };
    
    const handleFormDataChange = (fieldName: keyof DriverSolicitude, value: any) => {
        setFormData({ ...formData, [fieldName]: value });
    };

    const handleFormDataVehicleChange = (fieldName: keyof VehicleModel, value: string | boolean) => {
        setFormDataVehicle({ ...formDataVehicle, [fieldName]: value });
    };

    const steps = [
        {
            label: 'Datos personales',
            content: <FormPartner
                formData={formData}
                onChange={handleFormDataChange}
                onValidityChange={handleFormValidityChange}
        />
        
        },
        {
            label: 'Datos del Vehículo',
            content: <FormVehicle
                formData={formDataVehicle}
                onChange={handleFormDataVehicleChange}
                onValidityChange={handleFormValidityChangeVehicle}
            />
        }
    ]

    return (
        <div className="container mx-auto mt-10 border-solid border-2 border-radius rounded-lg 
                            max-w-4xl font-roboto border-sky-700 border-opacity-70">

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
                    disabled={isFormValid || isFormValidVehicle} />
            </div>

            <CustomModal open={open} handleOpen={handleOpen} handleClose={handleClose}>
                <div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Atención:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Acepta que los datos ingresados son correctos y que la información suministrada es verídica.
                        <div className="flex justify-center my-3">
                            <CustomButton text="Ok" handleClick={handleModalClick} color="secondary" variant="contained"></CustomButton>
                        </div>
                    </Typography>
                </div>
            </CustomModal>

        </div >
    )
};

export default SignUp;
