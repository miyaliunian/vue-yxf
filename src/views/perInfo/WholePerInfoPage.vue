<template>
  <customize-wrapper :placeholder="false">
    <per-whole-section></per-whole-section>
  </customize-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PerWholeSection from './components/PerWholeSection.vue'
import CustomizeWrapper from '@/components/customizeWrapper.vue'

export default defineComponent({
  name: 'WholePerInfoPage',
  components: {
    PerWholeSection,
    CustomizeWrapper,
  },
})
</script>
<style lang="less" scoped></style>
