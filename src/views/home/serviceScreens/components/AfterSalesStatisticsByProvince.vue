<!-- /全国各省售后统计 -->
<template>
    <div class='AfterSalesStatisticsByProvince w-full h-full'>
        <Echarts v-if="option.series[0].data.length > 0" :option="option"></Echarts>
        <div v-else class="flex justify-center items-center h-full text-[#909399] text-[12px]">
            暂无数据
        </div>
    </div>
</template>
<script lang='ts' setup name='AfterSalesStatisticsByProvince'>
import {
    getAfterSaleProductCount,
} from "../api/serviceScreensApi.ts";

import { watch } from 'vue'
import Echarts from "@/components/Echarts.vue";
import * as echarts from "echarts";
const props = defineProps({
    typeNumber: {
        type: Number,
        default: 1
    }
})
watch(() => props.typeNumber, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        getProductCount(newVal)
    }
})
/* 组件局部注册 */
const app = createApp({});
app.component('Echarts', Echarts);





//拼接itemStyle
function attackSourcesDataFmt(sData: any) {
    let data: any = [];
    sData.forEach((item: object) => {
        let itemStyle = {

            normal: {
                borderRadius: [0, 20, 20, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                        offset: 0,
                        color: "#10274B50",
                    },
                    {
                        offset: 1,
                        color: "#7130F2",
                    },
                ]),
            },
            emphasis: {
                borderRadius: [0, 20, 20, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                        offset: 0,
                        color: "#10274B50", // 选中时开始的颜色
                    },
                    {
                        offset: 1,
                        color: "#69B3F4", // 选中时结束的颜色
                    },
                ]),
            }
        };
        data.push({
            value: item,
            itemStyle: itemStyle,
        });
    });
    return data;
}
const option = ref({
    backgroundColor: "transparent",
    tooltip: {
        trigger: "axis",
        borderColor: "#62FFFF",
        formatter: " {b}     {c}",
        axisPointer: {
            type: "shadow",
        },
    },
    grid: {
        top: "3%",
        left: "20%",
        right: "3%",
        bottom: "12%",
    },
    xAxis: [
        {
            type: "value",
            axisLabel: {
                color: "#fff",
                padding: [10, 0, 0, 0],
                fontSize: 12,
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#fff",
                    width: 6,
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#1D354B",
                    type: "dashed",
                },
            },
            axisTick: {
                show: false,
            },
        },
    ],
    yAxis: [
        {
            name: "",
            type: "category",

            axisLine: {
                show: true,
                lineStyle: {
                    color: "#1F394F",
                    width: 1,
                },
            },
            axisLabel: {
                show: true,
                color: "#fff",
                padding: [16, 4],
                fontSize: 12,
            },
            axisTick: {
                show: false,
            },
            data: ["1月", "2月", "3月", "4月"],
        },
    ],
    series: [
        {
            name: "",
            type: "bar",
            barWidth: 6,
            data: [
                // {
                //     value: 100,
                //     borderRadius: [0, 20, 20, 0],
                //     itemStyle: {
                //         normal: {
                //             borderRadius: [0, 20, 20, 0],
                //             color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                //                 {
                //                     offset: 0,
                //                     color: "#10274B50",
                //                 },
                //                 {
                //                     offset: 1,
                //                     color: "#7130F2",
                //                 },
                //             ]),
                //         },
                //         emphasis: {
                //             borderRadius: [0, 20, 20, 0],
                //             color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                //                 {
                //                     offset: 0,
                //                     color: "#10274B50", // 选中时开始的颜色
                //                 },
                //                 {
                //                     offset: 1,
                //                     color: "#69B3F4", // 选中时结束的颜色
                //                 },
                //             ]),
                //         }
                //     }
                // }
            ]
        },

    ],
})

const getProductCount = (type: number) => {
    const data = {
        type,
    };
    getAfterSaleProductCount(data).then((res) => {
        let yData: any[] = [];
        res.data.forEach((item: object) => {
            yData.push(item.productName);
        })
        option.value.yAxis[0].data = yData;
        let serviesData: any = []
        res.data.forEach((item: object) => {

            // serviesData.push({

            //     value: item.count,
            //     borderRadius: [0, 20, 20, 0],
            //     color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            //         {
            //             offset: 0,
            //             color: "#10274B00",
            //         },
            //         {
            //             offset: 1,
            //             color: "#7130F2",
            //         },
            //     ])
            // });
            serviesData.push(item.count)
        })
        option.value.series[0].data = attackSourcesDataFmt(serviesData)
        // option.value.series[0] = {
        //     name: "",
        //     type: "bar",
        //     barWidth: 6,
        //     data: serviesData
        // }
    });
};
onMounted(() => {
    getProductCount(1);
})
</script>
<style lang='scss' scoped></style>