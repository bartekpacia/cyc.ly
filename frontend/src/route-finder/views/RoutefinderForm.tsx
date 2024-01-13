import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Marker } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { TrackChanges } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';
import { z } from 'zod';

import { BikeType, CreateRouteBodyDTO, api } from '@/core/api';
import { routes } from '@/core/router';
import { useRoutesStore } from '@/core/store/routes.store';

import { Map } from '../components/Map';
// import { Map } from '../components/Map/Map';
import { PathFinderLayout } from '../components/PathFinderLayout';
import { useGeoLocation } from '../utils/use-geo-location';

// interface PathfinderFormProps {}

enum RouteFinderFormField {
  Lon = 'lon',
  Lat = 'lat',
  Distance = 'distance',
  BikeType = 'bike_type',
}

const schema = z.object({
  [RouteFinderFormField.Lon]: z
    .number()
    .min(-180, 'Value must be larger than -180')
    .max(180, 'value must be less than 180'),
  [RouteFinderFormField.Lat]: z
    .number()
    .min(-360, 'Value must be larger than -360')
    .max(360, 'value must be less than 360'),
  [RouteFinderFormField.BikeType]: z.nativeEnum(BikeType),
  [RouteFinderFormField.Distance]: z.number().min(0),
});

type SchemaType = z.infer<typeof schema>;

const RouteFinderForm = () => {
  const navigate = useNavigate();
  const [pushRoute] = useRoutesStore(state => [state.pushRoute, state.routes]);
  const { mutateAsync: generateRoute } = useMutation({
    mutationFn: (data: CreateRouteBodyDTO) => api.routes.createRouteRoutesPost(data),
  });
  const [abort, setAbort] = useState(false);
  const formProps = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      [RouteFinderFormField.BikeType]: BikeType.Mountain,
      [RouteFinderFormField.Distance]: 10,
      [RouteFinderFormField.Lat]: 50.291,
      [RouteFinderFormField.Lon]: 18.6746,
    },
  });

  const handleSubmit = formProps.handleSubmit(async values => {
    const newRoute = await generateRoute({
      ...values,
      distance: values.distance * 1000,
      start_point: {
        lat: values.lat,
        lon: values.lon,
      },
    });
    const id = pushRoute({ ...newRoute });

    navigate(routes.preview(id.toString()));
  });

  const { coords, getGeoLocation } = useGeoLocation({ onMount: true });

  const position = useMemo(
    () => ({ lat: coords?.latitude || 0, lng: coords?.longitude || 0 }),
    [coords],
  );

  useEffect(() => {
    if (abort) return;
    formProps.reset({
      [RouteFinderFormField.Lat]: position.lat,
      [RouteFinderFormField.Lon]: position.lng,
    });
  }, [position, formProps, abort]);

  const markerPosition = useMemo(
    () => ({
      lat: formProps.watch(RouteFinderFormField.Lat) || 0,
      lng: formProps.watch(RouteFinderFormField.Lon) || 0,
    }),
    [formProps.watch(RouteFinderFormField.Lat), formProps.watch(RouteFinderFormField.Lon)],
  );

  return (
    <PathFinderLayout>
      <form onSubmit={handleSubmit}>
        <Stack sx={{ width: '100%', maxWidth: 500 }} gap={3} padding={3} margin='auto'>
          <Typography variant='h4' textAlign='center'>
            Generate Your track
          </Typography>
          <Typography variant='h6' textAlign='center'>
            Enter you basic requirements and wait for our system to generate you perfect route
          </Typography>
          <Box sx={{ width: '100%', height: 200 }}>
            <Map
              center={markerPosition}
              onClick={latlng => {
                formProps.setValue(RouteFinderFormField.Lat, latlng.lat);
                formProps.setValue(RouteFinderFormField.Lon, latlng.lng);
                setAbort(true);
              }}
            >
              <Marker position={markerPosition} />
            </Map>
          </Box>

          <Stack direction='row' gap={3} justifyContent='flex-start' alignItems='flex-start'>
            <Stack gap={2}>
              <TextField
                {...formProps.register(RouteFinderFormField.Lat, {
                  valueAsNumber: true,
                })}
                variant='outlined'
                label='Latidute'
                fullWidth
                disabled
              />
              <Typography color='error'>{formProps.formState.errors?.lat?.message} </Typography>
            </Stack>
            <Stack gap={2}>
              <TextField
                {...formProps.register(RouteFinderFormField.Lon, {
                  valueAsNumber: true,
                })}
                disabled
                variant='outlined'
                label='Longtidue'
                fullWidth
              />
              <Typography color='error'>{formProps.formState.errors?.lon?.message} </Typography>
            </Stack>

            <IconButton
              sx={{ alignSelf: 'center' }}
              data-cy='get-geolocation'
              onClick={() => {
                getGeoLocation(), setAbort(false);
              }}
            >
              <TrackChanges />
            </IconButton>
          </Stack>

          <FormControl>
            <InputLabel>Type of your bike</InputLabel>
            <Select
              label='Type of your bike'
              variant='outlined'
              {...formProps.register(RouteFinderFormField.BikeType)}
            >
              {Object.values(BikeType).map(type => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction='column' gap={3}>
            <TextField
              type='number'
              variant='outlined'
              label='Distance in km'
              {...formProps.register(RouteFinderFormField.Distance, {
                valueAsNumber: true,
              })}
            />
            <Typography color='error'>{formProps.formState.errors?.distance?.message} </Typography>
          </Stack>

          <Button type='submit' disabled={!formProps.formState.isValid} variant='contained'>
            Generate
          </Button>
        </Stack>
      </form>
    </PathFinderLayout>
  );
};

export default RouteFinderForm;
