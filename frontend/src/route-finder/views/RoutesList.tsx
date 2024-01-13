import { Polyline } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, List, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import { routes as AppRoutes } from '@/core/router';
import { useRoutesStore } from '@/core/store/routes.store';

import { Map } from '../components/Map';
import { PathFinderLayout } from '../components/PathFinderLayout';

interface RoutesListProps {}

const RoutesList = () => {
  const { routes, deleteRoute } = useRoutesStore();

  const navigate = useNavigate();

  return (
    <PathFinderLayout>
      <Stack gap={3} sx={{ width: '100%' }} padding={2} maxWidth={800}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
          sx={theme => ({
            position: 'sticky',
            top: 0,
            background: theme.palette.background.default,
            zIndex: 1000,
          })}
        >
          <h1>Routes list</h1>
          <Button variant='outlined' onClick={() => navigate(AppRoutes.generateRoute())}>
            Generate More
          </Button>
        </Stack>

        <List sx={{ width: '100%' }}>
          <Stack gap={2}>
            {routes
              .filter(r => r.isLiked)
              .map(route => (
                <Card key={route.id} sx={{ width: '100%' }}>
                  <Stack padding={1}>
                    <CardContent>
                      <Typography color='white'>Bike type: {route.bike_type}</Typography>{' '}
                      <Typography color='white'>Distance: {route.distance}</Typography>{' '}
                      <Typography color='white'>
                        Created at: {new Date(route.created_at).toLocaleString()}
                      </Typography>
                    </CardContent>

                    <CardContent sx={{ height: 400, width: '100%' }}>
                      <Map zoom={13} center={[route.points[0].lat, route.points[0].lon]}>
                        <Polyline
                          pathOptions={{ color: 'purple' }}
                          positions={route.points.map(coords => [coords.lat, coords.lon])}
                        />
                      </Map>
                    </CardContent>
                    <CardActions>
                      <Stack direction='row' justifyContent='flex-end' width='100%' gap={2}>
                        <Button
                          color='error'
                          onClick={() => {
                            enqueueSnackbar('Removed route', { variant: 'success' });
                            deleteRoute(route.id);
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant='outlined'
                          onClick={() => navigate(AppRoutes.preview(route.id))}
                          size='small'
                        >
                          Select
                        </Button>
                      </Stack>
                    </CardActions>
                  </Stack>
                </Card>
              ))}
          </Stack>
        </List>
      </Stack>
    </PathFinderLayout>
  );
};

export default RoutesList;
