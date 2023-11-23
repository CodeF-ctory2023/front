import { VehicleModel } from "@/interfaces/vehicleModel";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from "@mui/material";
import { useState, useEffect } from "react";

const fuelTypes = [
    {
        value: 'Gasoline',
        label: 'Gasolina',
    },
    {
        value: 'Diesel',
        label: 'Diesel',
    },
    {
        value: 'Electric',
        label: 'Eléctrico',
    },
    {
        value: 'Hybrid',
        label: 'Híbrido',
    }
]

interface FormVehicleErrors{
    license_plate?: string;
    color?: string;
    brand?: string;
    model?: string;
    fuel_type?: string;
    capacity?: string;
    allow_luggage?: string;
}

interface FormVehicleProps {
    formData: VehicleModel;
    onChange: (fieldName: keyof VehicleModel, value: string | boolean) => void;
    onValidityChange: (isValid: boolean) => void;
}

export const FormVehicle: React.FC<FormVehicleProps> = ({ formData, onChange, onValidityChange }) => {

    const [errors, setErrors] = useState<FormVehicleErrors>({});

    const validateLicensePlate = (license_plate: string) => {
        if (!license_plate) {
            return 'Este campo es requerido';
        }

        const regex = /^[A-Z]{3}[0-9]{3}$/;
        if (!regex.test(license_plate)) {
            return 'Formato incorrecto';
        }
        return '';
    }

    const validateColor = (color: string) => {
        if (!color) {
            return 'Este campo es requerido';
        }

        if (color.length > 20) {
            return 'El color no puede contener más de 20 caracteres';
        }

        if (color.length < 3) {
            return 'El color no puede contener menos de 3 caracteres';
        }

        const regex = /^[a-zA-Z]+$/;
        if (!regex.test(color)) {
            return 'El color no puede contener números';
        }

        return '';
    }

    const validateBrand = (brand: string) => {
        if (!brand) {
            return 'Este campo es requerido';
        }

        const regex = /^[a-zA-Z]+$/;
        if (!regex.test(brand)) {
            return 'La marca no puede contener números';
        }

        if (brand.length > 20) {
            return 'La marca no puede contener más de 20 caracteres';
        }

        if (brand.length < 2) {
            return 'La marca no puede contener menos de 2 caracteres';
        }

        return '';
    }

    const validateModel = (model: string) => {
        if (!model) {
            return 'Este campo es requerido';
        }

        if (model.length > 20) {
            return 'El modelo no puede contener más de 20 caracteres';
        }

        if (model.length < 2) {
            return 'El modelo no puede contener menos de 2 caracteres';
        }

        return '';
    }

    const validateCapacity = (capacity: string) => {
        if (!capacity) {
            return 'Este campo es requerido';
        }

        const regex = /^[0-9]+$/;
        if (!regex.test(capacity)) {
            return 'La capacidad no puede contener letras';
        }

        if (parseInt(capacity) < 1) {
            return 'La capacidad debe ser mayor a 0';
        }

        if (parseInt(capacity) > 20) {
            return 'La capacidad no puede ser mayor a 20';
        }

        return '';
    }

    const validateForm = () => {
        const newErrors: FormVehicleErrors = {
            license_plate: validateLicensePlate(formData.license_plate),
            color: validateColor(formData.color),
            brand: validateBrand(formData.brand),
            model: validateModel(formData.model),
            capacity: validateCapacity(formData.capacity.toString()),
        };

        setErrors(newErrors);

        let isValid:boolean = Object.values(newErrors).every((error) => !error);
        onValidityChange(!isValid);
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    
    const handleLicensePlateChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const NEWVALUE = event.target.value;
        const error = validateLicensePlate(NEWVALUE);
        setErrors({ ...errors, license_plate: error });
        onChange('license_plate', NEWVALUE);
    }

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const NEWVALUE = event.target.value;
        const error = validateColor(NEWVALUE);
        setErrors({ ...errors, color: error });
        onChange('color', NEWVALUE);
    }

    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const NEWVALUE = event.target.value;
        const error = validateBrand(NEWVALUE);
        setErrors({ ...errors, brand: error });
        onChange('brand', NEWVALUE);
    }

    const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const NEWVALUE = event.target.value;
        const error = validateModel(NEWVALUE);
        setErrors({ ...errors, model: error });
        onChange('model', NEWVALUE);
    }

    const handleFuelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const NEWVALUE = event.target.value;
        onChange('fuel_type', NEWVALUE);
    }

    const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const NEWVALUE = event.target.value;
        const error = validateCapacity(NEWVALUE);
        setErrors({ ...errors, capacity: error });
        onChange('capacity', NEWVALUE);
    }


    const handleLuggageChange = (event: React.SyntheticEvent<Element, Event>, checked: boolean) => 
    {
        onChange('allow_luggage', checked);
    };
    
    return (

        <form className="container mx-auto p-2">
            <div className="text-center text-2xl my-4">
                <h2>Registro de vehículo</h2>
            </div>

            <div className="my-10 space-y-6 w-5/6 mx-auto">
                <h3 className="text-xl font.medium mb-2">Datos del vehículo</h3>
                <hr className="border-gray-300 w-4/5 ml-0" />

                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                        id="license-plate"
                        label="Placas"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        error={!!errors.license_plate}
                        helperText={errors.license_plate}
                        onChange={handleLicensePlateChange}
                    />

                    <TextField
                        id="color"
                        label="Color"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        error={!!errors.color}
                        helperText={errors.color}
                        onChange={handleColorChange}
                    />
                </div>

                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                        id="brand"
                        label="Marca"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        error={!!errors.brand}
                        helperText={errors.brand}
                        onChange={handleBrandChange}
                    />

                    <TextField
                        id="model"
                        label="Modelo"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        error={!!errors.model}
                        helperText={errors.model}
                         onChange={handleModelChange}
                    />
                </div>

                <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TextField
                        id="outlined-fuel"
                        select
                        label="Tipo de combustible"
                        defaultValue={'Gasoline'}
                        variant='standard'
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handleFuelTypeChange}
                    >
                        {fuelTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                <div className="mx-5">{option.label}</div>
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="capacityl"
                        label="Capacidad de pasajeros"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        error={!!errors.capacity}
                        helperText={errors.capacity}
                        onChange={handleCapacityChange}
                    />

                    <FormControlLabel 
                        control={<Checkbox />} 
                        label="Admite equipaje"
                        onChange={handleLuggageChange}

                        />
                </div>

            </div>
        </form>
    );
};

