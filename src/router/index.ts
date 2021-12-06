import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import listArea from '@/features/list-area/listArea.vue'
import ProfileArea from '@/features/profile-area/profileArea.vue'
import SearchArea from '@/features/search-area/searchArea.vue'
import Login from '@/features/login/login.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/search',
    name: 'search',
    component: SearchArea
  },
  {
    path: '/list/:id',
    name: 'default-list-content',
    component: listArea
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: ProfileArea
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
