import Vue from 'vue'
import Router from 'vue-router'

import { financeRoutes } from '@/router/finance'
import { reviewRoutes } from '@/router/review'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/login/ChangePassword',
    component: () => import('@/views/login/ChangePassword'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        meta: { title: '账号设置', icon: 'setting' },
        component: () => import('@/views/home/index'),
        name: 'Home'
      },
      {
        path: 'home/edit2',
        hidden: true,
        meta: {
          activeMenu: '/home'
        },
        component: () => import('@/views/home/edit/index')
      }
    ]
  },
  {
    path: '/useSetting',
    component: Layout,
    redirect: '/useSetting',
    children: [
      {
        path: '/useSetting',
        meta: { title: '应用设置', icon: 'setting', },
        component: () => import('@/views/useSetting/index'),
        name: 'UseSetting'
      },
      {
        path: '/useSetting/edit2',
        hidden: true,
        alwaysShow: true,
        meta: {
          activeMenu: '/useSetting'
        },
        component: () => import('@/views/useSetting/edit/index')
      }
    ]
  },
  {
    path: '/advertising',
    component: Layout,
    redirect: '/advertising',
    children: [
      {
        path: '/advertising',
        meta: { title: '广告位设置', icon: 'setting' },
        component: () => import('@/views/advertising/index'),
        name: 'Advertising'
      },
      {
        path: '/advertising/edit2',
        hidden: true,
        alwaysShow: true,
        meta: {
          activeMenu: '/advertising'
        },
        component: () => import('@/views/advertising/edit/index')
      },
      {
        path: '/advertising/detail',
        hidden: true,
        alwaysShow: true,
        meta: {
          activeMenu: '/advertising'
        },
        component: () => import('@/views/advertising/detail/index')
      },
    ]
  },
  {
    path: '/creativeReview',
    component: Layout,
    meta: { title: '创意审核管理', icon: 'check' },
    redirect: '/creativeReview/taskexecution',
    children: [
      {
        path: '/creativeReview/taskexecution',
        meta: { title: '任务执行管理' },
        component: () => import('@/views/creativeReview/taskExecution/index')
      },
      {
        path: '/creativeReview/constructionManage',
        meta: { title: '送审管理' },
        component: () => import('@/views/creativeReview/constructionManage/index')
      },
      {
        path: '/creativeReview/edit',
        hidden: true,
        meta: { title: '送审管理编辑' },
        component: () => import('@/views/creativeReview/constructionManage/edit/index')
      },
      {
        path: '/creativeReview/resultpage',
        meta: { title: '送审结果查询' },
        component: () => import('@/views/creativeReview/resultPage/index')
      },
    ]
  },
  {
    path: '/advertisingRoot',
    component: Layout,
    redirect: '/advertisingRoot',
    children: [{
      path: '/advertisingRoot',
      meta: { title: '广告源设置', icon: 'setting' },
      component: () => import('@/views/advertisingRoot/index'),
      name: 'advertisingRoot'
    }]
  },
  {
    path: '/operation',
    component: Layout,
    redirect: '/operation',
    children: [
      {
      path: '/operation',
      meta: { title: '操作记录', icon: 'log' },
      component: () => import('@/views/operation/index'),
      name: 'operation'
    }]
  },
  {
    path: '/price',
    // hidden: true,
    component: Layout,
    redirect: '/price',
    children: [
      {
        path: '/price',
        meta: { title: 'Price设置', icon: 'setting' },
        component: () => import('@/views/price/index2'),
        name: 'price'
      }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  financeRoutes,
  reviewRoutes,
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
