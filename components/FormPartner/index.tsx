import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DriverSolicitude } from '@/interfaces/driverSolicitude';

const idTypes = [
    {
        value: 'CC',
        label: 'Cédula de ciudadanía',
    },
    {
        value: 'CE',
        label: 'Cédula de extranjería',
    },
    {
        value: 'PA',
        label: 'Pasaporte',
    }
]

const genres = [
    {
        value: 'M',
        label: 'Masculino',
    },
    {
        value: 'F',
        label: 'Femenino',
    }
]

const licenseTypes = [
    {
        value: 'B1',
        label: 'B1',
    },
    {
        value: 'B2',
        label: 'B2',
    },
    {
        value: 'B3',
        label: 'B3',
    },
    {
        value: 'C1',
        label: 'C1',
    },
    {
        value: 'C2',
        label: 'C2',
    },
    {
        value: 'C3',
        label: 'C3',
    },
]

interface FormPartnerProps {
    formData: DriverSolicitude;
    onChange: (fieldName: keyof DriverSolicitude, value: string) => void;
}

export const FormPartner: React.FC<FormPartnerProps> = ({ formData, onChange }) => 
{
    const handleIdChange= (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('id', newValue);
    }

    const handleIdTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('id_type', newValue);
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('name', newValue);
    }

    const handlesurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('surname', newValue);
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('email', newValue);
    }

    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('genre', newValue);
    }

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('phone', newValue);
    }

    const handleHomeAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('home_address', newValue);
    }

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('city', newValue);
    }

    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('country', newValue);
    }

    const handleBirthDateChange = (date: Date | null) => 
    {
        onChange('birthDate', date?.toString() || '');
    
        // Calcular la edad a partir de la fecha de nacimiento
        if (date) {
            const birthDate = new Date(date);
            const currentDate = new Date();
            let age:number = currentDate.getFullYear() - birthDate.getFullYear();
    
            // Asegurarse de que la fecha de cumpleaños aún no ha ocurrido este año
            if (
                currentDate.getMonth() < birthDate.getMonth() ||
                (currentDate.getMonth() === birthDate.getMonth() &&
                    currentDate.getDate() < birthDate.getDate())
            ) {
                age--;
            }
            onChange('age', age.toString());
        }
    };

    const handleLicenseNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('licenseNumber', newValue);
    };

    const handleLicenseTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('licenseType', newValue);
    };

    const handleLicenseDateChange = (date: Date | null) => 
    {
        onChange('licenseDate', date?.toString() || '');
    }

    const handleLicenseExpirationDateChange = (date: Date | null) => 
    {
        onChange('licenseExpirationDate', date?.toString() || '');
    }

    const handleLicenseCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        const newValue = event.target.value;
        onChange('licenseCountry', newValue);
    }
    
    //html
    return (
        <form className="container mx-auto p-2">
            <div className="text-center text-2xl my-4">
                <h2 className='font-normal '>Registro de socio conductor</h2>
            </div>

            <div className="my-10 space-y-6 w-5/6 mx-auto">
                <h3 className="text-xl font-medium mb-2">Datos personales</h3>
                <hr className=" border-gray-300 w-4/5 ml-0" />

                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                        id="outlined-name"
                        label="Nombre"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handleNameChange}
                    />

                    <TextField
                        id="outlined-surname"
                        label="Apellido"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handlesurnameChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                        id="outlined-id-type"
                        select
                        label="Tipo de identificación"
                        defaultValue={'CC'}
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        variant='standard'
                        onChange={handleIdTypeChange}
                    >
                        {idTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="outlined-id"
                        label="Número de identificación"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handleIdChange}
                    />
                </div>

                <div className="grid grid-colss-1 md:grid-cols-2 gap-4">

                    <TextField
                        id="outlined-email"
                        label="Correo electrónico"
                        type='email'
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handleEmailChange}
                    />

                    <TextField
                        id="outlined-phone"
                        label="Número de contacto"
                        type='phone'
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handlePhoneChange}
                    />
                </div>

                <TextField
                    id="outlined-genre"
                    select
                    label="Género"
                    defaultValue={'F'}
                    className="w-2/5"
                    inputProps={{ style: { fontSize: '14px' } }}
                    variant='standard'
                    onChange={handleGenreChange}
                >
                    {genres.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TextField
                        id="outlined-country"
                        label="País"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handleCountryChange}
                    />

                    <TextField
                        id="outlined-city"
                        label="Ciudad"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handleCityChange}
                    />

                    <TextField
                        id="outlined-address"
                        label="Dirección"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handleHomeAddressChange}
                    />
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Fecha de nacimiento" 
                        className='w-3/5 pb-6'
                        onChange={handleBirthDateChange}
                        />
                </LocalizationProvider>

                <h3 className="text-xl font-medium mb-2">Datos de la licencia de conducción</h3>
                <hr className=" border-gray-300 w-4/5 ml-0" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <TextField
                        id="outlined-license-type"
                        select
                        label="Tipo de licencia"
                        defaultValue={'B1'}
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        variant='standard'
                        onChange={handleLicenseTypeChange}
                    >
                        {licenseTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="outlined-license-number"
                        label="Número de licencia"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handleLicenseNumberChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Fecha de expedición" className='w-full' />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Fecha de vencimiento" className='w-full' />
                    </LocalizationProvider>

                    <TextField
                        id="outlined-license-country"
                        label="País de expedición"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handleLicenseCountryChange}
                    />
                </div>
            </div>
        </form>
    );
};
