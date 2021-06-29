/**
 * @author Skylar Zhang <skylar.zhang@inmobi.com>
 * @description 财务模块路由
 */

import Layout from "@/layout/index";

export const financeRoutes = {
  path: '/finance',
  component: Layout,
  name: '',
  meta: { roles: ['ROLE_VENUS_FINANCE'] },
  children: [
    {
      path: '/finance',
      meta: { title: '财务', icon: 'manage' },
      component: () => import('@/views/finance/index'),
      name: 'finance'
    },
    {
      path: '/reconciliation',
      meta: { title: '对账详情' },
      component: () => import('@/views/finance/reconciliation/index'),
      name: 'reconciliation',
      hidden: true
    }
  ]
}
