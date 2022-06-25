<template>
  <section class="wrapper">
    <article class="content_wrapper">
      <banner></banner>
      <pub-section
        :showPop="show"
        @cancel="show = false"
        :banks="banks"
      ></pub-section>
    </article>
    <footer
      style="
        width: 100%;
        position: fixed;
        padding: 0 15px 30px 15px;
        box-sizing: border-box;
        bottom: 0;
        left: 0;
      "
    >
      <van-button type="primary" size="large" @click="show = true"
        >开通医信付</van-button
      >
    </footer>
  </section>
</template>

<script lang="ts">
import banner from './components/pubBanner.vue'
import { Button } from 'vant'
import pubSection from './components/pubSection.vue'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    banner,
    pubSection,
    [Button.name]: Button,
  },
  setup() {
    const store = useStore()
    const show = ref(false)
    onMounted(() => {
      store.dispatch('publicModule/fetchBanks', { data: {} })
    })
    return {
      show,
      banks: computed(() => store.state.publicModule.banks),
    }
  },
})
</script>
<style lang="less" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #f5f6fb;
}
.content_wrapper {
  position: relative;
  width: 100%;
  height: calc(100% - 70px);
  overflow: auto;
}
</style>
