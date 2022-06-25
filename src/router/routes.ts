import { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/warrant',
    name: 'warrant',
    component: () =>
      import(
        /* webpackChunkName: "authorization" */ `../views/warrant/WarrantPage.vue`
      ),
  },
  {
    path: '/inter',
    name: 'inter',
    component: () =>
      import(/* webpackChunkName: "inter" */ `../views/InterStatePage.vue`),
  },
  {
    path: '/perinfo/:creditUserId/:name/:idno',
    name: 'perinfo',
    component: () =>
      import(
        /* webpackChunkName: "perinfo" */ `../views/perInfo/WholePerInfoPage.vue`
      ),
  },
  {
    path: '/deviderperinfo/:creditUserId/:name/:idno',
    name: 'deviderperinfo',
    component: () =>
      import(
        /* webpackChunkName: "perinfo" */ `../views/perInfo/DividePerInfoPage.vue`
      ),
  },
  {
    path: '/public/:name/:idno/:tele',
    name: 'public',
    component: () =>
      import(/* webpackChunkName: "public" */ '../views/public/publicPage.vue'),
  },
  {
    path: '/fulfilled/:creditUserId',
    name: 'fulfilled',
    component: () =>
      import(
        /* webpackChunkName: "fulfilled" */ '../views/contract-result/ResultFulfillPage.vue'
      ),
  },
  {
    path: '/pending/:name/:idno/:tele',
    name: 'pending',
    component: () =>
      import(
        /* webpackChunkName: "pending" */ '../views/contract-result/ResultPendingPage.vue'
      ),
  },
  {
    path: '/rejected/:creditUserId',
    name: 'rejected',
    component: () =>
      import(
        /* webpackChunkName: "rejected" */ '../views/contract-result/ResultRejectPage.vue'
      ),
  },
  {
    path: '/set/:creditUserId/:name/:idno',
    name: 'set',
    component: () =>
      import(/* webpackChunkName: "set" */ '../views/setting/settingPage.vue'),
  },
  {
    path: '/orders/:creditUserId/:name/:idno',
    name: 'orders',
    component: () =>
      import(/* webpackChunkName: "orders" */ '../views/orders/OrderPage.vue'),
  },
  {
    path: '/families/:creditUserId/:name/:idno',
    name: 'families',
    component: () =>
      import(
        /* webpackChunkName: "families" */ '../views/family/FamilyPage.vue'
      ),
  },
  {
    path: '/bill/:creditUserId/:name/:idno',
    name: 'bill',
    component: () =>
      import(/* webpackChunkName: "bill" */ '../views/bill/BillPage.vue'),
  },
]

export default routes
