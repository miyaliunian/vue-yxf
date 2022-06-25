import API from '@api/api'
import { Commit, Dispatch, Module } from 'vuex'
import {
  IULStuc,
  IINFamily,
  IADDFamily,
  IREMOVEFamily,
  IOUTFamilies,
} from '@/typings'
import { IFamilyPara, IFamilyState, RootState } from '../types'

const state: IFamilyState = {
  placeHolder: false,
  families: [],
  familyLimit: '0',
  familSize: '0',
  creditUserId: '',
}

export const familyModule: Module<IFamilyState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    assignParams(state, payload: IFamilyPara) {
      state.creditUserId = payload.creditUserId
    },
    assignFamilies(state, payload: IOUTFamilies) {
      state.families = payload.familyList
      state.placeHolder = payload.familyList.length === 0 ? true : false
      state.familSize = payload.familySize
      state.familyLimit = payload.familyLimit
    },
  },
  actions: {
    fetchFamilies({ commit }: { commit: Commit }, payload: IULStuc<IINFamily>) {
      commit('assignParams', payload.data)
      API.family(payload).then(
        (res) => {
          commit('assignFamilies', res.data)
        },
        (err) => {
          console.log(err)
        }
      )
    },
    addFamilie(
      { state, dispatch }: { state: IFamilyState; dispatch: Dispatch },
      payload: IULStuc<IADDFamily>
    ) {
      return new Promise((resolve, reject) => {
        API.familyADD(payload).then(
          () => {
            dispatch('fetchFamilies', {
              data: {
                creditUserId: state.creditUserId,
              },
            })
            resolve('1')
          },
          (err) => {
            console.log(err)
          }
        )
      })
    },
    removeFamilies(
      { state, dispatch }: { state: IFamilyState; dispatch: Dispatch },
      payload: IULStuc<IREMOVEFamily>
    ) {
      API.familyRemove(payload).then(
        () => {
          dispatch('fetchFamilies', {
            data: {
              creditUserId: state.creditUserId,
            },
          })
        },
        (err) => {
          console.log(err)
        }
      )
    },
  },
}
