import { useEffect, useState } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import { Marker } from 'react-leaflet';

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
import 'leaflet/dist/leaflet.css';
import { z } from 'zod';

import { Map } from '../components/Map/Map';
import { PathFinderLayout } from '../components/PathFinderLayout';
import { useGeoLocation } from '../utils/use-geo-location';

interface PathfinderFormProps {}

enum PathfinderFormField {
  Longitude = 'longitude',
  Latitude = 'latitude',
  Distance = 'distance',
  BikeType = 'bikeType',
}

const schema = z.object({
  [PathfinderFormField.Longitude]: z.number().min(-180).max(180),
  [PathfinderFormField.Latitude]: z.number().min(-180).max(180),
});

const PathfinderForm = () => {
  const formProps = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubmit = () => {};

  const { coords, getGeoLocation } = useGeoLocation({ onMount: true });

  const position = [coords?.latitude || 0, coords?.longitude || 0];

  return (
    <PathFinderLayout>
      <Form {...formProps} onSubmit={handleSubmit}>
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
            <Controller
              name={PathfinderFormField.Longitude}
              control={formProps.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled
                  type='number'
                  value={position[0]}
                  variant='outlined'
                  label='Latidute'
                  fullWidth
                />
              )}
            />

            <Controller
              name={PathfinderFormField.Latitude}
              control={formProps.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled
                  type='number'
                  value={position[1]}
                  variant='outlined'
                  label='Longtidue'
                  fullWidth
                />
              )}
            />

            <IconButton onClick={getGeoLocation}>
              <TrackChanges />
            </IconButton>
          </Stack>

          <Controller
            name={PathfinderFormField.BikeType}
            control={formProps.control}
            render={({ field }) => (
              <FormControl {...field}>
                <InputLabel htmlFor='age-native-simple'>Type of your bike</InputLabel>
                <Select label='Type of your bike' variant='outlined'>
                  <MenuItem value='1'>Mountain Bike</MenuItem>
                  <MenuItem value='2'>Race Bike</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Stack direction='row' gap={3}>
            <TextField type='number' variant='outlined' label='Distance' />
          </Stack>

          <Link href='/path-preview'>
            <Button variant='contained'>Generate</Button>
          </Link>
        </Stack>
      </Form>
    </PathFinderLayout>
  );
};

export default PathfinderForm;
