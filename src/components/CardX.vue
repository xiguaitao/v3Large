<template>
    <div class='CardX w-full flex flex-col overflow-auto'>
        <div class="CardX-hezder w-full h-[36px] flex flex-row">
            <div class=" bg-[rgba(21,86,162,0.3)] w-full h-full flex items-center justify-center">
                <div class="CardX-hezder-title flex flex-row items-center justify-center h-full">
                    <div class="text-[#D9F0FF] font-medium text-[20] text-shadow bg-img">{{ porps.title }}</div>
                </div>
            </div>
        </div>
        <div class="flex-1 overflow-auto pb-[16px] box-border mt-[16px]">
            <slot></slot>
        </div>
    </div>
</template>
<script lang='ts' setup name='CardX'>
const porps = defineProps({
    title: {
        type: String,
        default: '标题'
    },
})
</script>
<style lang='scss' scoped>
.CardX {
    .CardX-hezder::before {
        display: block;
        content: "";
        width: 4px;
        height: 36px;
        margin-right: 4px;
        background: #1977E5;
    }

    .CardX-hezder-title::after,
    .CardX-hezder-title::before {
        display: block;
        content: "";
        width: 10px;
        height: 10px;
        background-size: 100% 100%;
    }

    .CardX-hezder-title::after {
        background-image: url(../assets/imgs/sanjiao-right.png);
        margin-left: 16px;
    }

    .CardX-hezder-title::before {
        background-image: url(../assets/imgs/sanjiao-left.png);
        margin-right: 16px;
    }

    .bg-img {
        background-image: url(../assets/imgs/bg-textImg.png);
        background-size: 100% 100%;
    }
}
</style>