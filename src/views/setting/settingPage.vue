<template>
  <customize-wrapper style="padding: 20px 0 0">
    <van-cell-group inset>
      <van-cell title="就医优先使用信用付">
        <template #value>
          <van-switch v-model="checked" size="20" @change="switchChange" />
        </template>
      </van-cell>
      <van-cell title="解约" is-link @click="cellClick" />
    </van-cell-group>
  </customize-wrapper>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Form, Field, Cell, CellGroup, Switch, Dialog } from 'vant'
import CustomizeWrapper from '@/components/customizeWrapper.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SettingPage',
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Field.name]: Field,
    [Switch.name]: Switch,
    [Dialog.name]: Dialog,
    CustomizeWrapper,
  },
  setup() {
    const checked = ref(true)
    const route = useRoute()
    const store = useStore()
    const {
      params: { creditUserId: creditUserId, name, idno },
    } = route
    checked.value =
      computed(() => store.state.interModule.userInfo.firstYxf).value === '1'
        ? true
        : false
    const switchChange = (v: boolean) => {
      console.log(v)
      let params = {
        data: {
          creditUserId,
          firstYxf: v ? '1' : '0',
        },
      }
      store.dispatch('setModule/assignYxf', params)
    }
    const cellClick = () => {
      Dialog.confirm({
        title: '确定解约？',
        message: '解约后，您绑定的亲情账号也不能 使用信用支付',
      })
        .then(() => {
          let params = {
            data: {
              authToken: localStorage.getItem('authToken'),
              creditUserId,
              name,
              idno,
            },
          }
          store.dispatch('setModule/unsign', params).then()
        })
        .catch(() => {
          console.log('on cancel')
        })
    }
    return {
      checked,
      cellClick,
      switchChange,
    }
  },
})
</script>
