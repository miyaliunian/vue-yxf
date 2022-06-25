import { RouteLocationNormalized } from 'vue-router'
import config from '../config'
const urlParser = <T>() => {
  const search = window.location.search
  const searchParams = new URLSearchParams(search)
  return Object.fromEntries(searchParams) as unknown as T
}

const composePromise = (...args: any[]) => {
  const init = args.pop()
  return function (...arg: any) {
    return args.reduce((sequence, func) => {
      return sequence.then((result: any) => {
        return func.call(null, result)
      })
    }, Promise.resolve(init.apply(null, arg)))
  }
}

export const localSave = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const localRead = (key: string) => {
  return localStorage.getItem(key) || ''
}

export function navWarrent(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  if (
    from.path === '/' &&
    to.path === config.authorizePath &&
    config.authorize
  ) {
    return true
  } else {
    return false
  }
}

export default { urlParser, composePromise, navWarrent, localSave, localRead }
