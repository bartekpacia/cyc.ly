import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { generateUUID } from '@/common/utils/generate-uuid';

import { Route } from '../api';

type ID = string;

interface RouteState extends Route {
  id: ID;
  isLiked?: boolean;
}
interface RoutesState {
  routes: RouteState[];
  pushRoute: (route: Route) => ID;
  getId: () => ID;
  deleteRoute: (id: ID) => void;
  regenerateRoute: (id: ID, route: Route) => void;
  likeRoute: (id: ID) => void;
  cleanup: () => void;
}

export const useRoutesStore = create<RoutesState>()(
  devtools(
    persist(
      (set, get) => ({
        routes: [],

        cleanup: () => {
          set(state => {
            // Filter liked items
            const likedItems = state.routes.filter(item => item.isLiked);

            const nonLikedItems = state.routes
              .sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
              })
              .filter(item => !item.isLiked)
              .slice(0, 5);

            // Combine liked items and the first 5 non-liked items
            const routes = likedItems.concat(nonLikedItems);

            return { routes };
          });
        },

        deleteRoute: (id: ID) => {
          set(state => ({
            routes: state.routes.filter(route => route.id !== id),
          }));
        },
        pushRoute: route => {
          const id = get().getId();

          set(state => ({ routes: [...state.routes, { ...route, id }] }));
          get().cleanup();
          return id;
        },

        regenerateRoute: (id: ID, route: Route) => {
          get().cleanup();
          set(state => ({
            routes: state.routes.map(r => {
              if (r.id === id) {
                return { ...route, id };
              }

              return r;
            }),
          }));
        },
        likeRoute: (id: ID) => {
          get().cleanup();
          set(state => ({
            routes: state.routes.map(r => {
              if (r.id === id) {
                return { ...r, isLiked: !r.isLiked };
              }

              return r;
            }),
          }));
        },
        getId: () => {
          return generateUUID();
        },
      }),
      {
        name: 'routes-storage',
      },
    ),
  ),
);
