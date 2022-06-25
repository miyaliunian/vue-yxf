<template>
  <header class="memberLimit">
    <p>
      限添加 {{ familyLimit }} 人,您还可以添加 <span>{{ familySize }}</span> 人
    </p>
  </header>
  <ul class="content_wrapper">
    <li v-for="item in families" :key="item.id">
      <header>
        <p>
          {{ item.name }}
        </p>
        <span @click="removeFamily(item.id)">解绑</span>
      </header>
      <section>
        <p>{{ item.idno }}</p>
        <span>{{ item.mobileNo }}</span>
      </section>
    </li>
    <footer
      @click="$emit('show-family-form')"
      style="display: flex; justify-content: center; align-items: center"
    >
      <img
        style="margin-right: 10px"
        src="~@assets/icons/families/add.png"
        alt=""
      />
      <p>添加新成员</p>
    </footer>
  </ul>
</template>

<script lang="ts">
import { useRouteParams } from '@hooks/useRouteParams'
import { IGlobalState } from '@/store/types'
import { computed, defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'vant'

interface IFamiliy {
  id: string
  name: string
  idno: string
  mobileNo: string
}

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'FamilyMemeber',
  props: {
    showForm: Boolean as PropType<boolean>,
    families: {
      type: Array as PropType<IFamiliy[]>,
      required: true,
    },
  },
  emits: ['show-family-form'],
  components: { [Dialog.name]: Dialog },
  setup() {
    const store = useStore<IGlobalState>()
    const { creditUserId } = useRouteParams()
    const removeFamily = (id: string) => {
      Dialog.confirm({
        title: '确定解绑?',
        message: '解约后，您绑定的亲情账号也不能，使用医信付支付!',
        confirmButtonColor: '#2879fc',
      })
        .then(() => {
          console.log('解绑操作确认')
          let urlParams = {
            data: {
              creditUserId,
              familyUserId: id,
            },
          }

          store.dispatch('familyModule/removeFamilies', urlParams)
        })
        .catch(() => {
          console.log('解绑操作取消')
        })
    }
    return {
      removeFamily,
      familyLimit: computed(() => store.state.familyModule.familyLimit),
      familySize: computed(() => store.state.familyModule.familSize),
    }
  },
})
</script>
<style lang="less" scoped>
.memberLimit {
  box-sizing: border-box;
  width: 100%;
  height: 90px;
  background: #fff6ea;
  padding-left: 24px;
  line-height: 90px;
  font-size: 30px;
  color: #e39b2f;
}
.memberLimit p {
  margin: 0 auto;
}
.memberLimit p span {
  color: #f56c6c;
  font-size: 35px;
  font-weight: bolder;
}
.content_wrapper {
  position: relative;
  padding: 20px;
  z-index: 2;
  li {
    background: #fff;
    margin-bottom: 15px;
    border-radius: 10px;
    padding: 16px 22px;
    font-size: 14px;
    color: #606266;
    box-shadow: 0px 4px 20px 0px #edf0f6;
    header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      p {
        color: #2879fc;
        font-size: 16px;
        font-weight: bold;
      }
      span {
        background: #f0f6ff;
        padding: 4px 12px;
        border-radius: 8px;
        font-size: 12px;
        color: #7da8db;
      }
    }
    section {
      display: flex;
      justify-content: space-between;
    }
  }
  footer {
    background: #fff;
    text-align: center;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #a5c5eb;
    img {
      width: 22px;
      height: 22px;
    }
  }
}

:deep(.van-button .van-button--default) {
  border: 0.5px solid red !important;
}
</style>
