<template>
  <section class="section_wrappr">
    <headerTitle :name="user.name"></headerTitle>
    <article style="padding: 0 16px">
      <!-- <article style="padding: 153px 16px"> -->
      <!-- 渐变卡片 -->
      <section class="linear_banner">
        <div>
          <p>门诊可用额度</p>
          <p
            style="
              font-size: 35px;
              font-weight: bolder;
              font-family: DINOT-Medium;
            "
          >
            {{ user.outCurrentCreditLimit }}
          </p>
        </div>
        <div>
          <p style="display: inline-block">住院可用额度</p>
          <p
            style="
              font-size: 35px;
              font-weight: bolder;
              font-family: DINOT-Medium;
            "
          >
            {{ user.hosCurrentCreditLimit }}
          </p>
        </div>
        <span> 信用额度可循环，180天免息服务 </span>
      </section>
      <!-- 医保码/查账还款 -->
      <section class="card_wrapper">
        <div v-for="i in menus.cards" :key="i" @click="i.callback">
          <img :src="i.icon" alt="" />
        </div>
      </section>
      <!-- 我的订单/情亲付/还款记录 -->
      <section class="list_wrapper">
        <section
          class="list_content border-bottom"
          v-for="i in menus.list"
          :key="i"
          @click="i.callback"
        >
          <img :src="i.icon" alt="" />
          <section class="list_content_section">
            <p>{{ i.title }}</p>
            <span>{{ i.sub }}</span>
          </section>
          <img src="~@assets/icons/home/arrow.png" alt="" />
        </section>
      </section>
    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import headerTitle from './components/headerTitle.vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { IGlobalState } from '@/store/types/index'
interface ICard {
  icon: string
  callback: () => void
}

interface IMenu {
  title: string
  sub: string
  icon: string
  callback: () => void
}

interface IMenus {
  cards: ICard[]
  list: IMenu[]
}

interface IUser {
  name: string
  outCurrentCreditLimit: string
  hosCurrentCreditLimit: string
}

type useKeys = keyof IUser

export default defineComponent({
  name: 'PerSection',
  components: {
    headerTitle,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    let menus = reactive<IMenus>({
      cards: [
        {
          icon: require('@/assets/icons/home/ybm.png'),
          callback: () => {
            console.log('triggle cards1')
          },
        },
        {
          icon: require('@/assets/icons/home/czhk.png'),
          callback: () => {
            console.log('triggle cards2')
          },
        },
      ],
      list: [
        {
          title: '我的订单',
          sub: '查看全部门诊、住院订单',
          icon: require('@/assets/icons/home/dd.png'),
          callback: () => {
            const {
              params: { idno, name, creditUserId },
            } = route
            router.push(`/orders/${creditUserId}/${name}/${idno}`)
          },
        },
        {
          title: '亲情付',
          sub: '您可以为家中亲属代付就医费用',
          icon: require('@/assets/icons/home/qq.png'),
          callback: () => {
            const {
              params: { idno, name, creditUserId },
            } = route
            router.push(`/family/${creditUserId}/${name}/${idno}`)
          },
        },
        {
          title: '还款记录',
          sub: '您可以随时查询历史还款记录',
          icon: require('@/assets/icons/home/hk.png'),
          callback: () => {
            console.log('还款记录 3')
          },
        },
      ],
    })
    const store = useStore<IGlobalState>()
    let user = reactive<IUser>({
      name: '初始化用户',
      outCurrentCreditLimit: '0.00',
      hosCurrentCreditLimit: '0.00',
    })

    onMounted(() => {
      const { userInfo } = store.state.interModule
      Object.keys(user).forEach((key) => {
        user[key as useKeys] = userInfo[key as useKeys] || user[key as useKeys]
      })
    })
    return {
      menus,
      user,
    }
  },
})
</script>

<style lang="less" scoped>
.section_wrappr {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  .linear_banner {
    background-image: linear-gradient(to right, #3c90f2, #3369e2);
    display: grid;
    border-radius: 9px;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: 104px 20px;
    box-shadow: 0px 3px 15px 5px #c6d8f6;
    row-gap: 10px;
    color: #fff;
    padding-bottom: 24px;
    font-size: 14px;
    div {
      margin: 25px 20px 0;
      text-align: end;
      p {
        &:first-child {
          margin-bottom: 18px;
        }
      }
      &:first-child {
        margin: 25px 0 0 20px;
        text-align: left;
      }
    }
    span {
      margin-left: 15px;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 12px;
      background: #fff;
      color: #3369e2;
      width: 180px;
    }
  }

  .card_wrapper {
    margin-top: 23px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    div {
      width: calc(50% - 5px);
      height: 100%;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  .list_wrapper {
    margin-top: 21px;
    border: 1px solid #eeeeee;
    border-radius: 12px;
    padding: 30px 20px 10px 20px;
    box-shadow: 0px 0px 6px 1px #efefef;
    position: relative;
    .list_content {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      padding-top: 20px;
      position: relative;
      &:first-child {
        padding-top: 0px;
      }
      &:last-child::before {
        padding-bottom: 20px;
        content: none;
      }
      img {
        width: 32px;
        height: 32px;
        &:last-child {
          width: 10px;
          height: 10px;
          position: absolute;
          right: 0px;
        }
      }
      .list_content_section {
        margin-left: 17px;
        color: #303133;
        p {
          font-size: 15px;
          margin-bottom: 10px;
          color: #000;
          font-weight: 400;
        }
        span {
          height: 50px;
          font-size: 12px;
          color: #909399;
        }
      }
    }
  }
}
</style>
