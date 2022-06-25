import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import { localRead } from '@/utils'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  strict: true,
})

if (window.performance.navigation.type === 1 && localRead('token')) {
  store.commit('interModule/assignQuantum', JSON.parse(localRead('token')))
}

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
