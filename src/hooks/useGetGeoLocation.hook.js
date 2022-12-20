import { useLocationContext } from 'context/location/location.provider';

const useGetGeoLocation = () => {
  const { position, setPosition } = useLocationContext();

  const onSuccess = (location) => {
    setPosition({
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setPosition({
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

  return { onSuccess, onError };
};

export default useGetGeoLocation;
