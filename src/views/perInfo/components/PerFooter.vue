<template>
  <footer class="home_footer">常州市医保局提供服务</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PerFooter',
})
</script>

<style lang="less" scoped>
.home_footer {
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 30px;
  font-size: 20px;
  color: #c0c4cc;
}
</style>
