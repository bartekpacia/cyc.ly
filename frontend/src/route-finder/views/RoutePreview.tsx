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
import { GarminBuilder, buildGPX } from 'gpx-builder';
import { LatLngExpression } from 'leaflet';

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
    return route?.points.map<LatLngExpression>(point => [point.lat, point.lon]) || [];
  }, [route]);

  const { mutateAsync: generateRoute, isPending } = useMutation({
    mutationFn: (data: CreateRouteBodyDTO) => api.routes.createRouteRoutesPost(data),
  });

  const exportRouteInGPX = async () => {
    const points = positions.map(point => new Point(point[0], point[1]));

    const gpxData = new GarminBuilder();
    gpxData.setSegmentPoints(points);

    alert(buildGPX(gpxData.toObject()));
  };

  if (!id || !route) return <Navigate to={appRoutes.generateRoute()} />;

  return (
    <PathFinderLayout>
      <Dialog open={isPending}>
        <CircularProgress />
      </Dialog>

      <Stack flex={1}>
        <Typography color='white'>Bike type: {route.bike_type}</Typography>{' '}
        <Typography color='white'>Distance: {Math.round(route.distance) / 1000} km</Typography>{' '}
        <Typography color='white'>
          Created at: {new Date(route.created_at).toLocaleString()}
        </Typography>
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
            sx={{
              svg: { fill: route.isLiked ? 'red' : 'white', transition: '300ms ease-in-out' },
            }}
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
