import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGlobalContext } from '@/context/Global';
import { MarkerType } from '@/types';

const Map = () => {
  const { state } = useGlobalContext();

  return (
    <MapContainer
      style={{ height: '100vh', zIndex: '20' }}
      center={[6.26762, -75.567811]}
      zoom={17}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {state?.markers.map((marker: MarkerType) => (
        <Marker
          key={marker?.id}
          position={[marker?.lat, marker?.long]}
          icon={L.icon({
            iconUrl: marker?.icon,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          })}
        >
          <Popup>
            Aquí está{' '}
            {marker.type === 'user'
              ? 'el usuario 👤'
              : marker.type === 'driver'
              ? 'un conductor 🚗'
              : 'el punto de destino 📍'}
          </Popup>
        </Marker>
      ))}
      {state?.nearbyDrivers?.showCircle ? (
        <Circle
          center={state?.nearbyDrivers?.coords}
          radius={state?.nearbyDrivers?.radius}
        />
      ) : null}
    </MapContainer>
  );
};

export default Map;
