import { useEffect, useState } from 'react';
import { MapContainer, MapContainerProps, Marker, TileLayer } from 'react-leaflet';

import { Box } from '@mui/material';
import { Map as MapType } from 'leaflet';

interface MapProps extends MapContainerProps {}

const tileLayer = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

const Map = ({ center, zoom, ...props }: MapProps) => {
  const [map, setMap] = useState<MapType | null>(null);

  useEffect(() => {
    map?.setView(center || [0, 0], zoom || 14);
  }, [center, zoom, map]);

  return (
    <Box sx={{ height: '100%', width: '100%', borderRadius: '10px' }}>
      <MapContainer
        id='map'
        style={{ height: '100%', width: '100%', borderRadius: '10px' }}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        attributionControl={false}
        ref={setMap}
        {...props}
      >
        <TileLayer {...tileLayer} />
        {center && <Marker position={center} />}
      </MapContainer>
    </Box>
  );
};

export { Map };
