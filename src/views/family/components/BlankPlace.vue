<template>
  <section class="blackPlace_wrapper">
    <article class="content_wrapper">
      <img
        src="~@assets/icons/families/placeholder.png"
        alt=""
        style="
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          background: #fff;
          border-radius: 10px;
        "
      />
    </article>

    <p>您还没绑定亲情账号哦！</p>
    <span
      >您可为家中老人、儿童绑定亲情账号，在看病就医
      时共享您的信用额度，医疗费用由您代缴代还。</span
    >
    <p @click="addFamilie">去绑定</p>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BlankPalce',
  setup(props, ctx) {
    const addFamilie = () => ctx.emit('showForm')
    return {
      addFamilie,
    }
  },
})
</script>
<style lang="less" scoped>
.blackPlace_wrapper {
  width: calc(100% - 40px);
  margin: 20px auto;
  padding: 20px 16px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 20px 0px #edf0f6;
  .content_wrapper {
    width: 100%;
    height: 170px;
    text-align: center;
    padding-top: 62px;
  }
  p {
    text-align: center;
    font-weight: bold;
    margin: 30px 0 32px 0;
    color: #606266;
    &:last-child {
      text-align: center;
      margin-top: 17px;
      color: #2879fc;
      font-size: 14px;
      padding-bottom: 62px;
      font-weight: bold;
    }
  }
  span {
    text-align: center;
    color: #909399;
    font-size: 12px;
  }
}
</style>
