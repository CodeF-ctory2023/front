import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import MarkerClusterGroup from "react-leaflet-cluster";
import RoutingMachine from './RoutingMachine';


// create custom icon
// const customIcon = new Icon({
//   // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
//   iconUrl: require("./icons/placeholder.png"),
//   iconSize: [38, 38] // size of the icon
// });

// const createClusterCustomIcon = function (cluster) {
//   return new divIcon({
//     html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
//     className: "custom-marker-cluster",
//     iconSize: point(33, 33, true)
//   });
// };

const markers = [
  {
    geocode: [6.271356482023135, -75.55728972772394],
    popUp: "Hello, I am pop up 1"
  },
  {
    geocode: [6.2721, -75.5608],
    popUp: "Hello, I am pop up 2"
  }
];



export default function Map() {
  const position = [6.271356482023135, -75.55728972772394]
  const position2 = [6.2721, -75.5608]
  return (  <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

  <RoutingMachine />
     {/* <Marker icon={
                    new L.Icon({
                        iconUrl: 'pin.png',
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowSize: [41, 41],
                    })
                } position={position2}>
                     <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                
                <Marker icon={
                    new L.Icon({
                        iconUrl: 'pin.png',
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowSize: [41, 41],
                    })
                } position={position}>
                     <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
  </MapContainer>);
}
export {Map};