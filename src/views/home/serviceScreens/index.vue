<template>
    <div class="index w-full h-full flex flex-row overflow-auto  ">
        <div class="index-left  w-[432px] pl-[32px] box-border  flex flex-col">
            <CardX class="flex-[1.3] h-full " title="全国各省售后统计">
                <view v-if="list.length > 0">
                    <ListX v-for="(item, index) in list" :key="index" :title="item.provinceName"
                        :incomplete="item.unFinishCount - 0" :total="item.totalCount - 0"
                        :percentage="((item.unFinishCount - 0) / (item.totalCount - 0)) * 100">
                    </ListX>
                </view>
                <view v-else class="flex h-full justify-center items-center text-[#909399] text-[12px]">
                    暂无数据
                </view>

            </CardX>
            <CardX class="flex-1" title="产品售后统计">
                <div class="w-full h-full  flex flex-col">
                    <div class="flex flex-row justify-end text-[#D9F0FF] pb-[16px] ">
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer border-[1px] border-transparent"
                            :class="toggle1 === 1 ? 'bg-m' : 'bg-no'" @click="setToggle1(1)">近3个月
                        </div>
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="toggle1 === 2 ? 'bg-m' : 'bg-no'" @click="setToggle1(2)">近半年
                        </div>
                        <div class="py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="toggle1 === 3 ? 'bg-m' : 'bg-no'" @click="setToggle1(3)">近1年</div>
                    </div>
                    <div class="flex-1">
                        <AfterSalesStatisticsByProvince :typeNumber="toggle1"></AfterSalesStatisticsByProvince>
                    </div>
                </div>
            </CardX>
        </div>

        <div class="index-middle flex-1 relative">
            <div class="absolute top-0 left-0 w-full  px-[32px] box-border  height">
                <Map :listData="list"></Map>
            </div>
            <div class="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-none">
                <!-- 横向tab -->
                <div class="grid grid-cols-5 gap-[24px] px-[32px] box-border">

                    <div class="flex flex-row  items-center" v-for="item in list1" :key="item.id">
                        <div class="w=[48px] h-[48px]">
                            <img class="w-full h-full" :src="item.img" />
                        </div>
                        <div
                            class="bg-[url('@/assets/imgs/bg-1.png')] bg-[100%,100%] flex-1 flex justify-center items-center flex-col">
                            <div class="text-shadow text-[30px] text-[#D9F0FF]">{{ item.number }}</div>
                            <div class="text-[16px] text-[#A3BCCC]">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
                <!-- 竖向tab -->
                <div class="flex-1 px-[32px] pb-[48px] relative">
                    <div class="absolute right-[32px] bottom-0">
                        <div class="min-w-[198px] mb-[24px] bg flex" v-for="item in list2" :key="item.id">
                            <div class="flex-1 pr-[24px] box-border text-end">
                                <div class="text-[30px] text-[#D9F0FF]">{{ item.number }}</div>
                                <div class="text-[16px] text-[#A3BCCC]">{{ item.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 底部 -->
                <div class="h-[280px]"></div>
            </div>
        </div>
        <div class="index-right w-[432px] pr-[32px] box-border flex flex-col">
            <CardX class="flex-1" title="今日服务">
                <el-table class="" :data="tableData" height="95%" row-class-name="custom-hover-row">
                    <el-table-column prop="code" label="售后编号" width="auto" />
                    <el-table-column prop="type" label="售后类型" width="auto">
                        <template #default="scope">

                            <span>{{ scope.row.type == 1 ? '水机安装' : scope.row.type == 2 ? '滤芯更换' : scope.row.type == 3 ?
                                '故障报修' : '其他' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="customerName" label="客户名字" width="auto" />
                    <el-table-column prop="customerMobile" label="联系电话" width="auto" />
                    <el-table-column prop="state" label="售后状态" width="auto">
                        <template #default="scope">
                            <span>{{ scope.row.status == 1 ? '未开始' : scope.row.status == 2 ? '派发' : scope.row.status ==
                                3 ? '拒绝' : scope.row.status == 4 ? '接单' : scope.row.status == 5 ? '服务' :
                                    scope.row.status == 6 ? '完成' : '评价' }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </CardX>
            <CardX class="flex-1" title="服务类型分析">
                <div class="w-full h-full  flex flex-col">
                    <div class="flex flex-row justify-end text-[#D9F0FF] pb-[16px]">
                        <div class="mr-[8px]   py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="toggle2 == 1 ? 'bg-m' : 'bg-no'" @click="setToggle2(1)">近3个月
                        </div>
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="toggle2 == 2 ? 'bg-m' : 'bg-no'" @click="setToggle2(2)">近半年
                        </div>
                        <div class="  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="toggle2 == 3 ? 'bg-m' : 'bg-no'" @click="setToggle2(3)">近1年</div>
                    </div>
                    <div class="flex-1">
                        <ServiceTypeAnalysis :typeNumber="toggle2"></ServiceTypeAnalysis>
                    </div>
                </div>
            </CardX>
            <CardX class="flex-1" title="售后服务总数">
                <div class="w-full h-full  flex flex-col">
                    <div class="flex flex-row justify-end text-[#D9F0FF] pb-[16px]">
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="toggle3 == 1 ? 'bg-m' : 'bg-no'" @click="setToggle3(1)">近3个月
                        </div>
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="toggle3 == 2 ? 'bg-m' : 'bg-no'" @click="setToggle3(2)">近半年
                        </div>
                        <div class=" py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="toggle3 == 3 ? 'bg-m' : 'bg-no'" @click="setToggle3(3)">近1年</div>
                    </div>
                    <div class="flex-1">
                        <TotalNumberOfAfterSalesService :typeNumber="toggle3"></TotalNumberOfAfterSalesService>
                    </div>
                </div>
            </CardX>
        </div>
    </div>
</template>
<script lang='ts' setup name='serviceScreens'>
// import type { list, list1, list2 } from './index.ts';
import CardX from "@/components/CardX.vue";
import ListX from "@/components/ListX.vue";
import AfterSalesStatisticsByProvince from "./components/AfterSalesStatisticsByProvince.vue";
import ServiceTypeAnalysis from "./components/ServiceTypeAnalysis.vue";
import TotalNumberOfAfterSalesService from "./components/TotalNumberOfAfterSalesService.vue";
import Map from "./components/Map.vue";
import { list, list1, list2, getAfterSaleDataList, toggle1, setToggle1, getProductCount, tableData } from "./ts/afterSaleData.ts";

const app = createApp({});
app.component('CardX', CardX)
    .component('AfterSalesStatisticsByProvince', AfterSalesStatisticsByProvince)
    .component('ServiceTypeAnalysis', ServiceTypeAnalysis)
    .component('TotalNumberOfAfterSalesService', ServiceTypeAnalysis)
    .component('Map', Map)
    .component('ListX', ListX);





// const list = ref<list[]>([])



const toggle2 = ref(1)
const setToggle2 = (index: number) => {
    toggle2.value = index;
}
const toggle3 = ref(1)
const setToggle3 = (index: number) => {
    toggle3.value = index;
}

onMounted(() => {

    getAfterSaleDataList()

})

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

.bg-m {
    background: linear-gradient(180deg, rgba(21, 86, 162, 0) 0%, rgba(21, 86, 162, 0.95) 100%);
    border-radius: 0px 0px 0px 0px;
    border: 1px solid rgba(25, 119, 229, 0.8);
}

.bg-no {

    background: linear-gradient(180deg, rgba(21, 86, 162, 0) 0%, rgba(21, 86, 162, 0.3) 100%);
    border-radius: 0px 0px 0px 0px;
    border: 1px solid rgba(17, 54, 95, 0.8);
    color: #738A99;
    text-shadow: 0px 0px 4px #0091FF;
}

.height {
    height: calc(100% - 148px);
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
    background: linear-gradient(270deg, #162a3f 0%, rgba(105, 179, 244, 0.8) 100%) !important;
    color: red !important;
    /* 使用 !important 来覆盖默认样式 */
    font-size: 16px !important;

    /* 使用 !important 来覆盖默认样式 */
    .cell {
        font-size: 14px;
        color: #d9f0ff;
    }
}
</style>