import API from '@api/api'
import { IULStuc, IURLParams, IURLQuantum, IUser } from '@/typings'
import { Commit, Module } from 'vuex'
import { IPendingState, RootState } from '../types'

const state: IPendingState = {
  userInfo: {
    creditUserId: '',
    name: '',
    idno: '',
    idType: '',
    signStatus: '',
    outCurrentCreditLimit: '',
    hosCurrentCreditLimit: '',
    outCreditLimit: '',
    firstYxf: '',
  },
}

export const signStausModule: Module<IPendingState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    assignSinStats(state, payload: IUser) {
      state.userInfo.signStatus = payload.signStatus
      state.userInfo.name = payload.name
    },
    assignQuantum(state, payload) {
      state.userInfo.name = payload.name
      state.userInfo.outCurrentCreditLimit = payload.outCurrentCreditLimit
      state.userInfo.hosCurrentCreditLimit = payload.hosCurrentCreditLimit
      state.userInfo.outCreditLimit = payload.outCreditLimit
      state.userInfo.firstYxf = payload.firstYxf
    },
  },
  actions: {
    fetchSignStats(
      { commit }: { commit: Commit },
      payload: IULStuc<IURLParams>
    ) {
      API.contractStatus(payload).then(
        (statu) => {
          commit('assignSinStats', statu.data)
        },
        (err) => {
          console.log(err)
        }
      )
    },
    fetchContractInfo(
      { commit }: { commit: Commit },
      payload: IULStuc<IURLQuantum>
    ) {
      return new Promise((resolve, reject) => {
        API.contractInfo(payload).then(
          (statu) => {
            commit('assignQuantum', statu.data)
            localStorage.setItem('token', JSON.stringify(statu.data))
            resolve('成功')
          },
          (err) => {
            reject(err)
          }
        )
      })
    },
  },
}
