export const BASE = '/cyc.ly';

export const routes = {
  home: () => `${BASE}/`,
  generateRoute: () => `${BASE}/generate-route`,
  preview: (id: string | number) => `${BASE}/preview/${id}`,
  routes: () => `${BASE}/routes`,
};
