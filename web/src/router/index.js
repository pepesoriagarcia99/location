import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const routes = [
  {
    path     : '/',
    redirect : '/tracking'
  },
  {
    path      : '/locations',
    name      : 'locations',
    component : () => import('@/views/Locations')
  },
  {
    path      : '/tracking',
    name      : 'tracking',
    component : () => import('@/views/StartTracking')
  },
  {
    path      : '/tracked',
    name      : 'Tracked',
    component : () => import('@/views/Tracked')
  }
];

const router = new VueRouter({
  mode : 'history',
  base : '/',
  routes
});

router.beforeEach((to, from, next) => {
  const hasTrack = (Vue.$cookies.get('trackingId'));

  if (to.name === 'tracking' && hasTrack) {
    next('/tracked');
  }
  else if (to.name === 'tracked' && !hasTrack) {
    next('/tracking');
  }

  next();
});

export default router;
