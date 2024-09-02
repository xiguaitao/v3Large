<!-- 服务类型分析 -->
<template>
    <div class='ServiceTypeAnalysis  w-full h-full'>
        <Echarts v-if="option.series.length > 0" :option="option"></Echarts>
        <div v-else class="flex justify-center items-center h-full text-[#909399] text-[12px]">
            暂无数据
        </div>
    </div>
</template>
<script lang='ts' setup name='ServiceTypeAnalysis'>
import Echarts from "@/components/Echarts.vue";
import { getAfterSaleCountMonthlyByType } from "../api/serviceScreensApi.ts";
import { watch } from "vue";

/* 组件局部注册 */
const app = createApp({});
app.component('Echarts', Echarts);
const props = defineProps({
    typeNumber: {
        type: Number,
        default: 1
    }
})



let obj = {
    xData: [],
    legend: ["水机安装", "滤芯更换", "故障报修", "其他"],
    lineData: [
        {
            name: "水机安装",
            data: [],
            color: "#1977E5",
        },
        {
            name: "滤芯更换",
            data: [],
            color: "#05D2FA",
        },
        {
            name: "故障报修",
            data: [],
            color: "#7130F2",
        },
        {
            name: "其他",
            data: [],
            color: "#FDBD00",
        },
    ],
};
const getSerData = (objData: any) => {
    // 检查所有data是否都是空数组
    const allDataEmpty = objData.lineData.every(item => item.data.length === 0);

    // 如果所有data都是空数组，则直接返回空数组
    if (allDataEmpty) {
        return [];
    }
    const getData = []
    objData.lineData.forEach((item) => {
        getData.push({
            name: item.name,
            type: "line",
            symbol: "circle",
            yAxisIndex: 0,
            symbolSize: 8,
            itemStyle: {
                color: item.color,
                lineStyle: {
                    color: item.color,
                    width: 2,
                },
            },
            emphasis: {
                scale: true, // 放大图形
                label: {
                    show: true, // 显示标签
                    position: "top", // 标签位置
                    formatter: "{c}", // 标签内容格式化
                    color: "#D9F0FF", // 字体颜色
                    fontSize: 12, // 字体大小
                },
            },
            data: item.data,
        });

    });
    return getData
}
let serData = [];
serData = getSerData(obj)
const option = ref({
    backgroundColor: "transparent",
    legend: {
        // icon: "circle",
        top: "0%",
        //   right: 'center',
        orient: "horizontal", //图例方向【horizontal/vertical】
        itemHeight: 10, //修改icon图形大小
        itemWidth: 10, //修改icon图形大小
        icon: "stack",
        selectedMode: true, //不允许点击图例
        itemGap: 50,
        fontSize: 12,
        color: "#fff",
        padding: [0, 0],
        data: obj.legend,
    },
    tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "#0a2b45", // 设置背景颜色
        // color: "#333",
        color: "#fff",
        fontSize: 14,
        borderColor: "rgba(255, 255, 255, .16)",
        axisPointer: {
            lineStyle: {
                color: "rgba(28, 124, 196)",
            },
            type: "shadow",
        },
        formatter: (params: any) => {
            let arr = [...params];
            let str = "";
            arr.forEach((item, index) => {
                str +=
                    '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                    obj.lineData[index].color +
                    ';"></span>' +
                    item.seriesName +
                    "  " +
                    item.data +
                    "个<br />";
            });
            str = arr[0].name + "<br />" + str;
            return str;
        },
    },

    grid: {
        top: "19%",
        left: "0%",
        right: "3%",
        bottom: "0%",
        containLabel: true,
    },
    xAxis: [
        {
            type: "category",
            axisLine: {
                show: false,
                lineStyle: {
                    color: "red",
                },
            },
            axisLabel: {
                interval: 0,
                align: "center",
                margin: 10,
                color: "rgb(139, 143, 147)",
                rotate: 0,
                fontSize: 14,
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            boundaryGap: true,
            data: obj.xData,
        },
    ],

    yAxis: [
        {
            type: "value",
            // name: "单位：个",
            // nameTextStyle: {
            //    //y轴上方单位的颜色
            //    color: "rgb(139, 143, 147)",
            // },
            // splitNumber: 6,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#81b0d0",
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "rgba(221, 228, 241,.3)",
                    // type: "dashed",
                },
            },
            axisLabel: {
                color: "rgb(139, 143, 147)",
                fontSize: 14,
            },
            axisTick: {
                show: false,
            },
        },
    ],
    series: serData,
})
const getAfterSaleCountMonth = (type: number) => {
    const data = {
        type,
    }
    getAfterSaleCountMonthlyByType(data).then((res) => {
        obj.xData = []
        res.data[0].aftersalesCountMonthly.forEach((item) => {
            obj.xData.push(item.date.split('-')[1] + '月')
        })


        // 更新 obj.lineData
        res.data.forEach((item, index) => {
            obj.lineData[index].data = []
            item.aftersalesCountMonthly.forEach((item2) => {
                obj.lineData[index].data.push(item2.count)
            })
        });
        serData = getSerData(obj)
        option.value.xAxis[0].data = obj.xData
        option.value.series = serData

    })
}
console.log(option.value.series, 'opton')
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