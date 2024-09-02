
import { createWebHistory, createRouter } from "vue-router";
// import { RouteRecordRaw } from "vue-router";
import { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded, Router } from 'vue-router';
import routes from "./routers";
import { useCounterStore } from '@/stores/useCounterStore';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {

  if (to.meta.title) {
    document.title = to.meta.title as string; // 设置页面标题
  } else {
    document.title = 'Default Title'; // 设置一个默认标题
  }
  const counterStore = useCounterStore();
  const { setLoadPage,setRouterName } = counterStore;  
  setLoadPage();
  setRouterName(to.name as any);
  //   // 检查用户是否登录
  //   const isAuthenticated = checkLogin(); // 自定义函数，检查用户是否已登录

  //   if (to.name !== 'login' && !isAuthenticated) {
  //     // 如果未登录且目标路由不是登录页，导航到登录页
  //     next({ name: 'login' });
  //   } else {
  //     // 如果已登录或目标路由是登录页，继续导航
  //     next();
  //   }
  next();
});

router.afterEach(() => {
  const counterStore = useCounterStore();

  const { setLoadPage } = counterStore;
  setLoadPage(false)
});


export default router;


