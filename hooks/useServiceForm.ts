import { useGlobalContext } from '@/context/Global';
import { Service, MarkerType, MarkerTypes, ReducerActions } from '@/types';
import { UserLocation } from '@/types/Form';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export const useServiceForm = () => {
  const { state, dispatch } = useGlobalContext();
  const router = useRouter();

  const [service, setService] = useState<Service>({
    serviceId: '',
    locationName: '',
    destinationName: '',
    activeService: false,
  });

  const [userLocation, setUserLocation] = useState<UserLocation>({
    locationCoords: [],
    locationName: '',
    destinationName: 'Universidad de Antioquia',
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

  // const [destinationLocation, setDestinationLocation] =
  //   useState<DestinationLocation>({
  //     destinationCoords: [],
  //     destinationName: '',
  //     destinationError: false,
  //   });
  // const { destinationCoords, destinationName, destinationError } =
  //   destinationLocation;

  const updateLocation = (newLocation: object) => {
    setUserLocation((prevLocation) => ({
      ...prevLocation,
      ...newLocation,
    }));
  };

  const updateService = (currentService: object) => {
    setService((prevService) => ({
      ...prevService,
      ...currentService,
    }));
  };

  // const updateDestinationLocation = (newLocation: object) => {
  //   setDestinationLocation((prevLocation) => ({
  //     ...prevLocation,
  //     ...newLocation,
  //   }));
  // };

  const addMarker = (marker: MarkerType) => {
    dispatch({ type: ReducerActions.ADD, payload: marker });
  };

  const addService = (service: Service) => {
    dispatch({ type: ReducerActions.ADD_SERVICE, payload: service });
  };

  // const removeMarker = (type: string) => {
  //   dispatch({ type: ReducerActions.REMOVE, payload: type });
  // };

  const handleLocation = () => {
    if (userLocation.showMarker) return;

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
            locationError: false,
          });

          if (showMarker) return;

          const id = crypto.randomUUID();

          addMarker({
            id,
            lat: pos.coords.latitude,
            long: pos.coords.longitude,
            icon: '/assets/img/icon/user.svg',
            type: MarkerTypes.USER,
            name: data?.display_name,
          });

          addMarker({
            id,
            lat: 6.267385,
            long: -75.567318,
            icon: '/assets/img/icon/location-dest.svg',
            type: MarkerTypes.DESTINATION,
            name: 'Universidad de Antioquia',
          });

          updateLocation({ showMarker: true });

          updateService({
            serviceId: id,
            locationName: data?.display_name,
            destinationName: 'Universidad de Antioquia',
          });
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

  // const getCoords = async (locationName: string) => {
  //   try {
  //     const resp = await fetch(
  //       `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${locationName}`
  //     );

  //     if (!resp.ok) throw new Error('No se pudo obtener la ubicación destino.');

  //     const [data] = await resp.json();

  //     if (!data) return;

  //     const [lat, long] = [data?.lat, data?.lon];
  //     updateDestinationLocation({ destinationCoords: [lat, long] });

  //     removeMarker(MarkerTypes.DESTINATION);

  //     addMarker({
  //       id: crypto.randomUUID(),
  //       lat,
  //       long,
  //       icon: '/assets/img/icon/location-dest.svg',
  //       type: MarkerTypes.DESTINATION,
  //     });
  //   } catch (error) {
  //     updateDestinationLocation({
  //       destinationError: true,
  //     });
  //   }
  // };

  // const handleSearchLocation = () => {
  //   getCoords(destinationName.replace(' ', '+'));
  // };

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

  // const handleDestinationLocation = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   updateDestinationLocation({ destinationName: e.target.value });
  // };

  const handleCircleRadius = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLocation({ circleRadius: Number(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if (!locationCoords.length || !destinationCoords.length) return;
    if (!locationCoords.length) {
      updateLocation({ locationError: true });
      return;
    }

    // updateService({ activeService: true });
    const activeService = state.services.find(
      (serv) => serv.serviceId === service.serviceId
    );

    if (!activeService) {
      addService(service);
    }

    router.replace('drivers/01');
    // console.log('¡Envío exitoso!');
  };

  // useEffect(() => {
  //   addService(service);
  // }, [service]);

  useEffect(() => {
    const { markers, services } = state;
    const userMarker = markers.find((marker) => marker.type == 'user');
    const currentService = services[0];

    if (!markers.length || !userMarker) return;

    // if (!userMarker) return;

    updateLocation({
      locationName: userMarker.name,
      locationCoords: [userMarker.lat, userMarker.long],
      showMarker: true,
      activeLocation: true,
      circleRadius: 100,
      showCircle: false,
      locationError: false,
    });

    if (!services.length || !currentService) return;

    updateService({
      locationName: currentService.locationName,
      destinationName: currentService.destinationName,
      serviceId: currentService.serviceId,
      activeService: currentService.activeService,
    });
  }, []);

  return {
    locationName,
    activeLocation,
    circleRadius,
    locationError,
    // destinationName,
    // destinationError,
    handleLocation,
    // handleSearchLocation,
    handleNearbyDrivers,
    // handleDestinationLocation,
    handleCircleRadius,
    handleSubmit,
  };
};
