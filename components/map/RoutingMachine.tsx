import L, { LatLng } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useState } from "react";
import { Stomp, Client } from "@stomp/stompjs";

const RoutingMachineLayer = ({ position, start, end, color }) => {

  const instance = L.Routing.control({
    position,
    waypoints: [
      start,
      end
    ],
    lineOptions: {
      styles: [
        { 
          color,
          weight: 4 
        }
      ]
    },
    createMarker: function (i: number, wp: { latLng: L.LatLngExpression; }, n: any) {
      if (i === 0) {
        // Icono personalizado para el origen y el destino
        return L.marker(wp.latLng, {
          icon: L.icon({
            iconUrl: 'pin.png',
            iconSize: [41, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
            shadowSize: [41, 41],
          }),
        });
      } else {
        // Icono predeterminado para los puntos intermedios
        return L.marker(end, {
          icon: L.icon({
            iconUrl: 'car.jpg',
            iconSize: [41, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
            shadowSize: [41, 41],
          }),
        });
      }
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  return instance;
};

const RoutingMachine = createControlComponent(RoutingMachineLayer);

export default RoutingMachine;
