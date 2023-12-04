import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: lazy(() => import('@/path-finder/views/LandingPage')),
  },
  {
    path: '/generate-path',
    Component: lazy(() => import('@/path-finder/views/PathfinderForm')),
  },
  {
    path: '/path-preview',
    Component: lazy(() => import('@/path-finder/views/PathPreview')),
  },
]);
