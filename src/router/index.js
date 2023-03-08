import { createRouter, createWebHashHistory } from 'vue-router'
import Menu from '../views/Menu'

const routes = [
  {
    path: '/',
    name: 'menu',
    component: Menu
  },
  {
    path: '/description',
    name: 'description',
    component: () => import('../views/Description')
  },
  {
    path: '/instructions',
    name: 'instructions',
    component: () => import('../views/Instructions')
  },
  {
    path: '/audio',
    name: 'audio',
    component: () => import('../views/Audio')
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('../views/Video')
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('../views/Book')
  },
  {
    path: '/gift',
    name: 'page',
    component: () => import('../views/Gift')
  },
  // 
  {
    path: '/admin_1225',
    name: 'admin',
    component: () => import('../admin/Admin')
  },
  {
    path: '/admin_1225/gift_1',
    name: 'gift_1',
    component: () => import('../admin/gifts/AdminGift_1')
  },
  {
    path: '/admin_1225/gift_2',
    name: 'gift_2',
    component: () => import('../admin/gifts/AdminGift_2')
  },
  {
    path: '/admin_1225/create',
    name: 'create',
    component: () => import('../admin/AdminCreate')
  },
]

const pathname = process.env.NODE_ENV === 'production'
  ? window.location.pathname
  : process.env.BASE_URL

const router = createRouter({
  history: createWebHashHistory(pathname),
  routes
})

export default router
