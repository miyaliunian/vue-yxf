<template>
  <section
    style="
      box-sizing: border-box;
      padding: 20px 20px 0 20px;
      background: #f5f6fb;
      display: flex;
      width: 100%;
      height: 100vh;
    "
  >
    <header
      style="
        width: 100%;
        height: 282px;
        display: flex;
        flex: 1;
        justify-content: center;
        background: #fff;
        border-radius: 15px;
        padding-top: 52px;
        padding-bottom: 78px;
        box-shadow: 0px 4px 20px 0px #edf0f6;
      "
    >
      <img
        src="~@assets/icons/result/pending.png"
        alt=""
        style="width: auto; height: auto; max-width: 100%; max-height: 100%"
      />
    </header>
  </section>
</template>

<script lang="ts">
import { IGlobalState } from '@/store/types'
import { IURLParams, IUser } from '@/typings'
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ContractResult',
  setup() {
    let timer = ref<ReturnType<typeof setInterval>>(0)
    const store = useStore<IGlobalState>()
    const route = useRoute()
    const rotuer = useRouter()
    let params = reactive<IURLParams>({
      creditUserId: '',
      name: '',
      idno: '',
      tele: '',
    })
    onMounted(() => {
      timer.value = setInterval(() => {
        console.log('执行调用')
        reload()
      }, 3000)
    })

    onUnmounted(() => {
      console.log('被销毁')
      clearInterval(timer.value)
    })

    const reload = () => {
      const {
        params: { name = '', idno = '', tele = '' },
      } = route
      let urlParams = {
        data: {
          name,
          idno,
          tele,
        },
      }
      store
        .dispatch('interModule/fetchSignStats', urlParams)
        .then((res: IUser) => {
          if (res.signStatus === '2') {
            let urlParams = {
              data: {
                creditUserId: params.creditUserId,
                name: params.name,
                idno: params.idno,
              },
            }
            store
              .dispatch('interModule/fetchContractInfo', urlParams)
              .then(() => {
                rotuer.push(
                  `/perinfo/${params.creditUserId}/${params.name}/${params.idno}`
                )
              })
          }
        })
    }
  },
})
</script>

<style lang="less" scoped></style>
