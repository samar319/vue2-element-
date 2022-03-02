import { _import } from '@/utils'
import Vue from 'vue'
import VueRouter from 'vue-router'
import baseRoutes from './base'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

/**
 * @type {import('vue-router').RouteConfig[]}
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: _import('dashboard/dashboard')
      },
      {
        path: '/demo',
        name: 'demo',
        component: _import('demo/demo')
      },
      {
        path: '/demo2',
        name: 'demo2',
        component: _import('demo/demo2')
      },
      {
        path: '/demo3',
        name: 'demo3',
        component: _import('demo/demo3')
      }
    ]
  },
  ...baseRoutes
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/**
 * 处理重复点击同一路由报错
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
