import API from '@api/api'
import { Commit, Module } from 'vuex'
import { IULStuc, IPageOUTBill, IINTBill } from '@/typings'
import { IBillState, RootState } from '../types'
import { PageSize } from '@/constant'

const state: IBillState = {
  bills: [],
  pageNum: 1,
  error: false,
  loading: false, // 数据是否加载中
  finished: false, // 是否为最后一页
  refreshing: false, // 下拉刷新是否进行中
  isEmpty: false, // 列表是否为空
}

export const billModule: Module<IBillState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    assignBill(state, payload: IPageOUTBill) {
      if (payload.data.length < 1) {
        state.isEmpty = true
        state.bills = []
        state.pageNum = 1
        state.loading = false
        state.finished = false
        state.refreshing = false
      } else {
        state.isEmpty = false
        state.bills = payload.data
        state.pageNum = payload.pageNum + 1
        state.loading = false
        state.finished = payload.lastPage ? true : false
        state.refreshing = false
      }
    },

    loadAssignBill(state, payload: IPageOUTBill) {
      if (payload.data.length < 1) {
        state.isEmpty = true
        state.bills = []
        state.pageNum = 1
        state.loading = false
        state.finished = false
        state.refreshing = false
      } else {
        state.isEmpty = false
        state.bills = state.bills.concat(payload.data)
        state.pageNum = payload.pageNum + 1
        state.loading = false
        state.finished = payload.lastPage ? true : false
        state.refreshing = false
      }
    },
  },
  actions: {
    loadBills({ commit }: { commit: Commit }, payload: IULStuc<IINTBill>) {
      payload.data.pageNum = state.pageNum ? state.pageNum : 1
      payload.data.pageSize = PageSize
      API.bills(payload).then(
        (res) => {
          commit('loadAssignBill', res.data)
        },
        (err) => {
          console.log(err)
        }
      )
    },
    fetchBills({ commit }: { commit: Commit }, payload: IULStuc<IINTBill>) {
      payload.data.pageNum = 1
      payload.data.pageSize = PageSize
      API.bills(payload).then(
        (res) => {
          commit('assignBill', res.data)
        },
        (err) => {
          console.log(err)
        }
      )
    },
  },
}
