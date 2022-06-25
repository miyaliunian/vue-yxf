<template>
  <van-progress
    pivot-text=""
    color="linear-gradient(to right, #be99ff, #7232dd)"
    :percentage="percent"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Progress } from 'vant'
export default defineComponent({
  name: 'CustomizeProcess',
  components: {
    [Progress.name]: Progress,
  },
  props: {
    percent: {
      type: Number,
      required: true,
    },
  },
  setup() {
    console.log('自定义进度条')
    return {}
  },
})
</script>

<style lang="less" scoped>
.tab_wrapper {
  display: flex;
  height: 45px;
  background: #fff;
  padding: 0 20px;
  .tab {
    flex: 1;
    height: 100%;
    line-height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: 17px;
  }
  .tab_color {
    color: #fff;
    background: #2879fc;
  }
}
</style>
