const routes = [
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
        path: '/color',
        component: () => import('src/pages/ColorPage.vue'),
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
      {
        path: '/trigger',
        component: () => import('src/pages/TriggerPage.vue'),
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