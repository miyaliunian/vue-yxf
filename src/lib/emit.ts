import store from '../store'
export const dispatch = (type: string, paylod: any) => {
  store.dispatch(type, paylod)
}
