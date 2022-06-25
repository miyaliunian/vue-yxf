<template>
  <section class="section_wrappr">
    <!-- 渐变卡片 | ring -->
    <section class="linear_banner">
      <headerTitle :name="user.name" @click="toSetPage"></headerTitle>
      <article>
        <!-- <canvas id="canvas" width="100" height="100"></canvas> -->
        <canvas id="canvas" width="200" height="200"></canvas>
        <div
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            align-items: center;
            position: absolute;
            left: 0%;
            top: 18%;
          "
        >
          <p style="margin-bottom: 20px">可用额度</p>
          <p
            style="
              font-size: 35px;
              font-weight: bolder;
              font-family: DINOT-Medium;
            "
          >
            {{ user.outCurrentCreditLimit }}
          </p>
          <span
            style="
              margin-top: 24px;
              background: #4382e0;
              padding: 8px 25px;
              border-radius: 20px;
            "
          >
            授信额度 {{ user.outCreditLimit }}
          </span>
        </div>
      </article>
    </section>
    <article style="padding: 0 16px">
      <section class="card_wrapper">
        <div v-for="i in menus.cards" :key="i" @click="i.callback">
          <img :src="i.icon" alt="" />
        </div>
      </section>
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
  outCreditLimit: string
}

type useKeys = keyof IUser

interface IcanvasEL {
  context?: CanvasRenderingContext2D
  x: number
  y: number
  radius: number
  color?: CanvasGradient
  lineWidth: number
  startAngle: number
  endAngle: number
}

export default defineComponent({
  name: 'PerWholeSection',
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
            const {
              params: { creditUserId },
            } = route
            let params = {
              data: {
                creditUserId,
              },
            }
            store.dispatch('cardModule/fetchTarURL', params)
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
            const {
              params: { idno, name, creditUserId },
            } = route
            router.push(`/bill/${creditUserId}/${name}/${idno}`)
          },
        },
      ],
    })
    const store = useStore<IGlobalState>()
    let user = reactive<IUser>({
      name: '初始化用户',
      outCurrentCreditLimit: '0.00',
      hosCurrentCreditLimit: '0.00',
      outCreditLimit: '0.00',
    })

    onMounted(() => {
      const { userInfo } = store.state.interModule
      Object.keys(user).forEach((key) => {
        user[key as useKeys] = userInfo[key as useKeys] || user[key as useKeys]
      })
      // canvas 实现圆环
      let canvas = <HTMLCanvasElement>document.getElementById('canvas')
      let context = canvas.getContext('2d') as CanvasRenderingContext2D
      let width = canvas.width
      let height = canvas.height
      const ring: IcanvasEL = {
        x: width / 2,
        y: height / 2,
        radius: width / 2 - 5,
        lineWidth: 5,
        startAngle: Math.PI * 0.85,
        endAngle: Math.PI * 2 + Math.PI * 0.15,
        // startAngle: Math.PI,
        // endAngle: Math.PI * 2,
      }
      let lineGrd = context!.createLinearGradient(width / 2, 0, 0, height)
      lineGrd.addColorStop(0.4, '#22dbfc')
      lineGrd.addColorStop(1, '#379bfb')
      ring.color = lineGrd
      context.beginPath()
      context.arc(ring.x, ring.y, ring.radius, ring.startAngle, ring.endAngle)
      context.lineWidth = ring.lineWidth

      context.strokeStyle = ring.color
      context.lineCap = 'round'
      context.stroke()
      context.closePath()
    })

    const toSetPage = () => {
      const {
        params: { creditUserId, name, idno },
      } = route
      router.push(`/set/${creditUserId}/${name}/${idno}`)
    }
    return {
      menus,
      user,
      toSetPage,
    }
  },
})
</script>

<style lang="less" scoped>
.section_wrappr {
  z-index: 2;
  width: 100%;
  .linear_banner {
    background: linear-gradient(#1e64cc, #3379e2);
    color: #fff;
    height: 250px;
    article {
      display: flex;
      flex-direction: column;
      // padding: 20px 10%;
      position: relative;
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
      &:last-child::before {
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
