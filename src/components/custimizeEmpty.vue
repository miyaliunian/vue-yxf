<template>
  <section class="error_wrapper">
    <van-empty image="error" :description="placeHolder" />
  </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Empty } from 'vant'

export default defineComponent({
  name: 'custimizeEmpty',
  components: {
    [Empty.name]: Empty,
  },
  props: {
    placeHolder: {
      type: String as PropType<string>,
    },
  },
  setup() {
    console.log('custimizeEmpty')
  },
})
</script>

<style lang="less" scoped>
.error_wrapper {
  padding: 15% 0 0;
}
</style>
