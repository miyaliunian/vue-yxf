import API from '@api/api'
import { IFirstYxfIN, IINUNSign, IULStuc } from '@/typings'
import { Commit, Module } from 'vuex'
import { ISetState, RootState } from '../types'
import { Toast } from 'vant'

const state: ISetState = {
  first: '',
}
export const setModule: Module<ISetState, RootState> = {
  namespaced: true,
  state,
  mutations: {},
  actions: {
    assignYxf({ commit }: { commit: Commit }, payload: IULStuc<IFirstYxfIN>) {
      API.setYxf(payload).then(
        () => {
          const token = JSON.parse(localStorage.getItem('token')!)
          token.firstYxf = payload.data.firstXyf
          localStorage.setItem('token', JSON.stringify(token))
          Toast.success('操作成功')
          commit('interModule/assignQuantum', token, { root: true })
        },
        (err) => {
          console.log(err)
        }
      )
    },
    unsign({ commit }: { commit: Commit }, payload: IULStuc<IINUNSign>) {
      return new Promise((resolve, reject) => {
        API.unCredit(payload).then(
          () => {
            Toast.success('操作成功')
            resolve('1')
          },
          () => {
            reject('0')
          }
        )
      })
    },
  },
}
