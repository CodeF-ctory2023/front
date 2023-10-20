import { useGlobalContext } from '@/context/Global';
import { MarkerType, MarkerTypes, ReducerActions } from '@/types';
import { DestinationLocation, UserLocation } from '@/types/Form';
import { useState } from 'react';

export const useServiceForm = () => {
  const { dispatch } = useGlobalContext();

  const [userLocation, setUserLocation] = useState<UserLocation>({
    locationCoords: [],
    locationName: '',
    showMarker: false,
    activeLocation: true,
    circleRadius: 100,
    showCircle: false,
    locationError: false,
  });
  const {
    locationCoords,
    locationName,
    showMarker,
    activeLocation,
    circleRadius,
    showCircle,
    locationError,
  } = userLocation;

  const [destinationLocation, setDestinationLocation] =
    useState<DestinationLocation>({
      destinationCoords: [],
      destinationName: '',
      destinationError: false,
    });
  const { destinationCoords, destinationName, destinationError } =
    destinationLocation;

  const updateLocation = (newLocation: object) => {
    setUserLocation((prevLocation) => ({
      ...prevLocation,
      ...newLocation,
    }));
  };

  const updateDestinationLocation = (newLocation: object) => {
    setDestinationLocation((prevLocation) => ({
      ...prevLocation,
      ...newLocation,
    }));
  };

  const addMarker = (marker: MarkerType) => {
    dispatch({ type: ReducerActions.ADD, payload: marker });
  };

  const removeMarker = (type: string) => {
    dispatch({ type: ReducerActions.REMOVE, payload: type });
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const resp = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
          );

          if (!resp.ok)
            throw new Error('No se pudo obtener la ubicación actual.');

          const data = await resp.json();

          const coords = [pos.coords.latitude, pos.coords.longitude];

          updateLocation({
            locationCoords: coords,
            locationName: data?.display_name,
            activeLocation: true,
          });

          if (showMarker) return;

          addMarker({
            id: crypto.randomUUID(),
            lat: pos.coords.latitude,
            long: pos.coords.longitude,
            icon: '/assets/img/icon/user.svg',
            type: MarkerTypes.USER,
          });

          updateLocation({ showMarker: true });
        } catch (error) {
          updateLocation({
            activeLocation: false,
            locationError: true,
          });
        }
      },
      () => updateLocation({ activeLocation: false })
    );
  };

  const getCoords = async (locationName: string) => {
    try {
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${locationName}`
      );

      if (!resp.ok) throw new Error('No se pudo obtener la ubicación destino.');

      const [data] = await resp.json();

      if (!data) return;

      const [lat, long] = [data?.lat, data?.lon];
      updateDestinationLocation({ destinationCoords: [lat, long] });

      removeMarker(MarkerTypes.DESTINATION);

      addMarker({
        id: crypto.randomUUID(),
        lat,
        long,
        icon: '/assets/img/icon/location-dest.svg',
        type: MarkerTypes.DESTINATION,
      });
    } catch (error) {
      updateDestinationLocation({
        destinationError: true,
      });
    }
  };

  const handleSearchLocation = () => {
    getCoords(destinationName.replace(' ', '+'));
  };

  const handleNearbyDrivers = () => {
    if (!locationCoords.length) return;

    updateLocation({ showCircle: !showCircle });

    dispatch({
      type: ReducerActions.SEARCH,
      payload: {
        showCircle: !showCircle,
        coords: locationCoords,
        radius: circleRadius,
      },
    });
  };

  const handleDestinationLocation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateDestinationLocation({ destinationName: e.target.value });
  };

  const handleCircleRadius = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLocation({ circleRadius: Number(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!locationCoords.length || !destinationCoords.length) return;

    // console.log('¡Envío exitoso!');
  };

  return {
    locationName,
    activeLocation,
    circleRadius,
    locationError,
    destinationName,
    destinationError,
    handleLocation,
    handleSearchLocation,
    handleNearbyDrivers,
    handleDestinationLocation,
    handleCircleRadius,
    handleSubmit,
  };
};
