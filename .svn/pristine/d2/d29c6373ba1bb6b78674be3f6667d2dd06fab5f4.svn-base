<!-- 用户增量 -->
<template>
    <div class='TotalNumberOfAfterSalesService w-full h-full'>
        <Echarts v-if="option.series[0].data.length > 0" :option="option"></Echarts>
        <div v-else class="flex justify-center items-center h-full text-[#909399] text-[12px]">
            暂无数据
        </div>
    </div>
</template>
<script lang='ts' setup name='userNumber'>

import Echarts from "@/components/Echarts.vue";
const props = defineProps({
    addConutArr: {
        type: Array,
        default: () => []

    }
})


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
                width: 30, // 设置竖线宽度为5
                shadowBlur: 0, // 设置边框宽度为40
                type: 'solid' // 设置竖线为实线
            }
        }
    },
    grid: {
        top: "8%",
        left: "0%",
        right: "3%",
        bottom: "0%",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: [],
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
            smooth: true,
            symbol: 'circle',
            lineStyle: {
                color: '#7130F2'
            },
            symbolSize: 6, // 设置转折点的大小
            itemStyle: {
                color: '#69B3F4',
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
                            color: 'rgba(113,48,242,0.4)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(113,48,242,0.03)'
                        }
                    ]
                }
            },
            data: []
        }
    ]
})
option.value.series[0].data = []
option.value.xAxis.data = []
props.addConutArr.forEach((item: any, index: number) => {
    option.value.series[0].data[index] = item.count
    option.value.xAxis.data[index] = item.date.split("-")[1] + "月"
})
watch(() => props.addConutArr, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        option.value.series[0].data = []
        option.value.xAxis.data = []
        props.addConutArr.forEach((item: any, index: number) => {
            option.value.series[0].data[index] = item.count
            option.value.xAxis.data[index] = item.date.split("-")[1] + "月"
        })
    }
})
</script>
<style lang='scss' scoped></style>