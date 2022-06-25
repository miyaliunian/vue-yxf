<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view />
  </van-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ConfigProvider } from 'vant'

export default defineComponent({
  components: {
    [ConfigProvider.name]: ConfigProvider,
  },
  setup() {
    const themeVars = {
      skeletonAvatarBackground: 'rgb(179,179,179)',
      skeletonRowBackground: 'rgb(179,179,179)',
      buttonBorderWidth: '0.5px',
      buttonDefaultFontSize: '18px',
    }

    return {
      themeVars,
    }
  },
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nprogress .bar {
  background: red !important;
  height: 5px !important;
}
</style>
