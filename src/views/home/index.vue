<template>
    <div class='index flex flex-col h-full relative'>

        <Header></Header>
        <div class="main flex-1 flex flex-row overflow-auto  box-border">
            <!-- <router-view v-slot="{ Component, route }">
                <keep-alive >
                    <component :is="Component" :key="route.path" />
                </keep-alive>
            </router-view> -->
            <router-view></router-view>
        </div>
        <div class="px-[464px] box-border absolute bottom-[58px] left-0 z-[9999] w-full pointer-events-none">
            <div class="w-full h-full grid grid-cols-3 gap-[14px] pointer-events-auto">
                <div class="flex justify-center items-center text-[#D9F0FF]  text-[26px] cursor-pointer bg-[url(@/assets/imgs/bg-tag-s.png)] bg-[100%,100%]  py-[28px] hover:bg-[url(@/assets/imgs/bg-tag.png)]"
                    v-for="item in list3" :key="item.id" @click="jump(item)"
                    :class="{ 'bg-[url(@/assets/imgs/bg-tag.png)]': item.key == routerName }">
                    <img class="w-[32px] h-[32px] mr-[8px]" :src="item.iconChoose" alt="">
                    <div class="text-shadow">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup name='index'>
import type { list3 } from './index.ts';
import Header from "@/components/Header.vue";
import { useCounterStore } from '@/stores/useCounterStore';

//切换路由过度
const counterStore = useCounterStore();
const { routerName } = toRefs(counterStore);

// watch(routerName, (newVal,) => {

// });


const app = createApp({});
app.component('Header', Header);



// const route = useRoute();
// console.log('route::: ', route);
// console.log(
//     route.matched
//         .filter(r => r.meta.keepAlive)
//         .map(r => r.name)
//         .filter(name => name !== undefined) as string[], 555
// )
// // const cachedComponents = computed(() => {

// //     return route.matched
// //         .filter(r => r.meta.keepAlive)
// //         .map(r => r.name)
// //         .filter(name => name !== undefined) as string[];

// // });

const list3 = ref<list3[]>([
    {
        id: 0,
        name: "服务大屏",
        icon: new URL('@/assets/imgs/icon-fuwu-default-s.png', import.meta.url).href,
        iconChoose: new URL('@/assets/imgs/icon-fuwu-press.png', import.meta.url).href,
        path: "/home/serviceScreens",
        key: "serviceScreens"
    },
    {
        id: 1,
        name: "商城大屏",
        icon: new URL('@/assets/imgs/icon-shangcheng-default-s.png', import.meta.url).href,
        iconChoose: new URL('@/assets/imgs/icon-shangcheng-press.png', import.meta.url).href,
        path: "/home/shoppingMallScreen",
        key: "shoppingMallScreen"
    },
    {
        id: 2,
        name: "设备大屏",
        icon: new URL('@/assets/imgs/icon-shebei-default-s.png', import.meta.url).href,
        iconChoose: new URL('@/assets/imgs/icon-shebei-press.png', import.meta.url).href,
        path: "/home/equipmentLargeScreen",
        key: "equipmentLargeScreen"
    },
    // {
    //     id: 3,
    //     name: "数据中台",
    //     icon: new URL('@/assets/imgs/icon-shuju-default-s.png', import.meta.url).href,
    //     iconChoose: new URL('@/assets/imgs/icon-shujui-press.png', import.meta.url).href,
    //     path: "/home/dataCenter",
    //     key: "dataCenter"
    // },
])


const router = useRouter();
const jump = ({ path }: list3) => {
    router.push({ path })
}

</script>
<style lang='scss' scoped>
.bg {
    background: linear-gradient(90deg, rgba(0, 213, 255, 0) 0%, rgba(0, 213, 255, .4) 100%);

    &::after {
        content: "";
        display: block;
        width: 6px;
        height: 74px;
        background: #05D2FA;
    }
}

:deep(.el-table--fit) {
    background: transparent;

}

:deep(.el-table th.el-table__cell) {
    background: #2a4460 !important;
    height: 28px !important;
    padding: 0 !important;

    .cell {
        height: 28px;
        line-height: 28px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #738a99;
    }
}

:deep(.el-table .el-table__cell) {
    padding: 0 !important;
}

:deep(.el-table td.el-table__cell),
.el-table th.el-table__cell.is-lea {
    border: none;
}

:deep(.el-table__body) {
    height: 100%;
    width: auto !important;
}

:deep(.el-table__header) {
    width: auto !important;
}

:deep(.el-table__cell.is-leaf) {
    border: none;
}

:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
    border-bottom: 0;
}

:deep(.el-table::before) {
    content: none;
}

:deep(.el-table__inner-wrapper::before) {
    background: transparent
}

:deep(.el-table tr) {
    background: #1a283b !important;
    height: 28px !important;
    padding: 0 !important;

    .cell {
        height: 28px;
        line-height: 28px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #a3bccc;
    }
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell) {
    background: none;
}

:deep(.el-table .custom-hover-row:hover) {
    background: linear-gradient(270deg,
            #162a3f 0%,
            rgba(105, 179, 244, 0.8) 100%) !important;
    color: red !important;
    /* 使用 !important 来覆盖默认样式 */
    font-size: 16px !important;

    /* 使用 !important 来覆盖默认样式 */
    .cell {
        font-size: 14px;
        color: #d9f0ff;
    }
}

.index {
    .bg-m {
        background: linear-gradient(180deg, rgba(21, 86, 162, 0) 0%, rgba(21, 86, 162, 0.95) 100%);
        border-radius: 0px 0px 0px 0px;
        border: 1px solid rgba(25, 119, 229, 0.8);
    }

    .main {
        .main-left {}

        .main-middle {}

        .main-right {}
    }
}
</style>