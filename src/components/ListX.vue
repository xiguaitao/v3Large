<template>
  <div class='ListX'>
    <div class="left-top-content-list-item">
      <div class="name">{{ props.title }}</div>
      <div class="num">
        未完成 <span>{{ props.incomplete }}</span> / 总数
        <span>{{ props.total }}</span>
      </div>
    </div>
    <div :class="props.sty ? 'xian' : 'xian2'">
      <div class="xian-item" :style="{ width: props.percentage + '%' }">
        <div class="quan">
          <div class="dian"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup name='ListX'>
const props = defineProps({
  title: {
    type: String,
    default: 0,
  },
  incomplete: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  percentage: {
    type: Number,
    default: 0,
  },
  sty: {
    type: Boolean,
    default: true
  }
})
</script>
<style lang='scss' scoped>
.ListX {
  .left-top-content-list-item {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;

    .name {
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      font-size: 12px;
      color: #05d2fa;
    }

    .num {
      font-family: PingFang SC, PingFang SC;
      font-size: 12px;
      color: #738a99;

      span {
        font-family: PingFang SC, PingFang SC;
        font-size: 14px;
        color: #05d2fa;
      }
    }
  }

  .xian {
    height: 6px;
    background: #29303c;
    margin-top: 4px;

    .xian-item {
      position: relative;
      width: 80%;
      height: 6px;
      background: linear-gradient(90deg, #10274b 0%, #05d2fa 100%);
      border-radius: 0px 3px 3px 0px;
      transition: all 0.5s;

      .quan {
        position: absolute;
        right: -5px;
        top: -4px;
        width: 12px;
        height: 12px;
        box-shadow: 0px 0px 4px 0px #07c6ed;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;

        .dian {
          width: 6px;
          height: 6px;
          background: #ffffff;
          border-radius: 50%;
        }
      }
    }
  }

  .xian2 {
    height: 6px;
    background: #29303c;
    margin-top: 4px;

    .xian-item {
      position: relative;
      width: 80%;
      height: 6px;
      background: linear-gradient(90deg, #10274b 0%, #1978e5 100%);
      border-radius: 0px 3px 3px 0px;
      transition: all 0.5s;
    }
  }
}
</style>