<template>
    <div class="echarts-box h-full">
        <div :id="uid" :style="{ width: '100%', height: '100%' }"></div>
    </div>
</template>
<script lang='ts' setup name='my-echarts'>
// import { onMounted, toRefs, watch, PropType } from "vue";
import * as echarts from "echarts";

import "echarts-gl";
let echart = echarts;
interface OptionType {
    [key: string]: any;
}


const emit = defineEmits(['mouseover', 'mouseout'])


const uid = ref('')
uid.value = new Date().getTime() + Math.random().toString(32).slice(2, 10)
const props = defineProps({
    option: {
        type: Object as PropType<OptionType>, // 添加类型验证
        required: true // 设置为必填
    }
})

const { option } = toRefs(props)
// 基础配置一下Echarts
let chart: any = null;
function initChart() {
    chart = echart.init(document.getElementById(uid.value), "dark");
    // 把配置和数据放这里
    chart.setOption(option.value);
    window.onresize = function () {
        //自适应大小
        chart.resize();
    };
    chart.on('mouseover', function (params: any) {
        emit('mouseover', chart, params)
    });
    chart.on('mouseout', function (params: any) {
        emit('mouseout', chart, params)
    });
}

const handleResize = () => {
    if (chart) {
        chart.resize();
    }
}
window.addEventListener('resize', handleResize);



onMounted(() => {
    nextTick(() => {
        initChart();
    })
});
onBeforeUnmount(() => {
    if (chart) {
        window.removeEventListener('resize', handleResize);
    }
});
// 监听数据变化，重新渲染图表
watch(option, () => {
    if (chart) {
        chart.setOption(option.value);
    }
}, { immediate: true, deep: true });


</script>
<style lang='scss'></style>