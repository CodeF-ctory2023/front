import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DriverSolicitude } from '@/interfaces/driverSolicitude';
import CustomUploadFileComponent from '../CustomUploadFileComponent';
import { useState, useEffect } from 'react';

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

interface FormErrors {
    id?: string;
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    home_address?: string;
    city?: string;
    country?: string;
    birthDate?: string;
    licenseNumber?: string;
    licenseCountry?: string;
    licenseDate?: string;
    licenseExpirationDate?: string;
}

interface FormPartnerProps {
    formData: DriverSolicitude;
    onChange: (fieldName: keyof DriverSolicitude, value: any) => void;
    onValidityChange: (isValid: boolean) => void;
}

export const FormPartner: React.FC<FormPartnerProps> = ({ onChange , onValidityChange, formData}) => {

    const [errors, setErrors] = useState<FormErrors>({});

    const validateId = (id: string) => {
        if (!id) return "El ID es requerido.";
        if (id.length < 6) return "El ID debe tener al menos 6 caracteres.";
        if (id.length > 13) return "El ID no puede tener más de 13 caracteres.";
    
        const idRegex = /^\d+$/;
        if (!idRegex.test(id)) return "El ID solo debe contener números.";
    
        return "";
    };    

    const validateName = (name: string) => {
        if (!name) return "El nombre es requerido.";
        if (name.length < 2) return "El nombre debe tener al menos 2 caracteres.";
        if (name.length > 32) return "El nombre no puede tener más de 50 caracteres.";
    
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) return "El nombre solo debe contener letras.";
    
        return "";
    };

    const validateSurname = (surname: string) => {
        if (!surname) return "El apellido es requerido.";
        if (surname.length < 2) return "El apellido debe tener al menos 2 caracteres.";
        if (surname.length > 64) return "El apellido no puede tener más de 50 caracteres.";

        const surnameRegex = /^[a-zA-Z\s]+$/;
        if (!surnameRegex.test(surname)) return "El apellido solo debe contener letras.";

        return "";
    }

    const validateEmail = (email: string) => {
        if (!email) return "El correo electrónico es requerido.";
        if (email.length < 10) return "El correo electrónico debe tener al menos 10 caracteres.";
        if (email.length > 64) return "El correo electrónico no puede tener más de 32 caracteres.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "El correo electrónico no es válido.";

        return "";
    }

    const validatePhone = (phone: string) => {
        if (!phone) return "El número de contacto es requerido.";
        if (phone.length < 10) return "El número de contacto debe tener 10 caracteres.";
        if (phone.length > 11) return "El número de contacto no puede tener más de 10 caracteres.";

        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(phone)) return "El número de contacto solo debe contener números.";

        return "";
    }

    const validateHomeAddress = (home_address: string) => {
        if (!home_address) return "La dirección es requerida.";
        if (home_address.length < 5) return "La dirección debe tener al menos 5 caracteres.";
        if (home_address.length > 64) return "La dirección no puede tener más de 64 caracteres.";

        return "";
    }

    const validateCity = (city: string) => {
        if (!city) return "La ciudad es requerida.";
        if (city.length < 5) return "La ciudad debe tener al menos 5 caracteres.";
        if (city.length > 64) return "La ciudad no puede tener más de 64 caracteres.";

        return "";
    }

    const validateCountry = (country: string) => {
        if (!country) return "El país es requerido.";
        if (country.length < 5) return "El país debe tener al menos 5 caracteres.";
        if (country.length > 64) return "El país no puede tener más de 64 caracteres.";

        const countryRegex = /^[a-zA-Z\s]+$/;
        if (!countryRegex.test(country)) return "El país solo debe contener letras.";

        return "";
    }

    const validateBirthDate = (date: any) => {
        // Verificar si birthDate está presente
        if (!date) return "La fecha de nacimiento es requerida.";
    
        const birthDate = new Date(date);
        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
    
        // Asegurarse de que la fecha de cumpleaños aún no ha ocurrido este año
        if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() &&
                currentDate.getDate() < birthDate.getDate())
        ) {
            age--;
        }
    
        console.log("edad en validate: ", age);
    
        // Validar la edad
        if (age < 18) return "Debes ser mayor de 18 años.";
        if (age > 70) return "Debes ser menor de 70 años.";
    
        return "";
    };
    
    
    const validateLicenseNumber = (licenseNumber: string) => {
        if (!licenseNumber) return "El número de licencia es requerido.";
        if (licenseNumber.length < 5) return "El número de licencia debe tener al menos 5 caracteres.";
        if (licenseNumber.length > 64) return "El número de licencia no puede tener más de 64 caracteres.";

        return "";
    }

    const validateLicenseCountry = (licenseCountry: string) => {
        if (!licenseCountry) return "El país de expedición es requerido.";
        if (licenseCountry.length < 5) return "El país de expedición debe tener al menos 5 caracteres.";
        if (licenseCountry.length > 64) return "El país de expedición no puede tener más de 64 caracteres.";

        const licenseCountryRegex = /^[a-zA-Z\s]+$/;
        if (!licenseCountryRegex.test(licenseCountry)) return "El país de expedición solo debe contener letras.";

        return "";
    }

    const validateLicenseDate = (licenseDate: Date | null) => {
        if (!licenseDate) return "La fecha de expedición es requerida.";
    
       // if (!(licenseDate instanceof Date)) return "La fecha de expedición no es válida.";
    
        return "";
    };
    

    const validateLicenseExpirationDate = (licenseExpirationDate: Date | null) => {
        if (!licenseExpirationDate) return "La fecha de vencimiento es requerida.";
    
        //if (!(licenseExpirationDate instanceof Date)) return "La fecha de vencimiento no es válida.";
    
        const licenseDate = new Date(formData.licenseDate);
        if (!(licenseDate instanceof Date) || isNaN(licenseDate.getTime())) {
            return "La fecha de expedición no es válida o no está definida.";
        }
    
        if (licenseExpirationDate < licenseDate) {
            return "La fecha de vencimiento debe ser mayor a la fecha de expedición.";
        }
        
        return "";
    };
    

    const validateForm = () => {
        const newErrors: FormErrors = {
            id: validateId(formData.id),
            name: validateName(formData.name),
            surname: validateSurname(formData.surname),
            email: validateEmail(formData.email),
            phone: validatePhone(formData.phone),
            home_address: validateHomeAddress(formData.home_address),
            city: validateCity(formData.city),
            country: validateCountry(formData.country),
            birthDate: validateBirthDate(formData.birthDate),
            licenseNumber: validateLicenseNumber(formData.licenseNumber),
            licenseCountry: validateLicenseCountry(formData.licenseCountry),
            licenseDate: validateLicenseDate(formData.licenseDate),
            licenseExpirationDate: validateLicenseExpirationDate(formData.licenseExpirationDate),
        };

        setErrors(newErrors);

        console.log(newErrors);

        let isValid:boolean = Object.values(newErrors).every((error) => !error);

        onValidityChange(!isValid);
    };

    useEffect(() => {
        validateForm();
    }, [formData]);


    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const error = validateId(newValue);
        setErrors({ ...errors, id: error });
        onChange('id', newValue);
    }

    const handleIdTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange('id_type', newValue);
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const error = validateName(newValue);
        setErrors({ ...errors, name: error });
        onChange('name', newValue);
    }

    const handlesurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const error = validateSurname(newValue);
        setErrors({ ...errors, surname: error });
        onChange('surname', newValue);
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const error = validateEmail(newValue);
        setErrors({ ...errors, email: error });
        onChange('email', newValue);
    }

    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange('genre', newValue);
    }

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const error = validatePhone(newValue);
        setErrors({ ...errors, phone: error });
        onChange('phone', newValue);
    }

    const handleHomeAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const error = validateHomeAddress(newValue);
        setErrors({ ...errors, home_address: error });
        onChange('home_address', newValue);
    }

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const error = validateCity(newValue);
        setErrors({ ...errors, city: error });
        onChange('city', newValue);
    }

    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const error = validateCountry(newValue);
        setErrors({ ...errors, country: error });
        onChange('country', newValue);
    }

    const handleBirthDateChange = (date: any) => {
        let age:number = 0
        // Calcular la edad a partir de la fecha de nacimiento
        if (date) {
            const birthDate = new Date(date);
            const currentDate = new Date();
            age = currentDate.getFullYear() - birthDate.getFullYear();

            // Asegurarse de que la fecha de cumpleaños aún no ha ocurrido este año
            if (
                currentDate.getMonth() < birthDate.getMonth() ||
                (currentDate.getMonth() === birthDate.getMonth() &&
                    currentDate.getDate() < birthDate.getDate())
            ) {
                age--;
            }
        }
        console.log (age);
        const error = validateBirthDate(date);
        setErrors({ ...errors, birthDate: error });
        onChange('age', age);
        onChange('birthDate', date ? date.toISOString().split('T')[0] : '');
    }

    const handleLicenseDateChange = (date: Date | null) => {
        const error = validateLicenseDate(date);
        setErrors({ ...errors, licenseDate: error });
        onChange('licenseDate', date ? date.toISOString().split('T')[0] : '');
    }
    
    const handleLicenseExpirationDateChange = (date: Date | null) => {
        const error = validateLicenseExpirationDate(date);
        setErrors({ ...errors, licenseExpirationDate: error });
        onChange('licenseExpirationDate', date ? date.toISOString().split('T')[0] : '');
    }
    
    const handleLicenseCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const error = validateLicenseCountry(newValue);
        setErrors({ ...errors, licenseCountry: error });
        onChange('licenseCountry', newValue);
    }

    const handleLicenseNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const error = validateLicenseNumber(newValue);
        setErrors({ ...errors, licenseNumber: error });
        onChange('licenseNumber', newValue);
    };

    const handleLicenseTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onChange('licenseType', newValue);
    };

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
                        error={!!errors.name}
                        helperText={errors.name}
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handleNameChange}
                    />

                    <TextField
                        id="outlined-surname"
                        label="Apellido"
                        variant="outlined"
                        error={!!errors.surname}
                        helperText={errors.surname}
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
                        error={!!errors.id}
                        helperText={errors.id}
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
                        error={!!errors.email}
                        helperText={errors.email}
                        onChange={handleEmailChange}
                    />

                    <TextField
                        id="outlined-phone"
                        label="Número de contacto"
                        type='phone'
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        error={!!errors.phone}
                        helperText={errors.phone}
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
                        error={!!errors.country}
                        helperText={errors.country}
                        onChange={handleCountryChange}
                    />

                    <TextField
                        id="outlined-city"
                        label="Ciudad"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        error={!!errors.city}
                        helperText={errors.city}
                        onChange={handleCityChange}
                    />

                    <TextField
                        id="outlined-address"
                        label="Dirección"
                        variant="outlined"
                        className="w-full"
                        inputProps={{ style: { fontSize: '14px' } }}
                        error={!!errors.home_address}
                        helperText={errors.home_address}
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
                        error={!!errors.licenseNumber}
                        helperText={errors.licenseNumber}
                        onChange={handleLicenseNumberChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Fecha de expedición" className='w-full' onChange={handleLicenseDateChange} />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Fecha de vencimiento" className='w-full' onChange= {handleLicenseExpirationDateChange} />
                    </LocalizationProvider>

                    <TextField
                        id="outlined-license-country"
                        label="País de expedición"
                        variant="outlined"
                        className="w-full pb-8"
                        error = {!!errors.licenseCountry}
                        helperText={errors.licenseCountry}
                        inputProps={{ style: { fontSize: '14px' } }}
                        onChange={handleLicenseCountryChange}
                    />
                </div>
                
                <h4> Sube los documentos en un pdf:</h4>            
                <div className="flex justify-center items-center p-6 border-solid bg-white border-2 border-sky-400 rounded-lg border-opacity-25">
                    <div className="w-full">
                        <CustomUploadFileComponent />
                    </div>
                </div>
            </div>
        </form>
    );
};
