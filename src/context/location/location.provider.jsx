import { useContext, useMemo, useState } from 'react';
import LocationContext from './location.context';

function LocationProvider({ children }) {
  const [position, setPosition] = useState({
    coordinates: { lat: 50.430848, lng: 30.45573 },
  });
  const value = useMemo(
    () => ({
      position,
      setPosition,
    }),
    [position, setPosition],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;

export const useLocationContext = () => {
  const locationContext = useContext(LocationContext);
  if (!locationContext) {
    throw new Error(
      'useLocationContext must be used within a LocationProvider',
    );
  }
  return locationContext;
};
