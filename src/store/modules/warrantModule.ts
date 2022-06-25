import { IToken, IULStuc } from '@/typings'
import API from '@api/api'
import { Commit, Module } from 'vuex'
import { IWarrentState, RootState } from '../types'

const state: IWarrentState = {
  authorization: '',
}
export const warrentModule: Module<IWarrentState, RootState> = {
  namespaced: true,
  state,
  actions: {
    fetchAuthorization(
      { commit }: { commit: Commit },
      payload: IULStuc<IToken>
    ) {
      return new Promise((resolve, inject) => {
        API.authorization(payload).then(
          (res) => {
            resolve(res.data)
          },
          (err) => {
            console.log(err)
          }
        )
      })
    },
    saveAuthorization(
      { commit }: { commit: Commit },
      payload: IULStuc<IToken>
    ) {
      return new Promise((resolve, inject) => {
        API.saveAuthorization(payload).then(
          (res) => {
            resolve('1')
          },
          (err) => {
            console.log(err)
          }
        )
      })
    },
  },
}
