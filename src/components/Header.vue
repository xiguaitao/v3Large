<template>
    <div class='Header h-[110px] '>
        <div class="Header-bg w-full h-[110px] absolute top-0 left-0"></div>
        <div class="heder-main px-[77px] py-[16px] flex justify-between box-border">
            <div class="heder-main-left flex flex-row">
                <div class="icons  flex flex-row">
                    <img class="w-[32px] h-[32px] mr-[16px]" :src="weatherImg"></img>
                </div>
                <div class="flex flex-row text-gray-50">
                    <div class="mr-[32px]">{{ weather }}</div>
                    <div>{{ temperature }}℃</div>
                </div>
            </div>
            <div class="heder-main-right flex flex-row items-center">
                <div class="text-[#B0C7D9] flex flex-row text-[20px] mr-[32px]">
                    <div class="mr-[16px]">{{ currentDate }}</div>
                    <div>{{ currentDay }}</div>
                </div>
                <div class="header-main-right-text text-[#D9F0FF] text-[26px]">{{ currentTime }}</div>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup name='Header'>

const imgs = [
    new URL('@/assets/imgs/icon-qing.png', import.meta.url).href,
    new URL('@/assets/imgs/icon-yin.png', import.meta.url).href,
    new URL('@/assets/imgs/icon-yu.png', import.meta.url).href,
    new URL('@/assets/imgs/icon-xue.png', import.meta.url).href,
]
const weatherImg = ref<string>('');
// 创建一个映射关系，将天气状况与图片 URL 相关联
const weatherConditions = {
    '晴': imgs[0],
    '阴': imgs[1],
    '雨': imgs[2],
    '雪': imgs[3],
};
const currentDate = ref<string>('');
const currentDay = ref<string>('');
const currentTime = ref<string>('');
const apiKey = '876fcc0c54dc5c7c9e410f4d387bf55a';

// 天气
const weather = ref<string>('');
const temperature = ref<string>('');
function updateTime() {
    const now = new Date();
    currentDate.value = now.toISOString().split('T')[0]; // 获取当前日期
    currentDay.value = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()]; // 获取当前星期
    currentTime.value = now.toTimeString().split(' ')[0]; // 获取当前时间
}
function getLocationByIP() {
    const url = 'http://ip-api.com/json/';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Location data based on IP:', data);
            const { lat, lon } = data;
            getCityName(lat, lon);


        })
        .catch(error => console.error('Error fetching the IP-based location:', error));
}
// 获取城市名
function getCityName(lat, lon) {
    const url = `https://restapi.amap.com/v3/geocode/regeo?key=${apiKey}&location=${lon},${lat}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Location data based on IP:', data);
            const city = data.regeocode.addressComponent.adcode;
            getWeather(city);
            // 使用获取到的经纬度调用天气API

        })
        .catch(error => console.error('Error fetching the IP-based location:', error));

}

function getWeather(zip: any) {

    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${apiKey}&city=${zip}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === '1') {
                weather.value = `${data.lives[0].weather}`;
                temperature.value = `${data.lives[0].temperature}`;
                // 根据天气状况更新图片
                weatherImg.value = weatherConditions[weather.value] || imgs[0];
            } else {
                console.error('Error fetching weather:', data);
            }
        })
        .catch(error => console.error('Error fetching the weather data:', error));
}
// 初始化时更新时间
onMounted(() => {
    getLocationByIP();
    updateTime();
    const intervalId = setInterval(updateTime, 1000); // 每秒更新时间
    onUnmounted(() => clearInterval(intervalId)); // 组件卸载时清除定时器
});
</script>
<style lang='scss' scoped>
.Header {
    .Header-bg {
        background: url('@/assets/imgs/bg-tito.png') no-repeat;
        background-size: 100% 100%;
        background-position: center;

    }

    .header-main-right-text {
        text-shadow: 0px 0px 10px #0091FF, 0px 0px 4px #0091FF;
    }
}
</style>