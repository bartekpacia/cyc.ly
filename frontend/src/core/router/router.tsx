import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { routes } from '.';

export const router = createBrowserRouter([
  {
    path: routes.home(),
    Component: lazy(() => import('@/route-finder/views/LandingPage')),
  },
  {
    path: routes.generateRoute(),
    Component: lazy(() => import('@/route-finder/views/RoutefinderForm')),
  },
  {
    path: routes.preview(),
    Component: lazy(() => import('@/route-finder/views/RoutePreview')),
  },
]);
