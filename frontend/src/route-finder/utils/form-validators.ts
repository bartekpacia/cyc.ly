import { z } from 'zod';

import { FormField } from '../models/enums/FormField';

export const coordinate = z.number().min(-180).max(180);

coordinate.optional();


const schema = {
    [FormField.Longitude]: z.number().min(-180).max(180).optional(),
    [FormField.Latitude]: z.number().min(-90).max(90).optional(),
    [FormField.Distance]: z.number().min(0).optional(),
    [FormField.BikeType]: z.string().optional(),
  };

  const defaultValues = {
    [FormField.Longitude]: 0,
    [FormField.Latitude]: 0,
    [FormField.Distance]: 0,
    [FormField.BikeType]: '',
  };

export const getDefaultVal = () => {


  return { schema, defaultValues };
};
