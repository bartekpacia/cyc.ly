import { useMemo } from 'react';
import { Polygon, Polyline } from 'react-leaflet';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { Archive, Delete, Edit, Favorite, Restore } from '@mui/icons-material';
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
import { LatLngExpression } from 'leaflet';

import { CreateRouteBodyDTO, api } from '@/core/api';
import { routes as appRoutes } from '@/core/router';
import { useRoutesStore } from '@/core/store/routes.store';

import { Map } from '../components/Map/Map';
import { PathFinderLayout } from '../components/PathFinderLayout';
import { useGeoLocation } from '../utils/use-geo-location';

const PathPreviev = () => {
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

  if (!id || !route) return <Navigate to={appRoutes.generateRoute()} />;

  return (
    <PathFinderLayout>
      <Dialog open={isPending}>
        <CircularProgress />
      </Dialog>

      <Stack flex={1}>
        <Typography color='white'>Bike type: {route.bike_type}</Typography>{' '}
        <Typography color='white'>Distance: {route.distance}</Typography>{' '}
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
        </BottomNavigation>
      </Box>
    </PathFinderLayout>
  );
};

export default PathPreviev;
