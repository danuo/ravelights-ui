const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("src/pages/LoadingPage.vue"),
      },
      {
        path: "/bpm",
        component: () => import("src/pages/BpmPage.vue"),
      },
      {
        path: "/perform",
        component: () => import("src/pages/PerformPage.vue"),
      },
      {
        path: "/trigger",
        component: () => import("src/pages/TriggerPage.vue"),
      },
      {
        path: "/effect",
        component: () => import("src/pages/EffectPage.vue"),
      },
      {
        path: "/timeline",
        component: () => import("src/pages/TimelinePage.vue"),
      },
      {
        path: "/autopilot",
        component: () => import("src/pages/AutopilotPage.vue"),
      },
      {
        path: "/devices",
        component: () => import("src/pages/DevicesPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
