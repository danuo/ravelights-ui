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
        path: '/effects',
        component: () => import('src/pages/EffectPage.vue'),
      },
      {
        path: '/actions',
        component: () => import('src/pages/ActionsPage.vue'),
      },
      {
        path: '/bpm',
        component: () => import('src/pages/BPMPage.vue'),
      },
      {
        path: '/autopilot',
        component: () => import('src/pages/AutopilotPage.vue'),
      },
      {
        path: '/timelines',
        component: () => import('src/pages/TimelinesPage.vue'),
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
