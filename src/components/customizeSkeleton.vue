<template>
  <div class="skeleton_wrapper">
    <van-skeleton
      title
      avatar
      :row="5"
      v-for="(i, index) in 3"
      :key="index"
      class="skeleton"
      :loading="loading"
    />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Skeleton } from 'vant'
import { useStore } from 'vuex'
import { IGlobalState } from '@/store/types'

export default defineComponent({
  name: 'customizeSkeleton',
  components: {
    [Skeleton.name]: Skeleton,
  },
  setup() {
    console.log('customizeSkeleton')
    const store = useStore<IGlobalState>()
    return {
      loading: computed(() => store.state.loading),
    }
  },
})
</script>

<style lang="less" scoped>
.skeleton_wrapper {
  .skeleton {
    margin: 20px 0 0;
  }
}
</style>
