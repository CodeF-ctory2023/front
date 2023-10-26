import { useState, useEffect, useRef } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';
import { useGlobalContext } from '@/context/Global';
import { ReducerActions } from '@/types';
import { useRouter } from 'next/router';

const carIcon = L.icon({
  iconUrl: '/assets/img/icon/car.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const MapRouting = () => {
  const [activeRoute, setActiveRoute] = useState(false);
  const [finishedRoute, setFinishedRoute] = useState(false);
  const [location, setLocation] = useState<number[]>([]);
  // const [driverLocation, setDriverLocation] = useState<number[]>([
  //   6.279685, -75.55757,
  // ]);
  const [driverLocation, setDriverLocation] = useState<number[]>([
    6.309716, -75.571136,
  ]);
  const { state, dispatch } = useGlobalContext();
  const { markers, services } = state;
  const markerRef = useRef<L.Marker>();
  const routingControlRef = useRef(null);

  const map = useMap();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const userMarker = markers.find((marker) => marker.type === 'user');

    if (!userMarker) return;

    const currentService = services.find(
      (service) => service.serviceId === userMarker.id
    );
    // console.log(currentService);

    if (!currentService.activeService) return;

    setLocation([userMarker.lat, userMarker.long]);
    setActiveRoute(true);
  }, [markers, services]);

  useEffect(() => {
    if (!activeRoute) return;

    if (id?.length)
      dispatch({ type: ReducerActions.REMOVE, payload: id.toString() });

    const waypoints = [
      // L.latLng(6.279685, -75.55757),
      L.latLng(driverLocation[0], driverLocation[1]),
      L.latLng(location[0], location[1]),
    ];

    // const changeIcon = (direction: string) => {
    //   console.log(direction);

    //   const carIcon = L.icon({
    //     iconUrl: `/assets/img/icon/car${direction}.svg`,
    //     iconSize: [32, 32],
    //     iconAnchor: [16, 32],
    //   });
    //   return carIcon;
    // };

    const animateMarker = (
      coordinates: LatLngExpression[],
      instructions: object[],
      index: number
    ) => {
      if (index < coordinates.length) {
        if (!markerRef.current) {
          markerRef.current = L.marker(coordinates[index], {
            icon: carIcon,
          }).addTo(map);
        } else {
          (markerRef.current as L.Marker).setLatLng(coordinates[index]);
        }

        setTimeout(() => {
          animateMarker(coordinates, instructions, index + 1);
        }, 40);
      } else {
        setActiveRoute(false); // La ruta actual ha terminado
        setFinishedRoute(true); // Iniciar la siguiente ruta
      }
    };

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;

      // const user = markers.find((marker) => marker.type === 'user');
      // if (user) dispatch({ type: ReducerActions.REMOVE, payload: user?.id });
    }

    const routingControl = L.Routing.control({
      waypoints,
      routeWhileDragging: true,
      fitSelectedRoutes: true,
      draggableWaypoints: true,
      addWaypoints: false,
      createMarker: () => null,
      lineOptions: {
        styles: [
          {
            color: 'blue',
            weight: 5,
          },
        ],
      },
    }).addTo(map);

    // Guardar la referencia al control de enrutamiento actual
    routingControlRef.current = routingControl;

    routingControl.on(
      'routesfound',
      (e: {
        routes: { coordinates: LatLngExpression[]; instructions: object[] }[];
      }) => {
        // console.log(e.routes[0].instructions);

        const coordinates = e.routes[0].coordinates;
        const instructions = e.routes[0].instructions;
        animateMarker(coordinates, instructions, 0);
      }
    );

    // setActiveRoute(false);
  }, [activeRoute]);

  useEffect(() => {
    if (finishedRoute) {
      const destinationMarker = markers.find(
        (marker) => marker.type === 'destination'
      );

      if (destinationMarker) {
        setDriverLocation([location[0], location[1]]);
        setLocation([destinationMarker.lat, destinationMarker.long]);
        setActiveRoute(true); // Iniciar la siguiente ruta
        // setUserRoute(false);
      }
    }
  }, [finishedRoute, markers]);

  return null;
};
