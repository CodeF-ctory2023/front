import { useState, useEffect, useRef } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';
import { useGlobalContext } from '@/context/Global';
import { MarkerType, MarkerTypes, ReducerActions } from '@/types';
import { useRouter } from 'next/router';

const carIcon = L.icon({
  iconUrl: '/assets/img/icon/car-white.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const userIcon = L.icon({
  iconUrl: '/assets/img/icon/user.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const MapRouting = () => {
  const [continueAnimation, setContinueAnimation] = useState(true);

  const [activeRoute, setActiveRoute] = useState(false);
  const [finishedRoute, setFinishedRoute] = useState(false);
  const [location, setLocation] = useState<number[]>([]);
  const [userId, setUserId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [userLocationName, setUserLocationName] = useState('');
  const { state, dispatch } = useGlobalContext();
  const { markers, services } = state;
  const markerRef = useRef<L.Marker>();
  const userMarkerRef = useRef<L.Marker>();
  const routingControlRef = useRef(null);

  const map = useMap();
  const router = useRouter();
  const { id } = router.query;

  const driverCoords =
    state.drivers.find((driver) => driver.id === id)?.coords || [];
  const [driverLocation, setDriverLocation] = useState<
    LatLngExpression | number[]
  >(driverCoords);

  const addMarker = (marker: MarkerType) => {
    dispatch({ type: ReducerActions.ADD, payload: marker });
  };

  const removeMarker = (id: string, type: string) => {
    dispatch({
      type: ReducerActions.REMOVE,
      payload: { id, type },
    });
  };

  useEffect(() => {
    if (services.length) setContinueAnimation(true);
    else setContinueAnimation(false);
  }, [services]);

  useEffect(() => {
    const userMarker = markers.find(
      (marker) => marker.type === MarkerTypes.USER
    );
    const driverMarker = markers.find(
      (marker) => marker.type === MarkerTypes.DRIVER
    );

    setActiveRoute(false);

    if (!userMarker) return;

    const currentService = services.find(
      (service) => service.serviceId === userMarker.id
    );

    if (!currentService?.activeService) return;

    setLocation([userMarker.lat, userMarker.long]);
    setActiveRoute(true);
    setUserId(userMarker.id);
    if (userMarker.name) setUserLocationName(userMarker.name);

    if (driverMarker?.id) setDriverId(driverMarker.id);
  }, [markers, services]);

  useEffect(() => {
    if (!activeRoute) return;

    if (id?.length)
      dispatch({
        type: ReducerActions.REMOVE,
        payload: { id: id.toString(), type: MarkerTypes.DRIVER },
      });

    const animateMarker = (
      coordinates: LatLngExpression[],
      instructions: object[],
      index: number
    ) => {
      if (!continueAnimation) {
        dispatch({
          type: ReducerActions.REMOVE,
          payload: { id: id?.toString(), type: MarkerTypes.DRIVER },
        });
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
          markerRef.current = undefined;
        }

        if (userMarkerRef.current) {
          map.removeLayer(userMarkerRef.current);
          userMarkerRef.current = undefined;
        }

        return;
      }

      if (index < coordinates.length && continueAnimation) {
        //aqui
        dispatch({
          type: ReducerActions.ADD_DRIVER_COORDS,
          payload: {
            id: id?.toString() || '',
            coords: [coordinates[index].lat, coordinates[index].lng],
          },
        });

        if (finishedRoute && !userMarkerRef.current) {
          removeMarker(userId, MarkerTypes.USER);
          userMarkerRef.current = L.marker(coordinates[index], {
            icon: userIcon,
          }).addTo(map);
        }

        if (!markerRef.current && continueAnimation) {
          markerRef.current = L.marker(coordinates[index], {
            icon: carIcon,
          }).addTo(map);
        } else {
          (markerRef.current as L.Marker).setLatLng(coordinates[index]);

          removeMarker(driverId, MarkerTypes.DRIVER);
          addMarker({
            id: driverId,
            lat: coordinates[index].lat,
            long: coordinates[index].lng,
            icon: '/assets/img/icon/car-white.svg',
            type: MarkerTypes.DRIVER,
          });

          if (finishedRoute) {
            (userMarkerRef.current as L.Marker).setLatLng(coordinates[index]);
            removeMarker(userId, MarkerTypes.USER);
            addMarker({
              id: userId,
              lat: coordinates[index].lat,
              long: coordinates[index].lng,
              icon: '/assets/img/icon/user.svg',
              type: MarkerTypes.USER,
              name: userLocationName,
            });
          }
        }

        setTimeout(() => {
          animateMarker(coordinates, instructions, index + 1);
        }, 150);
      } else {
        setActiveRoute(false);
        setFinishedRoute(true);
      }
    };

    const waypoints = [
      L.latLng(driverLocation[0], driverLocation[1]),
      L.latLng(location[0], location[1]),
    ];

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }

    //@ts-expect-error desc
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

    routingControlRef.current = routingControl;

    routingControl.on(
      'routesfound',
      (e: {
        routes: { coordinates: LatLngExpression[]; instructions: object[] }[];
      }) => {
        const coordinates = e.routes[0].coordinates;
        const instructions = e.routes[0].instructions;
        animateMarker(coordinates, instructions, 0);
      }
    );
  }, [activeRoute, continueAnimation]);

  useEffect(() => {
    if (finishedRoute) {
      const destinationMarker = markers.find(
        (marker) => marker.type === MarkerTypes.DESTINATION
      );

      if (destinationMarker) {
        setDriverLocation([location[0], location[1]]);
        setLocation([destinationMarker.lat, destinationMarker.long]);
        setActiveRoute(true);
      }
    }
  }, [finishedRoute, markers]);

  return null;
};
