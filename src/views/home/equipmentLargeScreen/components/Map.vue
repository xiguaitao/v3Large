<template>
        <div class='Map w-full h-full'>
                <Echarts :option="option" @mouseover="mouseover" @mouseout="mouseout"></Echarts>
        </div>
</template>
<script lang='ts' setup name='Map'>
import Echarts from "@/components/Echarts.vue";
import geoJson from "@/assets/map.json";
import * as echarts from "echarts";

/* 组件局部注册 */
const app = createApp({});
app.component('Echarts', Echarts);

echarts.registerMap('china', geoJson);
var imageURL = new URL('@/assets/imgs/icon-dingwei.png', import.meta.url).href
var geoCoordMap = {
        '黑龙江': [127.9688, 45.368],
        '内蒙古': [110.3467, 41.4899],
        "吉林": [125.8154, 44.2584],
        '北京市': [116.4551, 40.2539],
        "辽宁": [123.1238, 42.1216],
        "河北": [114.4995, 38.1006],
        "天津": [117.4219, 39.4189],
        "山西": [112.3352, 37.9413]

};
var geoCoordMap2 = {
        '食堂1': [126.4688, 45.368],
        '食堂2': [109.3467, 41.4899],
        "食堂3": [124.8154, 44.2584],
        '食堂4': [115.4551, 40.2539],
        "食堂5": [122.1238, 42.1216],
        "食堂6": [113.8995, 38.5006],
        "食堂7": [116.4219, 38.4189],
        "食堂8": [111.3352, 36.9413]
}
var data1 = [
        { name: "黑龙江", value: 199 },
        { name: "内蒙古", value: 42 },
        { name: "吉林", value: 102 },
        { name: "北京市", value: 81 },
        { name: "辽宁", value: 47 },
        { name: "河北", value: 67 },
        { name: "天津", value: 82 },
        { name: "山西", value: 123 }
];
var data2 = [
        { name: "食堂1", value: 199, adr: "黑龙江街道" },
        { name: "食堂2", value: 42, adr: "内蒙古街道" },
        { name: "食堂3", value: 102, adr: "吉林街道" },
        { name: "食堂4", value: 81, adr: "北京市街道" },
        { name: "食堂5", value: 47, adr: "辽宁街道" },
        { name: "食堂6", value: 67, adr: "河北街道" },
        { name: "食堂7", value: 82, adr: "天津街道" },
        { name: "食堂8", value: 123, adr: "山西街道" }
]

var convertData = function (data: any, geoCoordMap: any) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                        res.push({
                                name: data[i].name,
                                value: geoCoord
                        });
                }
        }
        return res;
};



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
                formatter: function (params) {
                        var html = ` <div style="display:flex; height: 58px;">
            <div style="width: 2px; height: 100%; background: #FDBD00; "></div>
            <div style="flex-1">
                <div
                    style="background: rgba(13,10,0,0.5);padding: 4px 16px;text-align: center;font-size: 16px;color: #FFFFFF;">
                    新疆维吾尔自治区</div>
                <div
                    style="background: rgba(253,189,0,0.3);padding: 4px 16px;text-align: center;font-size: 12px;color:#9CB1BB;">
                    售后：<span style="color:#D9F0FF;">217</span></div>
            </div>
        </div>`
                        return html
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
                        data: convertData(data1, geoCoordMap),

                },
                {
                        name: '数据',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol: 'image://' + imageURL,
                        symbolSize: [30, 30],
                        data: convertData(data2, geoCoordMap2),
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





</script>
<style lang='scss' scoped>
.box {
        /* background-color: transparent */
}
</style>