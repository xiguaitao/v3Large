<!-- /全国各省售后统计 -->
<template>
    <div class='AfterSalesStatisticsByProvince w-full h-full'>
        <Echarts :option="option"></Echarts>
    </div>
</template>
<script lang='ts' setup name='AfterSalesStatisticsByProvince'>
import Echarts from "@/components/Echarts.vue";
import * as echarts from "echarts";

/* 组件局部注册 */
const app = createApp({});
app.component('Echarts', Echarts);


//echarts
let attaData = [62, 52, 62, 52];
//渐变底色
let attackSourcesColor1 = ["#10274B", "#10274B", "#10274B", "red"];
let attackSourcesColor2 = ["#7130F2", "#7130F2", "#7130F2", "#69B3F4"];

//拼接itemStyle
function attackSourcesDataFmt(sData: any) {
    let data: any = [];
    sData.forEach((item: object, i: number) => {
        let itemStyle = {
            borderRadius: [0, 20, 20, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                    offset: 0,
                    color: attackSourcesColor1[i],
                },
                {
                    offset: 1,
                    color: attackSourcesColor2[i],
                },
            ]),
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
        formatter: " {b}     {c}户",
        axisPointer: {
            type: "shadow",
        },
    },
    grid: {
        top: "3%",
        left: "10%",
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
                padding: [16, 5],
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
            data: attackSourcesDataFmt(attaData),
        },
        {
            name: "2019",
            type: "bar",
            barWidth: 6,
            barGap: "-100%",
            z: 0,
            itemStyle: {
                borderRadius: [0, 20, 20, 0],
                color: "#2A313D",
            },

            data: [100, 100, 100, 100, 100, 100],
        },
    ],
})



</script>
<style lang='scss' scoped></style>