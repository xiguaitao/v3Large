<!-- 售后服务总数 -->
<template>
    <div class='TotalNumberOfAfterSalesService w-full h-full'>
        <Echarts v-if="option.series[0].data.length > 0" :option="option"></Echarts>
        <div v-else class="flex justify-center items-center h-full text-[#909399] text-[12px]">
            暂无数据
        </div>
    </div>
</template>
<script lang='ts' setup name='TotalNumberOfAfterSalesService'>
import Echarts from "@/components/Echarts.vue";
import { getAfterSaleCountMonthly } from "../api/serviceScreensApi.ts";
const props = defineProps({
    typeNumber: {
        type: Number,
        default: 1
    }
})
const option = ref({
    backgroundColor: "#121A27",
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(13,5,30,.6)',
        borderWidth: 1,
        borderColor: '#4ddd8f',
        padding: 5,
        textStyle: {
            color: "#fff"
        },
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: 'rgba(105,179,244,.2)', // 设置竖线颜色为红色
                width: 30, // 设置竖线宽度为5
                shadowBlur: 0, // 设置边框宽度为40
                type: 'solid' // 设置竖线为实线
            }
        }
    },
    grid: {
        top: "4%",
        left: "0%",
        right: "3%",
        bottom: "0%",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['2024-1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
        axisLabel: {
            color: '#CFCFCF',
            interval: 0,
            fontSize: 14
        },

        axisTick: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            show: true,
            color: '#CFCFCF',
            fontSize: 14
        },

        splitLine: {
            show: true,
            lineStyle: {
                width: 0.8,
                color: 'rgba(127, 214, 255, .4)',
                type: 'dashed'
            }
        }
    },
    series: [
        {
            type: 'line',
            showSymbol: false,
            // smooth: true,
            // symbolSize: 8,
            lineStyle: {
                color: '#119AED'
            },
            symbol: 'circle', // 设置转折点为圆形
            symbolSize: 10, // 设置转折点的大小
            itemStyle: {
                color: '#05D2FA',
                borderColor: '#ffffff',
                borderWidth: 2,
                opacity: 1 // 设置转折点的透明度，1 为不透明（实心）
            },

            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgba(25,120,229,.3)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(25,120,229,0)'
                        }
                    ]
                }
            },
            data: []
        }
    ]
})
const getAfterSaleCountMonth = (type: number) => {
    const data = {
        type,
    }
    getAfterSaleCountMonthly(data).then((res) => {
        const xData = res.data.map((item: any) => item.date.split('-')[1] + '月')
        const yData = res.data.map((item: any) => item.count)
        option.value.xAxis.data = xData
        option.value.series[0].data = yData
    })
}
watch(() => props.typeNumber, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        getAfterSaleCountMonth(newVal)
    }
})
onMounted(() => {
    getAfterSaleCountMonth(1)
})
</script>
<style lang='scss' scoped></style>