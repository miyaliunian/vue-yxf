<template>
  <header class="tab_wrapper">
    <p
      class="tab"
      :class="{ tab_color: i.key === active }"
      v-for="i in tabs.tab"
      :key="i.key"
      @click="$emit('tabClick', i.key)"
    >
      {{ i.name }}
    </p>
  </header>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'customizeTab',
  props: {
    active: String,
  },
  setup() {
    const tabs = reactive({
      tab: [
        { name: '全部', key: '0' },
        { name: '门诊', key: '1' },
        { name: '住院', key: '3' },
      ],
    })
    return {
      tabs,
    }
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
