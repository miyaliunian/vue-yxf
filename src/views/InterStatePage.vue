<template>
  <custimize-empty v-if="errState" :placeHolder="placeHolder"></custimize-empty>
  <customize-skeleton v-else></customize-skeleton>
</template>

<script lang="ts">
import { IToken, IURLParams } from '@/typings'
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import utils from '@/utils'
import { IGlobalState } from '@/store/types'
import CustimizeEmpty from '@/components/custimizeEmpty.vue'
import CustomizeSkeleton from '@/components/customizeSkeleton.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { CustimizeEmpty, CustomizeSkeleton },
  setup() {
    let timer = ref<ReturnType<typeof setInterval>>(0)
    let tokenParams = reactive<IToken>({
      token: '',
    })
    let params = reactive<IURLParams>({
      creditUserId: '',
      name: '',
      idno: '',
      tele: '',
    })

    const store = useStore<IGlobalState>()
    const rotuer = useRouter()
    onMounted(async () => {
      tokenParams = utils.urlParser<IToken>()
      params = await store.dispatch('interModule/fetchTokenConver', {
        data: tokenParams,
      })
      let urlParams = {
        data: {
          name: params.name,
          idno: params.idno,
          tele: params.tele,
        },
      }
      store.dispatch('interModule/fetchSignStats', urlParams)
    })

    onUnmounted(() => {
      clearInterval(timer.value)
    })

    const status = computed(() => store.state.interModule.userInfo.signStatus)
    watch(status, () => {
      let urlParams = {
        data: {
          name: params.name,
          idno: params.idno,
        },
      }
      if (status.value === '2') {
        store
          .dispatch('interModule/fetchContractInfo', urlParams)
          .then((creditUserId) => {
            rotuer.replace(
              `/perinfo/${creditUserId}/${params.name}/${params.idno}`
            )
          })
      } else if (status.value === '0' || status.value === '3') {
        rotuer.replace(`/public/${params.name}/${params.idno}/${params.tele}`)
      } else {
        rotuer.replace(`/pending/${params.name}/${params.idno}/${params.tele}`)
      }
    })
    return {
      errState: computed(() => store.state.errorState),
      placeHolder: computed(() => store.state.errPlaceHolder),
    }
  },
})
</script>
