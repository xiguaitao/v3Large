<template>
    <div class="index w-full h-full flex flex-row overflow-auto  ">
        <!-- 左边 -->
        <div class="index-left  w-[432px] pl-[32px] box-border  flex flex-col">
            <CardX class="flex-1 h-full" title="今日订单">
                <el-table :data="tableData" height="100%" row-class-name="custom-hover-row">
                    <el-table-column prop="code" label="订单编号" width="auto" />
                    <el-table-column prop="customerName" label="客户名字" width="auto" />
                    <el-table-column prop="customerMobile" label="联系电话" width="auto" />
                    <el-table-column prop="money" label="交易金额(元)" width="auto" />
                </el-table>
            </CardX>
            <CardX class="flex-[1.1]" title="用户增量数据分析">
                <!-- echarts组件 -->
                <div class="flex flex-row justify-between items-center mb-[16px]">
                    <div class="flex   items-center">
                        <div class="chain-reaction flex justify-center ">
                            <div class="text"> 环比:{{ addNumInfo.cyclical + "%" }}</div>

                            <div class="triangles  ml-[2px]"
                                :class="addNumInfo.cyclical - 0 < 0 ? 'redDiv' : 'greenDiv'">
                            </div>
                        </div>
                        <div class="chain-reaction ml-[8px] flex justify-center ">
                            <div class="text">
                                同比:{{ addNumInfo.same + "%" }}
                            </div>

                            <div class="triangles  ml-[2px]" :class="addNumInfo.same - 0 < 0 ? 'redDiv' : 'greenDiv'">
                            </div>

                        </div>
                    </div>
                    <div class="selectDiv">
                        <select v-model="selectedRange" @change="onChange" class="custom-select">
                            <option class="custom-option" :value="3" style="padding-top: 16px; padding-bottom: 16px;">
                                近1年</option>
                            <option class="custom-option" :value="1">近3个月</option>
                            <option class="custom-option" :value="2">近半年</option>
                        </select>
                    </div>
                </div>
                <div class="flex-1">
                    <userNumber :addConutArr="addConutArr"></userNumber>
                </div>

            </CardX>
            <CardX class="flex-1" title="用户购买金额数排行">
                <el-table :data="customerBuyGoodsMoneyRank" height="100%" row-class-name="custom-hover-row">
                    <el-table-column label="排名" width="auto">
                        <template #default="{ $index }">

                            <span class="rank-number">NO.{{ $index + 1 }}</span>

                        </template>
                    </el-table-column>

                    <el-table-column prop="customerName" label="客户名字" width="auto" />
                    <el-table-column prop="customerMobile" label="联系电话" width="auto" />
                    <el-table-column prop="money" label="交易金额(元)" width="auto" />

                </el-table>
            </CardX>
            <CardX class="flex-1" title="用户购买订单数排行">
                <el-table :data="customerBuyGoodsCountRank" height="100%" row-class-name="custom-hover-row">
                    <el-table-column label="排名" width="auto">
                        <template #default="{ $index }">

                            <span class="rank-number">NO.{{ $index + 1 }}</span>

                        </template>
                    </el-table-column>
                    <el-table-column prop="customerName" label="客户名字" width="auto" />
                    <el-table-column prop="customerMobile" label="联系电话" width="auto" />
                    <el-table-column prop="orderCount" label="订单数" width="auto" />
                </el-table>
            </CardX>
        </div>
        <!-- 中间 -->
        <div class="index-middle flex-1 relative flex flex-col">
            <!-- 竖向tab -->
            <div class=" px-[32px] box-border  ">
                <div class="flex justify-between">
                    <div class="min-w-[168px] mb-[24px] bg flex mx-[4px] " v-for="item in list2" :key="item.id">
                        <div class="flex-1 pl-[24px] box-border ">
                            <div class="text-[30px] text-[#D9F0FF]">{{ item.number }}</div>
                            <div class="text-[16px] text-[#A3BCCC]">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 中间 -->
            <div class=" w-full  flex-1 px-[32px] box-border ">
                <div class="flex flex-col w-full h-full">
                    <div class="  overflow-auto relative mb-[14px] pt-[40%]">
                        <div class="absolute w-full h-full  top-0 left-0">
                            <div class="w-full h-full absolute  top-0 left-0 pb-[38px] px-[62px] box-border">
                                <img src="@/assets/imgs/bg.png" class="w-full h-full "></img>
                            </div>
                            <div class="w-full h-full absolute  top-0 left-0">
                                <div class="w-full h-full flex flex-col">
                                    <div
                                        class="flex-1 flex justify-center text-[#fff]   pb-[5px] box-border absolute top-0 w-full pt-[20px]">
                                        <div class="flex-1 text-end">
                                            <div class="text-[30px] text-shadow leading-[25px]">{{ todayObj.todayAmount
                                                }}
                                            </div>
                                            <div class="text-[16px] text-[#A3BCCC]">今日交易总额（元）</div>
                                        </div>
                                        <div class="w-[55%] mr-[18px]"></div>
                                        <div class="flex-1  ">
                                            <div class="text-[30px] text-shadow leading-[25px]">
                                                {{ todayObj.todayAddUnionCount }}</div>
                                            <div class="text-[16px] text-[#A3BCCC]">今日新增联盟商家</div>
                                        </div>
                                    </div>
                                    <div
                                        class="flex-1 flex justify-center text-[#fff]   pb-[5px]  box-border absolute top-0 w-full pt-[160px]">
                                        <div class="flex-1 text-end">
                                            <div class="text-[30px] text-shadow leading-[25px]"> {{
                                                todayObj.todayOrderCount }}</div>
                                            <div class="text-[16px] text-[#A3BCCC]">今日订单数</div>
                                        </div>
                                        <div class="w-[35%] mr-[35px]"></div>
                                        <div class="flex-1 ">
                                            <div class="text-[30px] text-shadow leading-[25px]">
                                                {{ todayObj.todayAddCustomerCount }}</div>
                                            <div class="text-[16px] text-[#A3BCCC]">今日新增客户数</div>
                                        </div>
                                    </div>
                                    <div
                                        class="flex-1 flex justify-center text-[#fff]   pb-[5px]  box-border absolute top-0 w-full pt-[300px]">
                                        <div class="flex-1 text-end">
                                            <div class="text-[30px] text-shadow leading-[25px]">
                                                {{ todayObj.todaySendOrderCount }}</div>
                                            <div class="text-[16px] text-[#A3BCCC]">今日待发货订单数</div>
                                        </div>
                                        <div class="w-[30%] mr-[35px]"></div>
                                        <div class="flex-1">
                                            <div class="text-[30px] text-shadow leading-[25px]">{{
                                                todayObj.todayRefundOrder }}</div>
                                            <div class="text-[16px] text-[#A3BCCC]">今日退单总数</div>
                                        </div>
                                    </div>
                                    <div class=" absolute bottom-0 w-full  flex justify-center text-[#fff]">
                                        <div class="flex flex-col align-cneter justify-center ml-[8px] text-center">
                                            <div class=" text-[30px] text-shadow leading-[25px]">{{
                                                todayObj.todayAddGoodsCount }}</div>
                                            <div class="text-[16px] text-[#A3BCCC]">今日新增商品数</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 flex">
                        <CardX class="flex-1 mr-[48px] " title="销售趋势分析">

                            <div class="w-full h-full flex flex-col">
                                <div class="flex flex-row justify-between items-center mb-[16px]">
                                    <div class="flex   items-center">
                                        <div class="chain-reaction flex justify-center ">
                                            <div class="text"> 环比:{{ saleNumInfo.cyclical + "%" }}</div>

                                            <div class="triangles  ml-[2px]"
                                                :class="saleNumInfo.cyclical < 0 ? 'redDiv' : 'greenDiv'"></div>
                                        </div>
                                        <div class="chain-reaction ml-[8px] flex justify-center ">
                                            <div class="text">
                                                同比:{{ saleNumInfo.same + "%" }}
                                            </div>

                                            <div class="triangles  ml-[2px]"
                                                :class="saleNumInfo.cyclical < 0 ? 'redDiv' : 'greenDiv'"></div>

                                        </div>
                                    </div>
                                    <div class="w-full h-full  flex flex-col">
                                        <div class="flex flex-row justify-end text-[#D9F0FF]">
                                            <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                                                :class="saleTime == 1 ? 'bg-m' : 'bg-no'" @click="changeTime(1)">
                                                近3个月
                                            </div>
                                            <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                                                :class="saleTime == 2 ? 'bg-m' : 'bg-no'" @click="changeTime(2)">
                                                近半年
                                            </div>
                                            <div class="py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                                                :class="saleTime == 3 ? 'bg-m' : 'bg-no'" @click="changeTime(3)">
                                                近1年
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div class="flex-1">
                                    <!-- echarts组件 -->
                                    <saleNumber :saleData="saleData"> </saleNumber>
                                </div>
                            </div>
                        </CardX>
                        <CardX class="flex-1" title="订单数统计分析">
                            <!-- echarts组件 -->
                            <div class="w-full h-full  flex flex-col">
                                <div class="flex flex-row justify-end text-[#D9F0FF] ">
                                    <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                                        :class="orderType == 1 ? 'bg-m' : 'bg-no'" @click="selectOrderMonth(1)">
                                        近3个月
                                    </div>
                                    <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                                        :class="orderType == 2 ? 'bg-m' : 'bg-no'" @click="selectOrderMonth(2)">
                                        近半年
                                    </div>
                                    <div class="py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                                        :class="orderType == 3 ? 'bg-m' : 'bg-no'" @click="selectOrderMonth(3)">近1年
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <orderNumber :orderNumberData="orderNumberData"></orderNumber>
                                </div>
                            </div>
                        </CardX>
                    </div>
                </div>

            </div>
            <!-- 底部 -->
            <div class="h-[148px]"></div>
        </div>
        <!-- 右边 -->
        <div class="index-right w-[432px] pr-[32px] box-border flex flex-col">
            <CardX class="flex-[1]" title="商品总数">
                <!-- echarts组件 -->
                <productNumber :countObj="goodsTotalCount"></productNumber>

            </CardX>

            <CardX class="flex-1" title="销售商品排行">
                <el-table :data="goodsBuyRank" height="100%" row-class-name="custom-hover-row">
                    <el-table-column label="排名" width="auto">
                        <template #default="scope">
                            <span>{{ scope.$index + 1 }} </span>
                        </template>

                    </el-table-column>

                    <el-table-column prop="goodsName" label="商品名称" width="auto" />
                    <el-table-column prop="saleNum" label="销售数量" width="auto" />

                </el-table>
            </CardX>
            <CardX class="flex-1" title="联盟商家销售商品排行">
                <el-table :data="goodsBuyRankUnion" height="100%" row-class-name="custom-hover-row">
                    <el-table-column label="排名" width="auto">
                        <template #default="scope">
                            <span>{{ scope.$index + 1 }} </span>
                        </template>

                    </el-table-column>

                    <el-table-column prop="goodsName" label="商品名称" width="auto" />
                    <el-table-column prop="saleNum" label="销售数量" width="auto" />
                </el-table>

            </CardX>
            <CardX class="flex-1" title="新增商品分析">
                <div class="w-full h-full  flex flex-col">
                    <div class="flex flex-row justify-end text-[#D9F0FF] mb-[16px]">
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="addProductType == 1 ? 'bg-m' : 'bg-no'" @click="selectAddProductMonth(1)">近3个月
                        </div>
                        <div class="mr-[8px]  py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="addProductType == 2 ? 'bg-m' : 'bg-no'" @click="selectAddProductMonth(2)">近半年
                        </div>
                        <div class=" py-[2px] px-[10px] box-border text-[12px] cursor-pointer"
                            :class="addProductType == 3 ? 'bg-m' : 'bg-no'" @click="selectAddProductMonth(3)">近1年</div>
                    </div>
                    <div class="flex-1">
                        <!-- echarts组件 -->
                        <addProductNumber :addProduct="addProduct"></addProductNumber>
                    </div>
                </div>
            </CardX>
        </div>
    </div>
</template>
<script lang='ts' setup name='shoppingMallScreen'>

import CardX from "@/components/CardX.vue";
import userNumber from "./components/userNumber.vue";
import saleNumber from "./components/saleNumber.vue"
import orderNumber from "./components/orderNumber.vue"
import addProductNumber from './components/addProductNumber.vue'
import productNumber from './components/productNumber.vue'
import {
    tableData, getTodayOrderData, todayObj, customerBuyGoodsMoneyRank,
    customerBuyGoodsCountRank, goodsTotalCount, goodsBuyRank, goodsBuyRankUnion, addConutArr, onChange, selectedRange, getCustomerAddStatisticsMonth, list2, saleTime,
    changeTime, saleData, getSaleData, addNumInfo, saleNumInfo, orderNumberData, selectOrderMonth, orderType, addProduct,
    addProductType,
    selectAddProductMonth,
} from './ts/shopMall.ts'
const app = createApp({});
app.component('CardX', CardX)
    .component('userNumber', userNumber)
    .component('saleNumber', saleNumber)
    .component('orderNumber', orderNumber)
    .component('addProductNumber', addProductNumber)
    .component('productNumber', productNumber)









onMounted(() => {
    getTodayOrderData()
    getCustomerAddStatisticsMonth(3)
    getSaleData(1)
    selectOrderMonth(1)
    selectAddProductMonth(1)
})
</script>
<style lang='scss' scoped>
.bg {
    background: linear-gradient(-45deg, rgba(0, 213, 255, 0) 0%, rgba(0, 213, 255, .4) 100%);

    &::before {
        content: "";
        display: block;
        width: 6px;
        height: 74px;
        background: #05D2FA;
    }
}

.bg-no {

    background: linear-gradient(180deg, rgba(21, 86, 162, 0) 0%, rgba(21, 86, 162, 0.3) 100%);
    border-radius: 0px 0px 0px 0px;
    border: 1px solid rgba(17, 54, 95, 0.8);
    color: #738A99;
    text-shadow: 0px 0px 4px #0091FF;
}

.bg-m {
    background: linear-gradient(180deg, rgba(21, 86, 162, 0) 0%, rgba(21, 86, 162, 0.95) 100%);
    border-radius: 0px 0px 0px 0px;
    border: 1px solid rgba(25, 119, 229, 0.8);
    color: #D9F0FF;
    text-shadow: 0px 0px 10px #0091FF, 0px 0px 4px #0091FF;
}

//等比缩放
.ac_coupon-wrap {
    height: 0;
    padding-top: 15.16%;
    position: relative;

    .ac_coupon-content {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
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
    background: transparent;

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

.chain-reaction {
    min-width: 91px;
    height: 20px;
    background: rgba(105, 179, 244, 0.1);
    border-radius: 0px 0px 0px 0px;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #A3BCCC;
    line-height: 20px;
    font-style: normal;
    text-transform: none;
    text-align: center;
    white-space: nowrap; //不换行
    position: relative;
    padding-left: 8px;
    padding-right: 8px;
    box-sizing: border-box;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 20px;
        background: rgba(105, 179, 244, 0.5);
        border-radius: 0px 0px 0px 0px;
    }

    .redDiv {


        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        /* 左边透明边框 */
        border-right: 4px solid transparent;
        /* 右边透明边框 */
        border-top: 8px solid #FB1F01;
        /* 顶部实线边框，形成三角形 */
        margin-top: 4px;
    }

    .greenDiv {


        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        /* 左边透明边框 */
        border-right: 4px solid transparent;
        /* 右边透明边框 */
        border-bottom: 8px solid #5BFF00;
        /* 顶部实线边框，形成三角形 */
        margin-top: 4px;
    }


}

.custom-select {
    width: 72px;
    height: 21px;
    line-height: 21px;
    background: linear-gradient(180deg, rgba(21, 86, 162, 0) 0%, rgba(21, 86, 162, 0.95) 100%);
    border-radius: 0px 0px 0px 0px;
    border: 1px solid rgba(25, 119, 229, 0.8);
    font-size: 12px;
    background-color: #004080;
    /* 背景颜色，接近深蓝色 */
    color: #D9F0FF;

    text-shadow: 0px 0px 10px #0091FF, 0px 0px 4px #0091FF;
    text-align: center;
    /* appearance: none; */
    /* 去掉默认箭头 */
    /* -webkit-appearance: none; */
    /* 去掉默认箭头（兼容Safari） */
    /* -moz-appearance: none; */
    /* 去掉默认箭头（兼容Firefox） */

    outline: none;
}



.custom-select .custom-option {
    padding-left: 8px;
    padding-top: 16px !important;
    padding-bottom: 8px !important;
    width: 72px;
    /* height: 89px; */
    /* background: rgba(25, 119, 229, 0.5); */
    border-radius: 0px 0px 0px 0px;
    /* 下拉菜单背景色 */
    color: white;
    /* 下拉菜单字体颜色 */
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 12px;
    color: #D9F0FF;
    /* line-height: 89px; */
    text-align: left;
    font-style: normal;
    text-transform: none;
    border: none;
    box-sizing: border-box;
    outline: none;
}
</style>