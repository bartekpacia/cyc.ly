import { MapContainer, TileLayer } from 'react-leaflet';

import { Box, Stack } from '@mui/material';

import { Map } from '../components/Map/Map';
import { PathFinderLayout } from '../components/PathFinderLayout';

interface PathPrevievProps {}

const PathPreviev = () => {
  return (
    <PathFinderLayout>
      <Stack direction='row'>
        <Box sx={{ height: 500, width: 500 }}>
          <Map center={[52.22977, 21.01178]} />
        </Box>
      </Stack>
    </PathFinderLayout>
  );
};

export default PathPreviev;
