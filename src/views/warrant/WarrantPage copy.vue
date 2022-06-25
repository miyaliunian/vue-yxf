<template>
  <customize-wrapper :placeholder="false">
    <!-- <customize-skeleton></customize-skeleton>
    <section class="authorization_wrapper">
      <article class="statemen_content">
        <header
          style="
            display: flex;
            width: 100%;
            justify-content: center;
            margin-top: 30px;
            margin-bottom: 15px;
          "
        >
          <img
            src="~@assets/icons/authorization/bk.png"
            alt=""
            style="width: 207px; height: 86px"
          />
        </header>
        <p
          class="border-bottom"
          style="padding-bottom: 16px; line-height: 20px"
        >
          授权
          <span style="font-weight: bold; font-size: 18px; color: #303133"
            >医信付服务平台</span
          >
          获取以下信息,为您服务
        </p>
        <section class="statemnt_content_sub">
          <ul>
            <li>获取您的公开信息 (昵称、头像、性别等)</li>
            <li>使用身份信息 (姓名、手机号、证件号码) 办理业务</li>
            <li>使用参保缴费信息、就医信息评估授信额度</li>
          </ul>
        </section>
        <footer class="footer_wrapper border-top">
          <van-checkbox v-model="checked" shape="square">
            <p style="color: #909399; font-size: 12px">
              我已认真阅读并同意
              <span style="color: #2879fc">《用户协议》</span> 及
              <span style="color: #2879fc">《隐私协议》</span>
            </p>
          </van-checkbox>
          <section
            style="
              display: flex;
              color: #303133;
              justify-content: space-between;
              padding: 30px 10px 0;
            "
          >
            <van-button
              style="
                width: 45%;
                background: #fbfafc;
                border: 1px solid #dcdee0;
                font-size: 18px;
              "
              plain
              hairline
              type="default"
              size="normal"
              @click="cancel"
              >拒绝</van-button
            >
            <van-button
              style="width: 45%; font-size: 18px"
              type="primary"
              :disabled="!checked"
              @click="confirm"
              >允许</van-button
            >
          </section>
        </footer>
      </article>
    </section> -->
  </customize-wrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Button, Checkbox, CheckboxGroup } from 'vant'
import { useRouter } from 'vue-router'
import { IGlobalState } from '@/store/types'
import { useStore } from 'vuex'
import { IAuthor, IToken } from '@/typings'
import utils from '@/utils'
import CustimizeEmpty from '@/components/custimizeEmpty.vue'
import CustomizeSkeleton from '@/components/customizeSkeleton.vue'

export default defineComponent({
  name: 'warrent',
  components: {
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    CustimizeEmpty,
    CustomizeSkeleton,
  },
  setup() {
    const router = useRouter()
    const store = useStore<IGlobalState>()
    const checked = ref(false)
    onMounted(() => {
      const tokenParmas = utils.urlParser<IToken>()
      store
        .dispatch('warrentModule/fetchAuthorization', {
          data: { ...tokenParmas },
        })
        .then((res: IAuthor) => {
          if (res.authorization === '1') {
            router.replace({
              name: 'inter',
              query: { ...tokenParmas },
            })
          }
        })
    })
    const cancel = () => {
      console.log('cancel')
    }

    const confirm = () => {
      const tokenParams = utils.urlParser<IToken>()
      store
        .dispatch('warrentModule/saveAuthorization', {
          data: { ...tokenParams },
        })
        .then(
          (res) => {
            router.replace({
              path: '/inter',
              query: {
                ...tokenParams,
              },
            })
          },
          (err) => {
            console.log(err)
          }
        )
    }
    return {
      cancel,
      confirm,
      checked,
    }
  },
})
</script>
<style lang="less" scoped>
.authorization_wrapper {
  color: #606266;
  box-sizing: border-box;
  background: #f5f6fb;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  .statemen_content {
    padding: 20px 20px 30px 20px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 4px 20px 0px #edf0f6;
  }
  .footer_wrapper {
    font-size: 10px;
    padding-top: 20px;
  }
}
.authorization_wrapper .statemen_content .statemnt_content_sub {
  padding-top: 20px;
  ul {
    li {
      margin-bottom: 18px;
      font-size: 14px;
      position: relative;
      padding-left: 12px;
      line-height: 20px;
      &:last-child {
        // margin-bottom: 0;
      }
      &::after {
        position: absolute;
        content: '';
        left: 0;
        top: 7px;
        background: #909399;
        width: 6px;
        height: 6px;
        border-radius: 5px;
      }
    }
  }
}
</style>
