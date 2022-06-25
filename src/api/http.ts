import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { showMessage } from './error-code-type'
import { IResponse } from '../typings'
import { IParaWra } from '@constant/index'
import { start, close } from '@utils/nprogress'
import { Toast } from 'vant'
import config from '@/config'
import { dispatch } from '@/lib/emit'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_PREFIX,
  timeout: config.timeOut,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.data = JSON.stringify({
      ...IParaWra,
      ...JSON.parse(config.data),
    })
    start()
    // store.dispatch('setLoading', { loading: true })
    dispatch('setLoading', { loading: false })
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<IResponse>) => {
    close()
    dispatch('setLoading', { loading: false })
    // store.dispatch('setLoading', { loading: false })
    if (response.status === 200) {
      return response
    } else {
      return showMessage(response.status)
    }
  },
  (error: any) => {
    close()
    dispatch('setLoading', { loading: false })
    // store.dispatch('setLoading', { loading: false })
    const { response } = error
    if (response) {
      return Promise.reject({ infomessage: showMessage(response.status) })
    } else {
      return Promise.reject({ infomessage: '网络连接异常, 请稍后再试' })
    }
  }
)

export const post = <T>(url: string, bodyParam: unknown): Promise<T> => {
  dispatch('setOverlay', { error: false })
  // store.dispatch('setOverlay', { error: false })
  return new Promise((resolve, reject) => {
    axiosInstance
      .post<IResponse>(url, JSON.stringify(bodyParam))
      .then((res) => {
        const { code, message } = res.data as unknown as IResponse
        if (code !== 0) {
          Toast.fail(message)
          dispatch('setOverlay', {
            errorState: true,
            errPlaceHolder: message,
          })
          // store.dispatch('setOverlay', {
          //   errorState: true,
          //   errPlaceHolder: message,
          // })
          reject(message)
        } else {
          resolve(res.data as unknown as T)
        }
      })
      .catch((err) => {
        Toast.fail(err.infomessage)
        // store.dispatch('setOverlay', {
        //   errorState: true,
        //   errPlaceHolder: err.infomessage,
        // })
        dispatch('setOverlay', {
          errorState: true,
          errPlaceHolder: err.infomessage,
        })
        reject({ message: err.infomessage })
      })
  })
}
