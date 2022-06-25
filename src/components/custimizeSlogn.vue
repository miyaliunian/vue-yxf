<template>
  <div class="footer_place" v-if="placeholder">
    <img src="~@assets/icons/home/footer.png" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'custimizeSlogn',
  props: {
    placeholder: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup() {
    console.log('custimizeSlogn')
  },
})
</script>
<style lang="less" scoped>
.footer_place {
  position: fixed;
  width: 100%;
  bottom: 51px;
  padding: 0 20px;
  box-sizing: border-box;
}
.footer_place img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
