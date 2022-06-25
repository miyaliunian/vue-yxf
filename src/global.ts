import { Store } from 'vuex'
import { IGlobalState } from './store/types'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    store: Store<IGlobalState>
  }
}
