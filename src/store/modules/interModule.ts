import API from '@api/api'
import { Commit, Module } from 'vuex'
import {
  IUser,
  IULStuc,
  IContract,
  IURLParams,
  IURLQuantum,
  IToken,
} from '@/typings'

import { IContState, RootState } from '../types/index'

const state: IContState = {
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

export const interModule: Module<IContState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    assignSinStats(state, payload: IUser) {
      state.userInfo.signStatus = payload.signStatus
      state.userInfo.name = payload.name
    },
    assignQuantum(state, payload: IContract) {
      state.userInfo.name = payload.name
      state.userInfo.outCurrentCreditLimit = payload.outCurrentCreditLimit
      state.userInfo.hosCurrentCreditLimit = payload.hosCurrentCreditLimit
      state.userInfo.outCreditLimit = payload.outCreditLimit
      state.userInfo.firstYxf = payload.firstYxf
    },
  },
  actions: {
    fetchTokenConver({ commit }: { commit: Commit }, payload: IULStuc<IToken>) {
      return new Promise((resolve, reject) => {
        API.converToken(payload).then(
          (res) => {
            resolve(res.data)
            localStorage.setItem('authToken', payload.data.token)
          },
          (err) => {
            console.log(err)
          }
        )
      })
    },
    fetchSignStats(
      { commit }: { commit: Commit },
      payload: IULStuc<IURLParams>
    ) {
      return new Promise((resolve, inject) => {
        API.contractStatus(payload).then(
          (statu) => {
            commit('assignSinStats', statu.data)
            resolve(statu.data)
          },
          (err) => {
            console.log(err)
          }
        )
      })
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
            resolve(statu.data.creditUserId)
          },
          (err) => {
            reject(err)
          }
        )
      })
    },
  },
}
