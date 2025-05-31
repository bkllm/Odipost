import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/',           name: 'Dashboard', component: () => import('@/views/Dashboard.vue') },
  { path: '/vehicles',   name: 'Vehicles',  component: () => import('@/views/Vehicles.vue') },
  { path: '/drivers',    name: 'Drivers',   component: () => import('@/views/Drivers.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router