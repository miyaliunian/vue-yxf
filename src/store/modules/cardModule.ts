import API from '@api/api'
import { Commit, Module } from 'vuex'
import { IULStuc, IPageOUTBill, IINTBill, IURLQuantum } from '@/typings'
import { ICardState, RootState } from '../types'
import { PageSize } from '@/constant'
import { Toast } from 'vant'

const state: ICardState = {
  targetUrl: '',
}

export const cardModule: Module<ICardState, RootState> = {
  namespaced: true,
  state,
  actions: {
    fetchTarURL({ commit }: { commit: Commit }, payload: IULStuc<IURLQuantum>) {
      API.checkBill(payload).then(
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
