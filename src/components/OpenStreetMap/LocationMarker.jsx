import { useLocationContext } from 'context/location/location.provider';
import { useEffect, useMemo, useRef } from 'react';
import { Marker, Tooltip, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { ReactComponent as MarkerIcon } from 'assets/img/marker.svg';
import * as ReactDOMServer from 'react-dom/server';

export default function LocationMarker({ cityName }) {
  const { position, setPosition } = useLocationContext();

  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.flyTo(position?.coordinates);
  }, [position?.coordinates]);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition({ coordinates: marker.getLatLng() });
        }
      },
    }),
    [],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position?.coordinates}
      ref={markerRef}
      icon={L.divIcon({
        iconSize: new L.Point(50, 50),
        className: 'custom icon',
        html: ReactDOMServer.renderToString(<MarkerIcon />),
      })}
    >
      <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
        <div>{cityName}</div>
        <div>Latitude {position?.coordinates?.lat.toFixed(3)}</div>
        <div>Longtitude {position?.coordinates?.lng.toFixed(3)}</div>
      </Tooltip>
    </Marker>
  );
}
