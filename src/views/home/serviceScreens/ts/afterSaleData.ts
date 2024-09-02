import { ref } from "vue";
import type { list, list1, list2 } from "../index.ts";
import {
  getAfterSaleData,
  getAfterSaleProductCount,
} from "../api/serviceScreensApi.ts";
const list = ref<list[]>([]);
const list1 = ref<list1[]>([
  {
    id: 0,
    name: "服务总数",
    number: 0,
    img: new URL("@/assets/imgs/icon-1.png", import.meta.url).href,
  },
  {
    id: 1,
    name: "未完成售后数",
    number: 0,
    img: new URL("@/assets/imgs/icon-2.png", import.meta.url).href,
  },
  {
    id: 2,
    name: "待装机数",
    number: 0,
    img: new URL("@/assets/imgs/icon-3.png", import.meta.url).href,
  },
  {
    id: 3,
    name: "待更换滤芯数",
    number: 0,
    img: new URL("@/assets/imgs/icon-4.png", import.meta.url).href,
  },
  {
    id: 4,
    name: "已完成服务数",
    number: 0,
    img: new URL("@/assets/imgs/icon-5.png", import.meta.url).href,
  },
]);
const list2 = ref<list2[]>([
  {
    id: 0,
    name: "今日服务总数",
    number: 3562,
  },
  {
    id: 1,
    name: "今日安装数",
    number: 3562,
  },
  {
    id: 2,
    name: "今日售后数",
    number: 3562,
  },
  {
    id: 3,
    name: "今日待完成服务总数",
    number: 3562,
  },
]);
const getAfterSaleDataList = () => {
  getAfterSaleData().then((res) => {
    console.log("res ::: ", res);
    list.value = res.data.aftersalesStatisticsByRegions;
    list1.value[0].number = res.data.totalAftersaleCount;
    list1.value[1].number = res.data.unFinishedAftersaleCount;
    list1.value[2].number = res.data.waitingInstallAftersaleCount;
    list1.value[3].number = res.data.waitingChangeFilterAftersaleCount;
    list1.value[4].number = res.data.finishAftersaleCount;
    list2.value[0].number = res.data.todayAftersaleCount;
    list2.value[1].number = res.data.todayInstallAftersaleCount;
    list2.value[2].number = res.data.todayAftersaleCount1;
    list2.value[3].number = res.data.todayNoFinishedAftersaleCount;
    tableData.value = res.data.aftersalesTodayInstalls;
  });
};

const toggle1 = ref(1);
const setToggle1 = (index: number) => {
  toggle1.value = index;
};
const getProductCount = (type: number) => {
  const data = {
    type,
  };
  getAfterSaleProductCount(data).then((res) => {
    console.log("res ::: ", res);
  });
};

// 今日服务
const tableData = ref([]);
export {
  list,
  list1,
  list2,
  getAfterSaleDataList,
  toggle1,
  setToggle1,
  getProductCount,
  tableData,
};
