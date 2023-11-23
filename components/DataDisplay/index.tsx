import { Box, Button, Typography } from '@mui/material';
import { ModalUsage } from '@/components/ModalUsage';
import { Solicitude } from '@/interfaces/solicitude';
import { deleteSolicitude } from '@/services/solicitudesService';


interface DataDisplayProps {
    data: Solicitude;
}

const handleAccept = async () => {
    try {
        await deleteSolicitude(data.DriverSolicitude.id);
    } catch (error) {
        console.error("Error al aceptar la solicitud:", error);
    }
};

const handleReject = async () => {
    try {
        await deleteSolicitude(data.DriverSolicitude.id);
    } catch (error) {
        console.error("Error al rechazar la solicitud:", error);
    }
};


const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {

    return (
        <>
            <section>
                <div className='h-screen flex justify-center items-center space-x-10'>
                    <div>
                        <Box
                            sx={{
                                width: 600,
                                height: 400,
                                bgcolor: "primary.dark"
                            }}
                        />
                    </div>
                    <div className='flex flex-col max-w-2xl'>
                        <p className='text-2xl font-bold'>Partner Information</p>
                        <br />
                        <br />
                        <p className='text-xl font-bold'>
                            Datos personales
                        </p>
                        <p className='text-l'>Nombre: {data.DriverSolicitude.name} <br />
                            Apellido: {data.DriverSolicitude.surname} <br />
                            Email: {data.DriverSolicitude.email}<br />
                            Número de telefono: {data.DriverSolicitude.phone} <br />
                            Ciudad: {data.DriverSolicitude.city} <br />
                            País: {data.DriverSolicitude.country} <br />
                            Tipo de licencia: {data.DriverSolicitude.licenseType}<br />
                            Número de licencia: {data.DriverSolicitude.phone} <br />
                            Fecha de licencia: {data.DriverSolicitude.licenseDate}<br />
                            Fecha de expedición licencia: {data.DriverSolicitude.licenseExpirationDate}<br />

                        </p>
                        <br />
                        <p className='text-xl font-bold'>
                            Datos del vehiculo
                        </p>
                        <p className='text-l'>Marca de vehiculo: {data.VehicleModel.brand} <br />
                            Modelo: {data.VehicleModel.model} <br />
                            Color de vehiculo: {data.VehicleModel.color} <br />
                            Placa: {data.VehicleModel.license_plate} <br />
                            Tipo de combustible:{data.VehicleModel.fuel_type}<br />
                            Número de pasajeros: {data.VehicleModel.capacity} <br />
                            Permite equipaje: {data.VehicleModel.allow_luggage}<br />

                        </p>
                        <br />

                    </div>
                </div>

                <div className='flex flex-row h-20 justify-center items-center space-x-10'>
                    <ModalUsage
                        label="Aceptar"
                        title="Partner Accepted"
                        content="La solicitud del socio ha sido aprobada. Recuerde enviar una notificación de bienvenida..."
                        text="La solicitud del socio ha sido aprobada..."
                        reject={true}
                        data = {data}
                    />

                    <ModalUsage
                        label="Rechazar"
                        title="Partner Rejected"
                        content="Tenga en cuenta que esta acción no se puede deshacer, ¿Está seguro de continuar?"
                        text="La solicitud del socio ha sido rechazada..."
                        reject={false}
                        data = {data}
                    />


                </div>
            </section>
        </>

    );
};

export default DataDisplay;