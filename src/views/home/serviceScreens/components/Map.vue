<template>
        <div class='Map w-full h-full'>
                <Echarts :option="option" @mouseover="mouseover" @mouseout="mouseout"></Echarts>
        </div>
</template>
<script lang='ts' setup name='Map'>
import Echarts from "@/components/Echarts.vue";
import geoJson from "@/assets/map.json";
import * as echarts from "echarts";
const props = defineProps({
        listData: {
                type: Array,
                default: []
        }
})
/* 组件局部注册 */
const app = createApp({});
app.component('Echarts', Echarts);

echarts.registerMap('china', geoJson);
// 解析 JSON 数据以获取每个省份的中心点坐标
const parsedGeoJson = JSON.parse(JSON.stringify(geoJson));
const geoCoordMap = {};
parsedGeoJson.features.forEach(feature => {
        const name = feature.properties.name;
        const center = feature.properties.center;
        geoCoordMap[name] = center;
});
var imageURL = new URL('@/assets/imgs/icon-dingwei.png', import.meta.url).href



var data1 = [
        { provinceName: "黑龙江", value: 199 },
        { provinceName: "内蒙古", value: 42 },
        { provinceName: "吉林", value: 102 },
        { provinceName: "北京市", value: 81 },
        { provinceName: "辽宁", value: 47 },
        { provinceName: "河北", value: 67 },
        { provinceName: "天津", value: 82 },
        { provinceName: "山西", value: 123 }
];
data1 = props.listData

// 将数据转换为 ECharts 所需的格式
const convertData = function (data, geoCoordMap) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].provinceName];
                if (geoCoord) {
                        res.push({
                                name: data[i].provinceName,
                                value: geoCoord,
                                showValue: data[i].totalCount
                        });
                }
                // res.push({
                //         name: data[i].provinceName,
                //         value: data[i].value

                // });
        }
        return res;
};

const showData = (data) => {
        const resData = []
        data.forEach((item) => {
                resData.push({
                        name: item.provinceName,
                        value: item.value
                })
        })
        return resData
}

const option = ref({
        backgroundColor: "transparent",
        title: {
                show: false,
        },

        tooltip: {
                trigger: 'item',
                triggerOn: 'none',
                enterable: true,
                padding: 0,
                backgroundColor: "transparent",
                borderColor: "transparent",
                transitionDuration: 0.3,
                formatter: function (params: any) {
                        var html = ` <div style="display:flex; height: 58px;">
        <div style="width: 2px; height: 100%; background: #FDBD00; "></div>
        <div style="flex-1">
          <div
            style="background: rgba(13,10,0,0.5);padding: 4px 16px;text-align: center;font-size: 16px;color: #FFFFFF;">
            ${params.name}</div>
          <div
            style="background: rgba(253,189,0,0.3);padding: 4px 16px;text-align: center;font-size: 12px;color:#9CB1BB;">
            数值：<span style="color:#D9F0FF;">${params.data.showValue}</span></div>
        </div>
      </div>`;
                        return html;
                }
        },
        geo: {
                map: 'china',
                show: true,
                roam: false,
                zoom: 1.1,
                top: '15%',
                label: {
                        show: false,
                        emphasis: {
                                show: false,
                        }
                },
                itemStyle: {
                        areaColor: 'transparent',
                        borderColor: '#80B5E8',//线
                        emphasis: {
                                areaColor: 'rgba(128,181,232,.3)',//悬浮区背景
                        }
                }
        },
        series: [
                {

                        symbolSize: 5,
                        label: {
                                show: false,
                        },
                        itemStyle: {
                                color: "transparent",
                        },

                        name: 'light',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: showData(props.listData),

                },
                {
                        name: '数据',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol: 'image://' + imageURL,
                        symbolSize: [30, 30],
                        data: convertData(data1, geoCoordMap),
                        showEffectOn: 'render',
                        rippleEffect: {
                                brushType: 'stroke'
                        },
                        emphasis: {
                                scale: true
                        },
                        zlevel: 1
                },

        ]
});



const mouseover = (chart: any, params: any) => {

        chart.dispatchAction({
                type: 'showTip',
                seriesIndex: 1,
                dataIndex: params.dataIndex,
        });
}
const mouseout = (chart: any, params: any) => {
        chart.dispatchAction({
                type: 'hideTip',
                seriesIndex: 1,
                dataIndex: params.dataIndex,
        });
}

watch(() => props.listData, (newVal, oldVal) => {
        if (newVal !== oldVal) {
                option.value.series[0].data = showData(props.listData);
                option.value.series[1].data = convertData(newVal, geoCoordMap);

        }
})




</script>
<style lang='scss' scoped>
.box {
        /* background-color: transparent */
}
</style>