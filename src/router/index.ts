// import { createRouter, createWebHistory } from 'vue-router/auto';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'index',
    meta: {
      title: '首页-登录页',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'layout',
    meta: {
      title: '首页',
    },
    component: () => import('@/views/index.vue'),
    redirect: '/index-home',
    children: [
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
      {
        path: '/index-articles-detail',
        name: 'articles-detail',
        meta: {
          title: '文章详情',
        },
        component: () => import('@/views/articleDetails/index.vue'),
      },
      {
        path: '/index-articles-list',
        name: 'articles-list',
        meta: {
          title: '文章列表',
        },
        component: () => import('@/views/articleList/index.vue'),
      },
    ],
  },
];
//导入生成的路由数据
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
