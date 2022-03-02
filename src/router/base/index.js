import { _import } from '@/utils'

/**
 * @type {import('vue-router').RouteConfig[]}
 */
const paths = [
  {
    path: '/login',
    name: 'Login',
    component: _import('login/index')
  },
  {
    path: '/401',
    name: '401',
    component: _import('error/401')
  },
  {
    path: '/404',
    name: '404',
    component: _import('error/404')
  }
]

export default paths
