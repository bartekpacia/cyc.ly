import { useCallback, useEffect, useState } from 'react';

export interface UseGeoLocationOptions {
  onMount?: boolean;
}

export const useGeoLocation = ({ onMount }: UseGeoLocationOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState<GeolocationCoordinates>();
  const [error, setError] = useState<GeolocationPositionError>();

  const successCallback: PositionCallback = position => {
    setCoords(position.coords);
    setIsLoading(false);
  };

  const errorCallback: PositionErrorCallback = error => {
    setIsLoading(false);
    setError(error);
  };

  const getGeoLocation = useCallback(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  useEffect(() => {
    if (onMount) getGeoLocation();
  }, [getGeoLocation, onMount]);

  return { isLoading, coords, getGeoLocation, error };
};
