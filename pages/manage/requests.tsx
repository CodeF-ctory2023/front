import { Button, Avatar } from '@mui/material';
import { Solicitude } from '@/interfaces/solicitude';
import { FC, useState, useEffect } from 'react';
import DataDisplay from '@/components/DataDisplay';
import { getSolicitudes } from '@/services/solicitudesService';

const Requests: FC = () => {
    const [data, setData] = useState<Solicitude[]>([]);
    const [selectedData, setSelectedData] = useState<Solicitude | null>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const solicitudes = await getSolicitudes();
                console.log(solicitudes);
                setData(solicitudes);
            } catch (error) {
                console.error("Error al cargar las solicitudes", error);
            }
        };

        fetchData();
    }, []);

    const onHandlerData = (solicitude: Solicitude) => {
        setSelectedData(solicitude);
        setActive(true);
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    if (active && selectedData) {
        return (
            <div>
                <DataDisplay data={selectedData} />
            </div>
        );
    }

    return (
        <section className="flex justify-center">
            <div>
                <Button
                    variant="contained"
                    className="bg-blue-700 max-h-6 fixed left-10 bottom-10"
                    size="small"
                    href="/manager"
                >
                    {"<-"}
                </Button>

                <div className="h-screen items-center">
                    {data.map((solicitude, index) => (
                        <div key={index} className="flex justify-center space-x-80 my-10">
                            <div className="flex">
                                <Avatar alt="Unknown Sharp" src='' sx={{ width: 90, height: 90 }} />
                            </div>

                            <div>
                                <p className="text-2xl font-bold">{solicitude.DriverSolicitude.name}</p>
                                <p className="text-xl text-slate-500">{solicitude.VehicleModel.brand} {solicitude.VehicleModel.model}</p>
                                <Button
                                    variant="contained"
                                    className="bg-blue-700 max-h-12"
                                    size="medium"
                                    onClick={() => onHandlerData(solicitude)}
                                >
                                    More information
                                </Button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}

export default Requests;


