import { useMemo } from 'react';
import { Polygon, Polyline } from 'react-leaflet';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { Archive, Delete, Edit, Favorite, ImportExport, Restore } from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  CircularProgress,
  Dialog,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { saveAs } from 'file-saver';
import { GarminBuilder, buildGPX } from 'gpx-builder';
import { LatLng, LatLngExpression } from 'leaflet';

import { CreateRouteBodyDTO, api } from '@/core/api';
import { routes as appRoutes } from '@/core/router';
import { useRoutesStore } from '@/core/store/routes.store';

import { Map } from '../components/Map/Map';
import { PathFinderLayout } from '../components/PathFinderLayout';
import { useGeoLocation } from '../utils/use-geo-location';

const { Point } = GarminBuilder.MODELS;

const PathPreview = () => {
  const { id } = useParams<{ id: string }>();
  const { routes, pushRoute, deleteRoute, likeRoute } = useRoutesStore();
  const { coords } = useGeoLocation({ onMount: true });

  const navigate = useNavigate();

  const route = useMemo(() => routes.find(route => route?.id?.toString() === id), [routes, id]);

  const position = useMemo(
    () => ({ lat: coords?.latitude || 0, lng: coords?.longitude || 0 }),
    [coords],
  );

  const positions = useMemo(() => {
    return route?.points.map<LatLng>(point => new LatLng(point.lat, point.lon)) || [];
  }, [route]);

  const { mutateAsync: generateRoute, isPending } = useMutation({
    mutationFn: (data: CreateRouteBodyDTO) => api.routes.createRouteRoutesPost(data),
  });

  const exportRouteInGPX = () => {
    const points = positions.map(point => new Point(point.lat, point.lng));

    const gpxData = new GarminBuilder();
    gpxData.setSegmentPoints(points);

    const gpx = buildGPX(gpxData.toObject());

    const blob = new Blob([gpx], { type: 'application/gpx;charset=utf-8' });
    saveAs(blob, 'cycly-route.gpx');
  };

  if (!id || !route) return <Typography>Route not found</Typography>;

  return (
    <PathFinderLayout>
      <Dialog open={isPending}>
        <Stack padding={4} display='flex' alignItems='center' gap={3}>
          <CircularProgress />
          <Typography variant='h6'>Generating route...</Typography>
        </Stack>
      </Dialog>

      <Stack flex={1} position='relative'>
        <Paper sx={{ position: 'absolute', zIndex: 1000, right: 5, top: 5, padding: 2 }}>
          <Typography color='white'>Bike type: {route.bike_type}</Typography>{' '}
          <Typography color='white' data-cy='distance'>
            Distance: {Math.round(route.distance) / 1000} km
          </Typography>{' '}
          <Typography color='white'>
            Created at: {new Date(route.created_at).toLocaleString()}
          </Typography>
        </Paper>

        <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: 0, right: '100%' }}></Box>
          <Map center={position}>
            <Polyline pathOptions={{ color: 'purple' }} positions={positions} />
          </Map>
        </Box>
      </Stack>
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation showLabels sx={{ padding: 2 }}>
          <BottomNavigationAction
            onClick={async () => {
              if (!route?.points[0]) return;

              const newRoute = await generateRoute({
                distance: route?.distance,
                bike_type: route?.bike_type,
                start_point: route?.points[0],
              });

              const newId = pushRoute(newRoute);

              navigate(appRoutes.preview(newId));
            }}
            label='Regenerate'
            icon={<Restore />}
          />

          <BottomNavigationAction
            sx={{
              svg: { fill: route.isLiked ? 'red' : 'white', transition: '300ms ease-in-out' },
            }}
            onClick={() => likeRoute(id)}
            label='Like'
            icon={<Favorite />}
          />

          <BottomNavigationAction
            sx={{ svg: { fill: 'white' } }}
            onClick={exportRouteInGPX}
            label='GPX Export'
            icon={<ImportExport />}
          />
        </BottomNavigation>
      </Box>
    </PathFinderLayout>
  );
};

export default PathPreview;
