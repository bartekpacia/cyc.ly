// import { useEffect, useState } from 'react';
import { useEffect, useMemo } from 'react';
import { Controller, Form, SubmitHandler, useForm } from 'react-hook-form';
import { Marker } from 'react-leaflet';

// import { Marker } from 'react-leaflet';
import { zodResolver } from '@hookform/resolvers/zod';
import { TrackChanges } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';
import { Schema, z } from 'zod';

import { BikeType, CreateRouteBodyDTO, api } from '@/core/api';
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
  [RouteFinderFormField.Lon]: z.number().min(-180).max(180),
  [RouteFinderFormField.Lat]: z.number().min(-180).max(180),
  [RouteFinderFormField.BikeType]: z.nativeEnum(BikeType),
  [RouteFinderFormField.Distance]: z.number().min(0),
});

type SchemaType = z.infer<typeof schema>;

const RouteFinderForm = () => {
  const [pushRoute, routes] = useRoutesStore(state => [state.pushRoute, state.routes]);
  const { mutateAsync: generateRoute } = useMutation({
    mutationFn: (data: CreateRouteBodyDTO) => api.routes.createRouteRoutesPost(data),
  });
  const formProps = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'all',
  });

  const handleSubmit = formProps.handleSubmit(async values => {
    const newRoute = await generateRoute({
      ...values,
      start_point: {
        lat: values.lat,
        lon: values.lon,
      },
    });
    pushRoute(newRoute);
  });

  const { coords, getGeoLocation } = useGeoLocation({ onMount: true });

  const position = useMemo(
    () => ({ lat: coords?.latitude || 0, lng: coords?.longitude || 0 }),
    [coords],
  );

  useEffect(() => {
    formProps.reset({
      ...formProps.watch(),
      [RouteFinderFormField.Lat]: position.lat,
      [RouteFinderFormField.Lon]: position.lng,
    });
  }, [position, formProps]);

  console.log(routes);

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
            <Map center={position}>
              <Marker position={position} />
            </Map>
          </Box>

          <Stack direction='row' gap={3} alignItems='flex-end'>
            <TextField
              {...formProps.register(RouteFinderFormField.Lat)}
              disabled
              type='number'
              variant='outlined'
              label='Latidute'
              fullWidth
            />

            <TextField
              {...formProps.register(RouteFinderFormField.Lon)}
              disabled
              type='number'
              variant='outlined'
              label='Longtidue'
              fullWidth
            />

            <IconButton onClick={getGeoLocation}>
              <TrackChanges />
            </IconButton>
          </Stack>

          <FormControl>
            <InputLabel htmlFor='age-native-simple'>Type of your bike</InputLabel>
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

          <Stack direction='row' gap={3}>
            <TextField
              type='number'
              variant='outlined'
              label='Distance'
              {...formProps.register(RouteFinderFormField.Distance, { valueAsNumber: true })}
            />
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
