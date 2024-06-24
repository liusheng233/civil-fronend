export default [
  {
    path: '/login',
    name: 'index',
    meta: {
      title: '首页-登录页',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/layout',
    name: 'layout',
    meta: {
      title: '首页',
    },
    component: () => import('@/views/index.vue'),
    // redirect: '/index-home',
    // children: [
    //
    // ],
  },
  {
    path: '/index-home',
    name: 'home',
    meta: {
      title: '首页-home',
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/index-flight',
    name: 'flight',
    meta: {
      title: '首页-flight',
    },
    component: () => import('@/views/flight/index.vue'),
  },
];
