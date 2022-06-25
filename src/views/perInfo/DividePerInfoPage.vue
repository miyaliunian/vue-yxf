<template>
  <customize-wrapper>
    <BG></BG>
    <Section></Section>
  </customize-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BG from './components/BG.vue'
import Section from './components/PerSection.vue'
import CustomizeWrapper from '@/components/customizeWrapper.vue'

export default defineComponent({
  name: 'DividePerInfoPage',
  components: {
    BG,
    Section,
    CustomizeWrapper,
  },
})
</script>
<style lang="less" scoped></style>
