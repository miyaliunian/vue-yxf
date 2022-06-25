<template>
  <van-popup v-model:show="showPop">
    <section class="form_wrapper">
      <p style="text-align: end; padding: 0 20px 20px 0" @click="closeForm">
        关闭
      </p>
      <van-form @submit="addFamily" ref="RefForm">
        <van-cell-group inset>
          <van-cell title="请填写被授权人基本信息：" />
          <van-field
            clearable
            required
            v-model="familyForm.name"
            name="name"
            label="姓名"
            placeholder="请填写真实姓名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            clearable
            required
            v-model="familyForm.idno"
            name="idno"
            label="身份证号"
            placeholder="18位身份证号"
            :rules="[
              {
                required: true,
                message: '请填写身份证号',
              },
              {
                message: '身份证号格式不正确',
                pattern: patternIC,
              },
            ]"
          />
          <van-field
            clearable
            required
            v-model="familyForm.mobileNo"
            name="mobileNo"
            label="手机号码"
            placeholder="11位手机号码"
            :rules="[
              {
                required: true,
                message: '请填写手机号码',
              },
              {
                message: '手机号码格式不正确',
                pattern: patternTEl,
              },
            ]"
          />
          <van-cell title="是否优先使用信用付">
            <template #value>
              <van-switch size="normal" v-model="firstYxf" />
            </template>
          </van-cell>
          <van-field name="checked">
            <template #input>
              <van-checkbox v-model="checked" shape="square">
                <span style="color: #909399; font-size: 12px"
                  >我已阅读并同意
                  <span style="color: #2879fc"
                    >《亲情付授权XXXXXX协议》</span
                  ></span
                >
              </van-checkbox>
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button
            :disabled="!checked"
            round
            block
            type="primary"
            native-type="submit"
          >
            提交
          </van-button>
        </div>
      </van-form>
      <div
        style="
          position: fixed;
          width: calc(100% - 40px);
          bottom: 51px;
          padding: 0 20px;
        "
      >
        <img
          src="~@assets/icons/home/footer.png"
          alt=""
          style="width: auto; height: auto; max-width: 100%; max-height: 100%"
        />
      </div>
    </section>
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, SetupContext } from 'vue'
import {
  Popup,
  Form,
  Field,
  CellGroup,
  Button,
  Cell,
  Checkbox,
  FormInstance,
  Switch,
} from 'vant'
import { IGlobalState } from '@store/types/index'
import { useStore } from 'vuex'
import { useRouteParams } from '@hooks/useRouteParams'
interface IForm {
  checked: any
  creditUserId: string
  name: string
  idno: string
  certType: string
  mobileNo: string
  firstYxf: string | boolean
}
type formKeys = keyof IForm
export default defineComponent({
  name: 'FamilyAdd',
  props: {
    showPop: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  components: {
    [Popup.name]: Popup,
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Checkbox.name]: Checkbox,
    [Switch.name]: Switch,
  },
  setup(props, { emit }: SetupContext) {
    const RefForm = ref<FormInstance>()
    const patternTEl = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    const patternIC =
      /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
    const store = useStore<IGlobalState>()
    const checked = ref(false)
    const firstYxf = ref(false)
    const { creditUserId } = useRouteParams()
    const familyForm = reactive<IForm>({
      creditUserId: '',
      name: '',
      idno: '',
      certType: '1',
      mobileNo: '',
      firstYxf: '0',
      checked: false,
    })

    const reset = () => {
      checked.value = false
      Object.keys(familyForm).forEach(
        (key) => (familyForm[key as formKeys] = '')
      )
      RefForm.value?.resetValidation()
      emit('closePop')
    }
    const addFamily = (values: IForm) => {
      values.certType = '1'
      values.creditUserId = creditUserId as string
      values.firstYxf = firstYxf.value ? '1' : '0'
      delete values.checked
      store
        .dispatch('familyModule/addFamilie', {
          data: {
            ...values,
          },
        })
        .then(() => reset())
    }
    const closeForm = () => reset()
    return {
      familyForm,
      addFamily,
      checked,
      patternTEl,
      patternIC,
      closeForm,
      RefForm,
      firstYxf,
    }
  },
})
</script>
<style lang="less" scoped>
.form_wrapper {
  background: #f5f6fb;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  :deep(.van-cell) {
    padding: 20px 17px;
    &:first-child::after {
      content: none;
    }
  }
}
</style>
