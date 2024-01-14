import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { MapContainer, MapContainerProps, Marker, TileLayer } from 'react-leaflet';

import { Box } from '@mui/material';
import { LatLng, LatLngExpression, Map as MapType } from 'leaflet';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

interface MapProps extends MapContainerProps {
  onClick?: (latlng: LatLng) => void;
}

const tileLayer = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

const Map = ({ onClick, center, children, zoom, ...props }: PropsWithChildren<MapProps>) => {
  const [map, setMap] = useState<MapType | null>(null);

  useEffect(() => {
    map?.setView(center || [0, 0], zoom || 14);
  }, [center, zoom, map]);

  useEffect(() => {
    map?.on('click', e => {
      const latlng = map?.mouseEventToLatLng(e.originalEvent);
      onClick?.(latlng);
    });
  }, [map, onClick]);

  return (
    <Box sx={{ height: '100%', width: '100%', borderRadius: '10px' }}>
      <MapContainer
        id='map'
        style={{ height: '100%', width: '100%', borderRadius: '10px' }}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        attributionControl={false}
        // dragging={false}
        ref={setMap}
        tap={false}
        {...props}
      >
        <TileLayer {...tileLayer} />
        {center && <Marker position={center} />}
        {children}
      </MapContainer>
    </Box>
  );
};

export { Map };
