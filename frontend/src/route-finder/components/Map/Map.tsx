import { PropsWithChildren, useEffect, useState } from 'react';
import { MapContainer, MapContainerProps, Marker, TileLayer } from 'react-leaflet';

import { Box } from '@mui/material';
import { Map as MapType } from 'leaflet';

interface MapProps extends MapContainerProps {}

const tileLayer = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

const Map = ({ center, children, zoom, ...props }: PropsWithChildren<MapProps>) => {
  const [map, setMap] = useState<MapType | null>(null);

  useEffect(() => {
    map?.setView(center || [0, 0], zoom || 14);
  }, [center, zoom, map]);

  center = [50.2903914, 18.6801092];
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
