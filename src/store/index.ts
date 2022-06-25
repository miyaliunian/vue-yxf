import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { interModule } from './modules/interModule'
import { cardModule } from './modules/cardModule'
import { orderModule } from './modules/orderModule'
import { billModule } from './modules/billModule'
import { familyModule } from './modules/familyModule'
import { publicModule } from './modules/publicModule'
import { warrentModule } from './modules/warrantModule'
import { setModule } from './modules/setModule'
import { IGlobalState, RootState } from './types'

export const key: InjectionKey<Store<IGlobalState>> = Symbol()

const state: RootState = {
  errorState: false,
  errPlaceHolder: '',
  loading: false,
}
export default createStore<RootState>({
  state,
  mutations: {
    showOverlayLoading(state, payload) {
      state.errorState = payload.errorState
      state.errPlaceHolder = payload.errPlaceHolder
    },
    showLoading(state, payload) {
      state.loading = payload.loading
    },
  },
  actions: {
    setOverlay({ commit }, params: RootState) {
      commit('showOverlayLoading', params)
    },
    setLoading({ commit }, params: RootState) {
      commit('showLoading', params)
    },
  },
  modules: {
    warrentModule,
    interModule,
    cardModule,
    orderModule,
    familyModule,
    billModule,
    publicModule,
    setModule,
  },
})

export function useStore() {
  return baseUseStore(key)
}
