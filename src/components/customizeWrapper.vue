<template>
  <section class="layout_wrapper">
    <slot></slot>
    <custimize-slogn :placeholder="placeholder"></custimize-slogn>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CustimizeSlogn from './custimizeSlogn.vue'

export default defineComponent({
  name: 'CustomizeArea',
  props: {
    placeholder: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    CustimizeSlogn,
  },
})
</script>

<style lang="less" scoped>
.layout_wrapper {
  z-index: -2;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  // background: #f5f6fb;
  box-sizing: border-box;
  .footer_place {
    position: fixed;
    width: 100%;
    bottom: 51px;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .home_footer {
    text-align: center;
    position: fixed;
    width: 100%;
    bottom: 15px;
    color: #c0c4cc;
  }
}
</style>
