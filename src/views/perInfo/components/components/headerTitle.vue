<template>
  <header class="header_wrapper">
    <img src="~@assets/icons/home/logo_trans.png" alt="" />
    <p>{{ name }}</p>
    <!-- <div @click.stop="$emit('click')"> -->
    <div @click="toSetPage">
      <img
        src="~@assets/icons/home/set.png"
        alt=""
        style="width: 25px; height: 25px"
      />
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent, PropType, SetupContext } from 'vue'

export default defineComponent({
  name: 'HeaderTitle',
  props: {
    name: String as PropType<string>,
  },
  setup(props, { emit }: SetupContext) {
    const toSetPage = () => {
      emit('naviTo')
    }
    return {
      toSetPage,
    }
  },
})
</script>
<style lang="less" scoped>
.header_wrapper {
  padding: 10px 0 20px 20px;
  z-index: 3;
  display: flex;
  align-items: center;
  position: relative;
  img {
    width: 66px;
    height: 23px;
  }
  p {
    font-size: 18px;
    margin-left: 25px;
    position: relative;
  }
  p::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 15px;
    background: #fff;
    margin-left: -12.5px;
  }
}

.header_wrapper div {
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 0 0 40px 40px;
}
</style>
