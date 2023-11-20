import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGlobalContext } from '@/context/Global';
import { MarkerType } from '@/types';
import { MapRouting } from './MapRouting';
import { useRouter } from 'next/router';

const markerDescriptions: { [key: string]: string } = {
  user: 'el usuario 👤',
  driver: 'un conductor 🚗',
  destination: 'el punto de destino 📍',
};

const Map = () => {
  const { state } = useGlobalContext();

  const router = useRouter();
  const { id } = router.query;

  return (
    <MapContainer
      style={{ height: '100vh', zIndex: '20' }}
      center={[6.26762, -75.567811]}
      zoom={15}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {state?.markers.map((marker: MarkerType) => (
        <Marker
          key={`${marker.type}-${marker?.id}`}
          position={[marker?.lat, marker?.long]}
          icon={L.icon({
            iconUrl: marker?.icon,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })}
        >
          <Popup>Aquí está {markerDescriptions[marker.type]}</Popup>
        </Marker>
      ))}
      {state?.nearbyDrivers?.showCircle ? (
        <Circle
          center={state?.nearbyDrivers?.coords}
          radius={state?.nearbyDrivers?.radius}
        />
      ) : null}
      {(id || state.services.length) && <MapRouting />}
    </MapContainer>
  );
};

export default Map;
