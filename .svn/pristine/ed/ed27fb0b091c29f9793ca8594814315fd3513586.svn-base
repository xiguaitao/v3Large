<!-- 用户增量 -->
<template>
    <div class='TotalNumberOfAfterSalesService w-full h-full'>
        <Echarts v-if="option.series[0].data.length > 0" :option="option"></Echarts>
        <div v-else class="flex justify-center items-center h-full text-[#909399] text-[12px]">
            暂无数据
        </div>
    </div>
</template>
<script lang='ts' setup name='orderNumber'>
const props = defineProps({
    orderNumberData: {
        type: Array,
        default: () => []
    }
})
import Echarts from "@/components/Echarts.vue";

const option = ref({
    backgroundColor: "#121A2700",
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
                width: 40, // 设置竖线宽度为5
                shadowBlur: 0, // 设置边框宽度为40
                type: 'solid' // 设置竖线为实线
            }
        }
    },
    grid: {
        top: "5%",
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
            type: 'bar',
            showSymbol: false,


            barWidth: 24,
            itemStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#7130F280' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#7130F210' // 100% 处的颜色
                        }]
                    }
                },
                // 设置强调（选中）样式
                emphasis: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#69B3F480' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#69B3F410' // 100% 处的颜色
                        }]
                    }
                },

            },

            // areaStyle: {
            //     color: {
            //         type: 'linear',
            //         x: 0,
            //         y: 0,
            //         x2: 0,
            //         y2: 1,
            //         colorStops: [
            //             {
            //                 offset: 0,
            //                 color: 'rgba(113,48,242,0.4)'
            //             },
            //             {
            //                 offset: 1,
            //                 color: 'rgba(113,48,242,0.03)'
            //             }
            //         ]
            //     }
            // },
            data: [500, 800, 1200, 900, 800, 600, 700, 1400]
        }
    ]
})
watch(() => props.orderNumberData, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        option.value.series[0].data = []
        option.value.xAxis.data = []
        props.orderNumberData.forEach((item: any, index: number) => {
            option.value.series[0].data[index] = item.count
            option.value.xAxis.data[index] = item.date.split("-")[1] + "月"
        })
    }
})
</script>
<style lang='scss' scoped></style>