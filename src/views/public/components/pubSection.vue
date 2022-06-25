<template>
  <div>
    <section class="section_wrappr">
      <!-- 使用指南 -->
      <section>
        <img src="~@assets/icons/propagate/zhin.png" alt="" />
      </section>
      <section>
        <img src="~@assets/icons/propagate/pqgx.png" alt="" />
      </section>
      <section>
        <img src="~@assets/icons/propagate/bank_2.png" alt="" />
      </section>
    </section>
    <van-popup
      teleport="body"
      round
      closeable
      :close-on-click-overlay="false"
      v-model:show="showPop"
      @click-close-icon="$emit('cancel')"
      position="bottom"
      :style="{ height: '80%', padding: '14px 0' }"
    >
      <section
        style="width: 100%; position: relative; overflow: hidden; height: 100%"
      >
        <div
          style="
            color: rgb(48, 49, 51);
            font-size: 18px;
            position: absolute;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          选择医信付签约银行
        </div>
        <!-- 滚动内容区 -->
        <article
          style="margin: 40px 0; overflow-y: auto; height: calc(100% - 160px)"
        >
          <section style="padding: 0 25px; width: 100%; box-sizing: border-box">
            <ul>
              <li v-for="(bank, index) in banks" :key="index">
                <van-radio-group v-model="bankRadio">
                  <section
                    @click="hosChange(index)"
                    class="border-bottom"
                    style="
                      display: flex;
                      padding: 20px 0;
                      box-sizing: border-box;
                    "
                  >
                    <img
                      :src="bank.bankLogo"
                      alt=""
                      style="width: 20px; height: 20px; margin-right: 10px"
                    />
                    <div
                      style="
                        color: #606266;
                        font-size: 14px;
                        position: relative;
                        width: 100%;
                      "
                    >
                      <p style="font-size: 18px; color: #303133">
                        {{ bank.payName }}
                      </p>
                      <p style="margin: 12px 0">{{ bank.hosLimit }}</p>
                      <span style="display: inline-block"
                        >免息期限：{{ bank.gracePeriod }}</span
                      >
                      <!-- 右侧单选按钮 -->
                      <article
                        style="
                          position: absolute;
                          right: 0;
                          top: 18%;
                          width: 40px;
                          height: 40px;
                          margin: auto;
                          display: flex;
                          justify-content: end;
                        "
                      >
                        <van-radio :name="index"></van-radio>
                      </article>
                    </div>
                  </section>
                </van-radio-group>
              </li>
              <footer
                style="display: flex; align-items: center; padding: 15px 0 0"
              >
                <van-checkbox v-model="useChecked" shape="square">
                  <span
                    style="color: #909399; line-height: 20px; font-size: 14px"
                  >
                    就医优先使用医信付
                  </span>
                </van-checkbox>
              </footer>
            </ul>
          </section>
          <!-- 合作银行 -->
          <section style="padding: 20px 0 20px 0">
            <header style="text-align: center; color: #303133; font-size: 18px">
              合作银行
            </header>
            <section
              style="padding: 0 25px; width: 100%; box-sizing: border-box"
            >
              <ul>
                <li v-for="(bank, index) in banks" :key="index">
                  <section
                    class="border-bottom"
                    style="
                      display: flex;
                      padding: 20px 0;
                      box-sizing: border-box;
                      flex-direction: column;
                    "
                  >
                    <article style="display: flex; align-items: center">
                      <div
                        style="
                          width: 6px;
                          height: 6px;
                          background: #2879fc;
                          border-radius: 3px;
                          margin-right: 9px;
                        "
                      ></div>
                      <span style="font-size: 16px; color: #303133">{{
                        bank.payName
                      }}</span>
                    </article>
                    <section
                      style="
                        padding: 15px 0 0px 12px;
                        font-size: 14px;
                        coor: #606266;
                        display: flex;
                        flex-wrap: wrap;
                      "
                    >
                      <p
                        v-for="(hos, index) in bank.hospitalInfo"
                        :key="index"
                        style="margin: 0 13px 12px 0"
                        class="border-right"
                      >
                        {{ hos.name }}
                      </p>
                    </section>
                  </section>
                </li>
              </ul>
            </section>
          </section>
        </article>

        <!-- 底部按钮 -->
        <footer
          style="
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
          padding:15px 15px 0 15px
          background: #fff;
        "
        >
          <span
            style="
              color: #909399;
              line-height: 20px;
              font-size: 12px;
              display: inline-block;
              margin-bottom: 10px;
            "
            @click="toProtoHref"
          >
            查看
            <span style="color: #2879fc"
              >《 {{ banks[bankRadio].agreement || '' }} 》</span
            >
            并授权医信付平台协助评估是否可享受该服务。
          </span>
          <van-button type="primary" size="large" @click="sign"
            >同意协议并签约</van-button
          >
        </footer>
      </section>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { Button, Popup, RadioGroup, Radio, Checkbox } from 'vant'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

interface IHos {
  name: string
}

interface IBank {
  payName: string
  gracePeriod: string
  outLimit: string
  hosLimit: string
  hospitalInfo: IHos[]
  bankLogo: string
  agreement: string
  agreementUrl: string
  payType: string
}
export default defineComponent({
  name: 'PubSection',
  props: {
    showPop: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    banks: {
      type: Array as PropType<IBank[]>,
      required: true,
    },
  },
  components: {
    [Button.name]: Button,
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const useChecked = ref(1)
    const bankRadio = ref(0)
    const sign = () => {
      let params = {
        data: {
          name: route.params.name,
          idno: route.params.idno,
          tele: route.params.tele,
          payType: props.banks[bankRadio.value].payType,
          firstYxf: useChecked.value ? '1' : '0',
        },
      }
      store.dispatch('publicModule/tSign', params)
    }
    const toProtoHref = () => {
      const { agreementUrl } = props.banks[bankRadio.value]
      self.location.href = agreementUrl.startsWith('http://')
        ? agreementUrl
        : `http://${agreementUrl}`
    }

    const hosChange = (val: number) => (bankRadio.value = val)
    return {
      sign,
      useChecked,
      bankRadio,
      hospitals: computed(() => store.state.publicModule.hosips),
      toProtoHref,
      hosChange,
    }
  },
})
</script>

<style lang="less" scoped>
.section_wrappr {
  padding: 217px 15px 20px 15px;
  box-sizing: border-box;
  position: absolute;
  // width: 100vw;
  left: 0;
  right: 0;
  top: 0;

  section {
    margin: 14px 0;
    display: flex;
    justify-content: center;
    &:first-child {
      width: 100%;
      height: 180px;
      margin-top: 0;
    }
    &:nth-child(2) {
      width: 100%;
      height: 101.5px;
    }
    &:last-child {
      width: 100%;
      height: 127.5px;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
