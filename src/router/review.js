/**
 * @author Skylar Zhang <skylar.zhang@inmobi.com>
 * @description 审核模块路由
 */

import Layout from "@/layout/index";

export const reviewRoutes =  {
  path: '/check',
  component: Layout,
  meta: { roles: ['ROLE_VENUS_OPS'], title: '审核', icon: 'check' },
  redirect: '/check/accountLIst',
  children: [
    // {
    //   path: '/check',
    //   // meta: {  },
    //   component: () => import('@/views/check/index'),
    //   name: 'Check'
    // },
    {
      path: '/check/accountLIst',
      meta: { title: '账号审核' },
      component: () => import('@/views/check/accountLIst/index')
    },
    {
      path: '/check/advertisingList',
      meta: { title: '广告位审核' },
      component: () => import('@/views/check/advertisingList/index')
    },
    {
      path: '/check/accountEdit',
      hidden: true,
      alwaysShow: true,
      meta: {
        activeMenu: '/check'
      },
      component: () => import('@/views/check/accountEdit/index')
    },
    {
      path: '/check/advertisingEdit',
      hidden: true,
      alwaysShow: true,
      meta: {
        activeMenu: '/check'
      },
      component: () => import('@/views/check/advertisingEdit/index')
    }
  ]
}
