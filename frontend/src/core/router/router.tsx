import { lazy } from 'react';
import { createBrowserRouter, createHashRouter } from 'react-router-dom';

import { routes } from '.';

export const router = createHashRouter([
  {
    path: routes.home(),
    Component: lazy(() => import('@/route-finder/views/LandingPage')),
  },
  {
    path: routes.generateRoute(),
    Component: lazy(() => import('@/route-finder/views/RoutefinderForm')),
  },
  {
    path: routes.preview(':id'),
    Component: lazy(() => import('@/route-finder/views/RoutePreview')),
  },
  {
    path: routes.routes(),
    Component: lazy(() => import('@/route-finder/views/RoutesList')),
  },
]);
