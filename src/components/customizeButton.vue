<template>
  <section class="button_wrapper" @click="$emit('submit')">
    <van-button type="primary" size="normal">{{ lable }}</van-button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'vant'

export default defineComponent({
  name: 'customizeTab',
  components: {
    [Button.name]: Button,
  },
  props: {
    lable: String,
  },
})
</script>

<style lang="less" scoped>
.button_wrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  :deep(.van-button) {
    padding: 0 100px;
    border-radius: 15px;
    font-weight: bold;
  }
}
</style>
