
import { Circle, MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import RoutingMachine from './RoutingMachine';
import L, { LatLngExpression } from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';


var usuario: LatLngExpression = [6.272058720869105, -75.56019922577197]
var conductores: LatLngExpression[] = [
  [6.269901616038895, -75.5607716889264],
  [6.27029375070265, -75.55568877931007],
  [6.271088239807405, -75.5602528700079],
  [6.273099013156994, -75.55512738332258],
  [6.268317992281793, -75.5638366075607]]



// Función para encontrar los conductores más cercanos dentro de un radio en metros
function conductoresMasCercanos(conductores: LatLngExpression[], usuario: LatLngExpression, radioMetros: number) {
  const usuarioLatLng = L.latLng(usuario);
  const conductoresCercanos = conductores.filter((conductor) => {
    const conductorLatLng = L.latLng(conductor);
    return usuarioLatLng.distanceTo(conductorLatLng) <= radioMetros;
  });
  return conductoresCercanos;
}

// Función para encontrar el conductor más cercano
function encontrarConductorMasCercano(usuario: LatLngExpression, conductores: LatLngExpression[]) {
  let conductorMasCercano = null;
  if (conductores.length > 0) {
    conductorMasCercano = conductores.reduce((cercano, conductor) => {
      const distanciaUsuario = L.latLng(usuario);
      const distanciaConductor = L.latLng(conductor);
      if (!cercano || distanciaConductor.distanceTo(distanciaUsuario) < cercano.distanceTo(distanciaUsuario)) {
        return distanciaConductor;
      }
      return cercano;
    }, null as L.LatLng | null);
  }
  return conductorMasCercano;
}


export default function Map() {

  const conductoresDentroDeRadio = conductoresMasCercanos(conductores, usuario, 300);

  const conductorMasCercano = encontrarConductorMasCercano(usuario, conductoresDentroDeRadio);

  // Convierte la coordenada del conductor más cercano a LatLngExpression
  const conductorMasCercanoLatLngExpression: LatLngExpression = conductorMasCercano
    ? [conductorMasCercano.lat, conductorMasCercano.lng]
    : [0, 0];

    const fillBlueOptions = { fillColor: 'blue' }


  const position: LatLngExpression = [6.271356482023135, -75.55728972772394]
  return (<MapContainer className='w-full h-1/2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/3'
    center={position} zoom={15} zoomControl={false} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/*poner en el mapa a ubicacion de usuario  */}
    {/* Marcador para la ubicación del usuario */}
    {/* <Marker icon={
      new L.Icon({
        iconUrl: 'pin4.png',
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41],
        shadowSize: [41, 41],
      })
    } position={usuario}>
      <Popup>
        Ubicación del Usuario,
      </Popup>
    </Marker> */}
<RoutingMachine position={'topleft'}
      start={usuario}
      end={conductorMasCercanoLatLngExpression}
      color={'#757de8'} />
    <Circle center={usuario} pathOptions={fillBlueOptions} radius={300} />

    {/* Marcador para el conductor más cercano */}
    {/* <Marker icon={
      new L.Icon({
        iconUrl: 'pin3.png',
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41],
        shadowSize: [41, 41],
      })
    } position={conductorMasCercanoLatLngExpression}>
      <Popup>
        Ubicación del conductor,
      </Popup>
    </Marker> */}

    
    {/* encontrar conductor mas cercano con respecto a un punto que es usuario y ponerlo en el mapa*/}

    {/* {pintarConductores(conductoresDentroDeRadio, 'pin2.png')} */}
    {/* {pintarConductores(conductores)} */}

    <ZoomControl position='topright' />
  </MapContainer>);
}


function pintarConductores(conductores: LatLngExpression[], iconUrl: string = 'pin.png') {
  const conductoresMarkers = [];
for (const conductor of conductores) {
  const conductorPosition = L.latLng(conductor);
  const marker = (
    <Marker
      icon={
        new L.Icon({
          iconUrl: iconUrl,
          iconSize: [41, 41],
          iconAnchor: [12.5, 41],
          popupAnchor: [0, -41],
          shadowSize: [41, 41],
        })
      }
      position={conductorPosition}
    >
      <Popup>Ubicación del conductor</Popup>
    </Marker>
  );
  conductoresMarkers.push(marker);
}
return conductoresMarkers;

}


export { Map };