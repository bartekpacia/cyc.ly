import { useCallback, useEffect, useState } from 'react';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface UseGeoLocationOptions {
  onMount?: boolean;
}

type ID = number;

interface RoutesState {
  coords: GeolocationCoordinates | null;
  setCoords: (coords: GeolocationCoordinates) => void;
}

export const useCoordsStore = create<RoutesState>()(
  devtools(
    persist(
      set => ({
        coords: null,
        setCoords: coords => {
          set({ coords });
        },
      }),
      {
        name: 'coords-storage',
      },
    ),
  ),
);

export const useGeoLocation = ({ onMount }: UseGeoLocationOptions) => {
  const [coords, setCoords] = useCoordsStore(state => [state.coords, state.setCoords]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<GeolocationPositionError>();

  const successCallback: PositionCallback = useCallback(
    position => {
      setCoords(position.coords);
      setIsLoading(false);
    },
    [setCoords],
  );

  const errorCallback: PositionErrorCallback = useCallback(error => {
    setIsLoading(false);
    setError(error);
  }, []);

  const getGeoLocation = useCallback(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, [successCallback, errorCallback]);

  useEffect(() => {
    if (onMount) getGeoLocation();
  }, [getGeoLocation, onMount]);

  return { isLoading, coords, getGeoLocation, error };
};
