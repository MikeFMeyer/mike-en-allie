import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Invite from '../views/Invite.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/invite',
      name: 'invite',
      component: Invite
    }
  ]
})

export default router
