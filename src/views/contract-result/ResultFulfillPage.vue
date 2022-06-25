<template>
  <section
    style="
      box-sizing: border-box;
      padding: 20px 20px 0 20px;
      background: #f5f6fb;
      width: 100%;
      height: 100vh;
    "
  >
    <section
      style="
        background: #fff;
        box-shadow: 0px 4px 20px 0px #edf0f6;
        border-radius: 15px;
      "
    >
      <header
        style="
          width: 100%;
          height: 282px;
          display: flex;
          flex: 1;
          justify-content: center;
          padding: 52px 0 32px 0;
        "
      >
        <img
          src="~@assets/icons/result/fulfill.png"
          alt=""
          style="width: auto; height: auto; max-width: 100%; max-height: 100%"
        />
      </header>

      <footer style="display: flex; padding-top: 26px" class="border-top">
        <section
          style="flex: 1; text-align: center; color: #909399; font-size: 12px"
          v-for="(i, index) in 2"
          :key="index"
        >
          <p
            style="
              margin-bottom: 10px;
              font-size: 30px;
              color: #2879fc;
              font-weight: bold;
            "
          >
            10000 <span style="font-size: 12px; color: #c0c4cc">元</span>
          </p>
          <span>门诊信用额度</span>
        </section>
      </footer>
      <strong
        style="
          color: #909399;
          display: inline-block;
          font-size: 12px;
          padding: 27px 20px 20px;
          line-height: 20px;
        "
      >
        注：使用信用支付看病就医，门诊和住院的医疗费
        用分别从相应账户划扣，超过额度范围，不能划扣。
      </strong>
      <customize-button lable="完成" @submit="submit"></customize-button>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'vant'
import CustomizeButton from '@/components/customizeButton.vue'

export default defineComponent({
  name: 'ContractResult',
  components: {
    [Button.name]: Button,
    CustomizeButton,
  },
  setup() {
    const submit = () => {
      console.log('按钮点击')
    }
    return {
      submit,
    }
  },
})
</script>
