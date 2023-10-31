import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: lazy(() => import('@/path-finder/views/LandingPage')),
  },
  {
    path: '/test',
    element: <div>dsds</div>,
  },
]);
