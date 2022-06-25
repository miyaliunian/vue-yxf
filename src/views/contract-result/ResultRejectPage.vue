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
          src="~@assets/icons/result/reject.png"
          alt=""
          style="width: auto; height: auto; max-width: 100%; max-height: 100%"
        />
      </header>
      <customize-button lable="知道了" @submit="submit"></customize-button>
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

<style lang="less" scoped>
:deep(.van-button) {
  padding: 0 150px;
  border-radius: 15px;
  font-weight: bold;
}
</style>
