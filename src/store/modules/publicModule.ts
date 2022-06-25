import API from '@api/api'
import { Commit, Module } from 'vuex'
import { IOUTBank, IULStuc, IURLQuantum } from '@/typings'
import { IBankState, RootState } from '../types/index'

const state: IBankState = {
  banks: [],
  hosips: [],
}

export const publicModule: Module<IBankState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    assignBanks(state, payload: IOUTBank[]) {
      state.banks = payload
      state.hosips = payload[0].hospitalInfo
    },
  },
  actions: {
    fetchBanks({ commit }: { commit: Commit }, payload: IULStuc) {
      API.banks(payload).then(
        (banks) => {
          commit('assignBanks', banks.data)
        },
        (err) => {
          console.log(err)
        }
      )
    },
    tSign({ commit }: { commit: Commit }, payload: IULStuc<IURLQuantum>) {
      API.creditSign(payload).then(
        (res) => {
          window.location.href = res.data.creditH5Url
        },
        (err) => {
          console.log(err)
        }
      )
    },
  },
}
