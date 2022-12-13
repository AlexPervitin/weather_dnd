import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLocationContext } from 'context/location/location.provider';
import useGetGeoLocation from 'hooks/useGetGeoLocation';
import LocationMarker from './LocationMarker';

export default function OpenStreetMap({ cityName }) {
  const { position, setPosition } = useLocationContext();
  useGetGeoLocation();

  function SetLocationMarker() {
    // eslint-disable-next-line no-unused-vars
    const map = useMapEvents({
      click(e) {
        setPosition({ coordinates: e.latlng });
      },
    });
    return null;
  }

  return (
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
  );
}
