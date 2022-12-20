import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocationContext } from 'context/location/location.provider';
import useGetGeoLocation from 'hooks/useGetGeoLocation.hook';
import { ActionButton } from 'pages/DragAndDrop/styles';
import LocationMarker from './LocationMarker';

export default function OpenStreetMap({ cityName }) {
  const { position, setPosition } = useLocationContext();
  const { onSuccess, onError } = useGetGeoLocation();
  const [click, setClick] = useState(false);

  function SetLocationMarker() {
    // eslint-disable-next-line no-unused-vars
    const map = useMapEvents({
      click(e) {
        setPosition({ coordinates: e.latlng });
      },
    });
    return null;
  }

  const handleGetPisiton = () => {
    setClick((prev) => !prev);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [click]);

  return (
    <>
      <ActionButton onClick={handleGetPisiton}>Get my position</ActionButton>
      <MapContainer
        center={position?.coordinates}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: '500px', width: '100%' }}
      >
        <SetLocationMarker />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker cityName={cityName} />
      </MapContainer>
    </>
  );
}
