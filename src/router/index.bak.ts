import { createRouter, createWebHistory } from 'vue-router'
import { start, close } from '@utils/nprogress'
import store from '@/store'
import utils, { localRead, navWarrent } from '@/utils'
import { IAuthor, IToken } from '@/typings'
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
  start()
  if (navWarrent(to, from)) {
    const tokenParmas = utils.urlParser<IToken>()
    store
      .dispatch('warrentModule/fetchAuthorization', {
        data: { ...tokenParmas },
      })
      .then((res: IAuthor) => {
        if (res.authorization === '0') {
          next({
            name: 'warrant',
            query: { ...tokenParmas },
          })
          return
        } else {
          next()
          return
        }
      })
  } else {
    next()
  }

  // if (window.performance.navigation.type === 1) {
  //   localStorage.getItem('token')
  //     ? store.commit(
  //         'interModule/assignQuantum',
  //         JSON.parse(localStorage.getItem('token')!)
  //       )
  //     : ''
  //   next()
  // } else {
  //   next()
  //   return
  // }
})

router.afterEach(() => {
  close()
  window.scrollTo(0, 0)
})

export default router
