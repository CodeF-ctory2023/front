import { VehicleModel } from "@/interfaces/vehicleModel";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from "@mui/material";

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


interface FormVehicleProps {
    formData: VehicleModel;
    onChange: (fieldName: keyof VehicleModel, value: string | boolean) => void;
}

export const FormVehicle: React.FC<FormVehicleProps> = ({ formData, onChange }) => {
    
    const handleLicensePlateChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const NEWVALUE = event.target.value;
        onChange('license_plate', NEWVALUE);
    }

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const NEWVALUE = event.target.value;
        onChange('color', NEWVALUE);
    }

    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const NEWVALUE = event.target.value;
        onChange('brand', NEWVALUE);
    }

    const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const NEWVALUE = event.target.value;
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
                        onChange={handleLicensePlateChange}
                    />

                    <TextField
                        id="color"
                        label="Color"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
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
                        onChange={handleBrandChange}
                    />

                    <TextField
                        id="model"
                        label="Modelo"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
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

