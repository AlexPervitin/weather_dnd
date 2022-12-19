import { useLocationContext } from 'context/location/location.provider';
import { useEffect } from 'react';

const useGetGeoLocation = () => {
  const { position, setPosition } = useLocationContext();

  const onSuccess = (location) => {
    setPosition({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setPosition({
      loaded: true,
      coordinates: {
        lat: position.coordinates.lat,
        lng: position.coordinates.lng,
      },
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
};

export default useGetGeoLocation;
