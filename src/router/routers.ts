import { RouteRecordRaw } from "vue-router";
// 导出
const title = "宝烽";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
    redirect: "/home/serviceScreens",
    children: [
      {
        path: "serviceScreens",
        name: "serviceScreens",
        component: () => import("@/views/home/serviceScreens/index.vue"),
        meta: {
          keepAlive: false,
          title: title + "-服务大屏",
        },
      },
      {
        path: "shoppingMallScreen",
        name: "shoppingMallScreen",
        component: () => import("@/views/home/shoppingMallScreen/index.vue"),
        meta: {
          keepAlive: false,
          title: title + "-商城大屏",
        },
      },
      {
        path: "equipmentLargeScreen",
        name: "equipmentLargeScreen",
        component: () => import("@/views/home/equipmentLargeScreen/index.vue"),
        meta: {
          keepAlive: false,
          title: title + "-设备大屏",
        },
      },
      {
        path: "dataCenter",
        name: "dataCenter",
        component: () => import("@/views/home/dataCenter/index.vue"),
        meta: {
          keepAlive: false,
          title: title + "-数据中心",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/home",
  },
];
export default routes;
