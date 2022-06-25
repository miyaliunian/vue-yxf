import API from '@api/api'
import { Commit, Module } from 'vuex'
import { IULStuc, IINOrder, IPageOUTOrder } from '@/typings'
import { IOrderState, RootState } from '../types'
import { PageSize } from '@/constant'

const state: IOrderState = {
  order: [],
  pageNum: 1,
  error: false,
  loading: false, // 数据是否加载中
  finished: false, // 是否为最后一页
  refreshing: false, // 下拉刷新是否进行中
  isEmpty: false, // 列表是否为空
}

export const orderModule: Module<IOrderState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    assignOrder(state, payload: IPageOUTOrder) {
      if (payload.data.length < 1) {
        state.isEmpty = true
        state.order = []
        state.pageNum = 1
        state.loading = false
        state.finished = false
        state.refreshing = false
      } else {
        state.isEmpty = false
        state.order = payload.data
        state.pageNum = payload.pageNum + 1
        state.loading = false
        state.finished = payload.lastPage ? true : false
        state.refreshing = false
      }
    },

    loadAssignOrder(state, payload: IPageOUTOrder) {
      if (payload.data.length < 1) {
        state.isEmpty = true
        state.order = []
        state.pageNum = 1
        state.loading = false
        state.finished = false
        state.refreshing = false
      } else {
        state.isEmpty = false
        state.order = state.order.concat(payload.data)
        state.pageNum = payload.pageNum + 1
        state.loading = false
        state.finished = payload.lastPage ? true : false
        state.refreshing = false
      }
    },
  },
  actions: {
    loadOrder({ commit }: { commit: Commit }, payload: IULStuc<IINOrder>) {
      payload.data.pageNum = state.pageNum ? state.pageNum : 1
      payload.data.pageSize = PageSize
      API.order(payload).then(
        (res) => {
          commit('loadAssignOrder', res.data)
        },
        (err) => {
          console.log(err)
        }
      )
    },
    fetchOrder({ commit }: { commit: Commit }, payload: IULStuc<IINOrder>) {
      payload.data.pageNum = 1
      payload.data.pageSize = PageSize
      API.order(payload).then(
        (res) => {
          commit('assignOrder', res.data)
        },
        (err) => {
          console.log(err)
        }
      )
    },
  },
}
