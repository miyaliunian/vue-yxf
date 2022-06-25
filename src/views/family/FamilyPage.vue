<template>
  <customize-wrapper>
    <blank-palce
      v-if="families.length === 0 && placeHolder"
      @showForm="show = true"
    ></blank-palce>

    <family-memeber
      v-else
      :families="families"
      @show-family-form="show = true"
    ></family-memeber>

    <family-add :showPop="show" @closePop="show = false"></family-add>
  </customize-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { IGlobalState } from '@store/types/index'
import { useStore } from 'vuex'
import FamilyMemeber from './components/FamilyMemeber.vue'
import { useRouteParams } from '@hooks/useRouteParams'
import BlankPalce from './components/BlankPlace.vue'
import CustomizeWrapper from '@/components/customizeWrapper.vue'
import FamilyAdd from './components/FamilyAdd.vue'

export default defineComponent({
  components: {
    BlankPalce,
    FamilyMemeber,
    FamilyAdd,
    CustomizeWrapper,
  },
  setup() {
    const show = ref(false)
    const urlParams = reactive({
      creditUserId: '',
    })
    const store = useStore<IGlobalState>()
    onMounted(() => {
      const { creditUserId } = useRouteParams()
      urlParams.creditUserId = creditUserId as string
      store.dispatch('familyModule/fetchFamilies', { data: { ...urlParams } })
    })
    return {
      families: computed(() => store.state.familyModule.families),
      placeHolder: computed(() => store.state.familyModule.placeHolder),
      show,
    }
  },
})
</script>
<style lang="less" scoped>
.wrapper {
  background: #f5f6fb;
}
</style>
