import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Route } from '../api';

interface RoutesState {
  routes: Route[];
  pushRoute: (route: Route) => void;
}

export const useRoutesStore = create<RoutesState>()(
  devtools(
    persist(
      set => ({
        routes: [],
        pushRoute: by => set(state => ({ routes: [...state.routes, by] })),
      }),
      {
        name: 'routes-storage',
      },
    ),
  ),
);
