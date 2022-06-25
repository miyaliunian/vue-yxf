<template>
  <customize-wrapper>
    <section class="scroll_wrapper">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          :immediate-check="false"
        >
          <ul>
            <li
              v-for="(item, index) in bills"
              :key="index"
              class="content_wrapper"
            >
              <div>
                <p>
                  {{ formateStr(item.repayDate) }}
                </p>
                <span> ￥ {{ item.repayAmount }}</span>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </section>
  </customize-wrapper>
</template>

,
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { IGlobalState } from '@store/types/index'
import { useStore } from 'vuex'
import { List, PullRefresh } from 'vant'
import { useRoute } from 'vue-router'
import { useRouteParams } from '@/hooks/useRouteParams'
import CustomizeWrapper from '@/components/customizeWrapper.vue'
import dayjs from 'dayjs'

export default defineComponent({
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    CustomizeWrapper,
  },
  setup() {
    const store = useStore<IGlobalState>()
    const route = useRoute()
    onMounted(() => onRefresh())
    const { creditUserId } = useRouteParams()
    const onLoad = () => {
      let params = {
        data: {
          creditUserId,
        },
      }
      store.dispatch('billModule/loadBills', params)
    }
    const onRefresh = () => {
      const {
        params: { creditUserId: creditUserId },
      } = route
      let params = {
        data: {
          creditUserId,
        },
      }
      store.dispatch('billModule/fetchBills', params)
    }

    const loading = computed({
      get() {
        return store.state.billModule.loading
      },
      set(v: boolean) {
        store.state.billModule.loading = v
      },
    })

    const refreshing = computed({
      get() {
        return store.state.billModule.refreshing
      },
      set(v: boolean) {
        store.state.billModule.refreshing = v
      },
    })

    const formateStr = (v: any) => {
      return dayjs(v).format('YYYY-MM-DD')
    }

    return {
      formateStr,
      bills: computed(() => store.state.billModule.bills),
      onLoad,
      loading,
      finished: computed(() => store.state.billModule.bills),
      refreshing,
      onRefresh,
    }
  },
})
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  position: relative;
}
.scroll_wrapper {
  overflow-y: scroll;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ul {
    padding: 16px;
  }
  ul li {
    padding: 20px 30px;
    box-sizing: border-box;
    background: #fff;
    color: #606266;
    font-size: 14px;
    margin-bottom: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 20px 0px #edf0f6;
    position: relative;
    &::before {
      content: '';
      background: #d9dbe3;
      width: 15px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    &::after {
      content: '';
      background: #2879fc;
      width: 15px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;

      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
  ul li div {
    display: flex;
    justify-content: space-between;
    p {
      font-size: 14px;
      color: #909399;
    }
    span {
      font-size: 17px;
      color: #606266;
      font-weight: bolder;
    }
  }
}
</style>
