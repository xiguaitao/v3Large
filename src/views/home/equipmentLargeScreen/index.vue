<template>
    <div class="index w-full h-full flex flex-row overflow-auto  ">
        <div class="index-left  w-[432px] pl-[32px] box-border  flex flex-col">
            <CardX class="flex-1" title="设备在线统计">
                <div class="flex items-center">
                    <div class="flex-1 flex items-center">
                        <img src="@/assets/imgs/icon-6.png"
                            class="w-[52px] h-[52px] mr-[8px] flex items-center mt-[8px]"></img>
                        <div>
                            <div class="text-[26px] text-[#D9F0FF]">{{ equipmentData.productOnlineCount }}</div>
                            <div class="text-[14px] text-[#A3BCCC]">在线设备数</div>
                        </div>
                    </div>
                    <div class="flex-1 flex items-center">
                        <img src="@/assets/imgs/icon-7.png" class="w-[52px] h-[52px] mr-[8px] mt-[8px]"></img>
                        <div>
                            <div class="text-[26px] text-[#D9F0FF]">{{ equipmentData.productOutlineCount }}</div>
                            <div class="text-[14px] text-[#A3BCCC]">离线设备数</div>
                        </div>
                    </div>
                </div>
            </CardX>
            <CardX class="flex-1" title="设备激活统计">
                <div class="flex">
                    <div class="flex-1 flex">
                        <img src="@/assets/imgs/icon-8.png" class="w-[52px] h-[52px] mr-[8px] mt-[8px]"></img>
                        <div>
                            <div class="text-[26px] text-[#D9F0FF]">{{ equipmentData.productActivateCount }}</div>
                            <div class="text-[14px] text-[#A3BCCC]">已激活设备数</div>
                        </div>
                    </div>
                    <div class="flex-1 flex">
                        <img src="@/assets/imgs/icon-9.png" class="w-[52px] h-[52px] mr-[8px] mt-[8px]"></img>
                        <div>
                            <div class="text-[26px] text-[#D9F0FF]">{{ equipmentData.productUnactivateCount }}</div>
                            <div class="text-[14px] text-[#A3BCCC]">未激活设备数</div>
                        </div>
                    </div>
                </div>
            </CardX>
            <CardX class="flex-1" title="设备运行统计">
                <div class="flex">
                    <div class="flex-1 flex">
                        <img src="@/assets/imgs/icon-10.png" class="w-[52px] h-[52px] mr-[8px] mt-[8px]"></img>
                        <div>
                            <div class="text-[26px] text-[#D9F0FF]">{{ equipmentData.productNormalCount }}</div>
                            <div class="text-[14px] text-[#A3BCCC]">正常设备数</div>
                        </div>
                    </div>
                    <div class="flex-1 flex">
                        <img src="@/assets/imgs/icon-11.png" class="w-[52px] h-[52px] mr-[8px] mt-[8px]"></img>
                        <div>
                            <div class="text-[26px] text-[#D9F0FF]">{{ equipmentData.productFaultCount }}</div>
                            <div class="text-[14px] text-[#A3BCCC]">故障设备数</div>
                        </div>
                    </div>
                </div>
            </CardX>
            <CardX class="flex-[4] h-full " title="全国各省售后统计">
                <div v-if="equipmentData.productDataDisplay.length > 0">
                    <ListX v-for="(item, index) in equipmentData.productDataDisplay" :key="index"
                        :title="item.provinceName" :incomplete="item.activeCount - 0" :total="item.totalCount - 0"
                        :percentage="(item.activeCount - 0) / (item.totalCount - 0)">
                    </ListX>
                </div>
                <div v-else class="flex justify-center items-center h-full text-[#909399] text-[12px]">
                    暂无数据
                </div>
            </CardX>
        </div>

        <div class="index-middle flex-1 relative">
            <div class="absolute top-0 left-0 w-full  px-[32px] box-border  height">
                <Map :listData="equipmentData.productDataDisplay"></Map>
            </div>
            <div class="absolute top-0 left-0 w-full h-full flex flex-col pointer-events-none">
                <!-- 横向tab -->
                <div class="grid grid-cols-4 gap-[24px] px-[32px] box-border">

                    <div class="flex flex-row  items-center" v-for="item in list1" :key="item.id">
                        <div class="w=[52px] h-[52px]">
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
            <div class=" ">
                <div class="flex text-[#A3BCCC] text-[20px] text-center bg-[#69B3F410]">
                    <div class="flex-1 p-[4px,60px] box-border " :class="{ 'bg-tab': endType == 1 }"
                        @click="seletEndType(1)">到期机器</div>
                    <div class="flex-1 p-[4px,60px] box-border" :class="{ 'bg-tab': endType == 2 }"
                        @click="seletEndType(2)">
                        到期物联网卡</div>
                </div>
                <div>
                    <div class="flex flex-row justify-end text-[#D9F0FF] py-[16px]">
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="selectDate == 1 ? 'bg-m' : 'bg-no'" @click="selectDeviceDate(1)">今日到期</div>
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="selectDate == 3 ? 'bg-m' : 'bg-no'" @click="selectDeviceDate(3)">3天到期</div>
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="selectDate == 7 ? 'bg-m' : 'bg-no'" @click="selectDeviceDate(7)">7天到期</div>
                        <div class="mr-[8px] py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="selectDate == 15 ? 'bg-m' : 'bg-no'" @click="selectDeviceDate(15)">15天到期</div>
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="selectDate == 30 ? 'bg-m' : 'bg-no'" @click="selectDeviceDate(30)">30天到期</div>
                    </div>

                </div>

            </div>
            <div class="w-full flex flex-col overflow-auto flex-[0.6] mb-[16px] " v-show="endType == 1">
                <el-table :data="endDateArr" height="100%" row-class-name="custom-hover-row">
                    <el-table-column prop="code" label="设备编号" width="auto" />
                    <el-table-column prop="customerName" label="客户名字" width="auto" />
                    <el-table-column prop="customerMobile" label="联系电话" width="auto" />
                    <el-table-column prop="endTime" label="到期日期" width="auto" />
                </el-table>
            </div>
            <div class="w-full flex flex-col overflow-auto flex-[0.6] mb-[16px] " v-show="endType == 2">
                <el-table :data="endCardArr" height="100%" row-class-name="custom-hover-row">
                    <el-table-column prop="code" label="设备编号" width="auto" />
                    <el-table-column prop="customerName" label="客户名字" width="auto" />
                    <el-table-column prop="customerMobile" label="联系电话" width="auto" />
                    <el-table-column prop="expireTime" label="到期日期" width="auto" />
                </el-table>
            </div>
            <CardX class="flex-1" title="今日预约装机">
                <el-table class="" :data="equipmentData.aftersalesTodayInstalls" height="100%"
                    row-class-name="custom-hover-row">

                    <el-table-column prop="customerName" label="客户名字" width="auto" />
                    <el-table-column prop="customerMobile" label="联系电话" width="auto" />
                    <el-table-column prop="model" label="机型" width="auto" />
                    <el-table-column prop="createTime" label="预约时间" width="auto" />

                </el-table>
            </CardX>
            <CardX class="flex-1" title="按型号统计">
                <el-table class="" :data="equipmentData.productModelStatistics" height="100%"
                    row-class-name="custom-hover-row">
                    <el-table-column prop="modelName" label="型号" width="auto" />
                    <el-table-column prop="totalCount" label="设备总数" width="auto" />
                    <el-table-column prop="activeCount" label="已激活总数" width="auto" />
                    <el-table-column prop="unActiveCount" label="未激活总数" width="auto" />

                </el-table>
            </CardX>
            <CardX class="flex-1" title="设备激活统计">
                <div class="w-full h-full  flex flex-col">
                    <div class="flex flex-row justify-end text-[#D9F0FF] mb-[16px]">
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="selectMonth == 1 ? 'bg-m' : 'bg-no'" @click="selectDeviceMonth(1)">近3个月
                        </div>
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="selectMonth == 2 ? 'bg-m' : 'bg-no'" @click="selectDeviceMonth(2)">近半年
                        </div>
                        <div class=" py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="selectMonth == 3 ? 'bg-m' : 'bg-no'" @click="selectDeviceMonth(3)">近1年</div>
                    </div>
                    <div class="flex-1">
                        <!-- echarts组件 -->
                        <deviceAction :activationProductData="activationProductData"></deviceAction>
                    </div>
                </div>
            </CardX>
        </div>
    </div>
</template>
<script lang='ts' setup name='equipmentLargeScreen'>
import CardX from "@/components/CardX.vue";
import ListX from "@/components/ListX.vue";
import AfterSalesStatisticsByProvince from "./components/AfterSalesStatisticsByProvince.vue";
import ServiceTypeAnalysis from "./components/ServiceTypeAnalysis.vue";
import Map from "../serviceScreens/components/Map.vue";
import deviceAction from "./components/deviceAction.vue";
import {
    equipmentData, getEquipment, list1, list2, selectMonth, selectDeviceMonth, activationProductData, selectDate,
    endDateArr,
    selectDeviceDate,
    endType,
    seletEndType,
    endCardArr
} from "./TS/equipment"
const app = createApp({});
app.component('CardX', CardX)
    .component('AfterSalesStatisticsByProvince', AfterSalesStatisticsByProvince)
    .component('ServiceTypeAnalysis', ServiceTypeAnalysis)
    .component('Map', Map)
    .component('ListX', ListX)
    .component('deviceAction', deviceAction)









onMounted(() => {
    getEquipment()
    selectDeviceMonth(1)
    selectDeviceDate(15)
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

.bg-tab {
    background: linear-gradient(90deg, rgba(25, 119, 229, 0.2) 0%, rgba(25, 119, 229, 0.5) 50%, rgba(25, 119, 229, 0.2) 100%);
    border-radius: 0px 0px 0px 0px;
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-image: linear-gradient(90deg, rgba(28, 134, 255, 1), rgba(204, 228, 255, 1), rgba(28, 134, 255, 1)) 1 1;
    color: #D9F0FF;
    text-shadow: 0px 0px 10px #0091FF, 0px 0px 4px #0091FF;
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

.index {
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

}
</style>