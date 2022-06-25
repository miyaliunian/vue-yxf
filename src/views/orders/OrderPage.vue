<template>
  <customize-wrapper>
    <customize-tab @tabClick="tabClick" :active="active"></customize-tab>
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
          <ul style="padding: 16px">
            <li
              v-for="(item, index) in order"
              :key="index"
              style="
                padding: 20px 15px;
                box-sizing: border-box;
                background: #fff;
                color: #606266;
                font-size: 14px;
                margin-bottom: 15px;
                border-radius: 10px;
                box-shadow: 0px 4px 20px 0px #edf0f6;
              "
            >
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 14px;
                "
              >
                <p>{{ item.hsaOrgName }}</p>
                <span style="font-size: 12px; color: #909399">{{
                  formateStr(item.createDate)
                }}</span>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 14px;
                "
              >
                <p>{{ item.patientName }}</p>
                <span style="font-size: 14px; color: #909399">{{
                  formateOrderType(item.orderStatus)
                }}</span>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 14px;
                "
              >
                <p>
                  {{ item.orderType }}
                </p>
                <span
                  >总额: ￥<span style="font-weight: bold">{{
                    item.totCost
                  }}</span></span
                >
              </div>
              <p style="text-align: end; color: #fb9907">
                信用支付{{ item.ownCost }}
              </p>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </section>
  </customize-wrapper>
</template>

,
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { IGlobalState } from '@store/types/index'
import { useStore } from 'vuex'
import { List, PullRefresh, Tab, Tabs } from 'vant'
import { useRoute } from 'vue-router'
import CustomizeTab from '@/components/customizeTab.vue'
import { useRouteParams } from '@/hooks/useRouteParams'
import CustomizeWrapper from '@/components/customizeWrapper.vue'
import dayjs from 'dayjs'

export default defineComponent({
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    CustomizeTab,
    CustomizeWrapper,
  },
  setup() {
    const store = useStore<IGlobalState>()
    const active = ref('0')
    const route = useRoute()
    onMounted(() => onRefresh())
    const { creditUserId: payUserId } = useRouteParams()
    const onLoad = () => {
      let params = {
        data: {
          payUserId,
          orderType: active.value,
        },
      }
      store.dispatch('orderModule/loadOrder', params)
    }
    const onRefresh = () => {
      const {
        params: { creditUserId: payUserId },
      } = route
      let params = {
        data: {
          payUserId,
          orderType: active.value,
        },
      }
      store.dispatch('orderModule/fetchOrder', params)
    }

    const loading = computed({
      get() {
        return store.state.orderModule.loading
      },
      set(v: boolean) {
        store.state.orderModule.loading = v
      },
    })

    const refreshing = computed({
      get() {
        return store.state.orderModule.refreshing
      },
      set(v: boolean) {
        store.state.orderModule.refreshing = v
      },
    })

    const tabClick = (index: string) => {
      window.scrollTo(0, 0)
      active.value = index
      let params = {
        data: {
          payUserId,
          orderType: index,
        },
      }
      store.dispatch('orderModule/loadOrder', params)
    }

    const formateOrderType = (v: string) => {
      return v === '未完成' ? '已记账' : v
    }

    const formateStr = (v: any) => {
      return dayjs(v).format('YYYY-MM-DD')
    }

    return {
      formateStr,
      order: computed(() => store.state.orderModule.order),
      onLoad,
      loading,
      finished: computed(() => store.state.orderModule.finished),
      refreshing,
      onRefresh,
      tabClick,
      formateOrderType,
      active,
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
  top: 45px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
