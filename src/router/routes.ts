import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/perform',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/perform',
        component: () => import('src/pages/PerformPage.vue'),
      },
      {
        path: '/settings',
        component: () => import('src/pages/SettingsPage.vue'),
      },
      {
        path: '/autopilot',
        component: () => import('src/pages/AutopilotPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
