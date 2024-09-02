import { ref } from "vue";
import type { list, list1, list2, equipmentData } from "../index.ts";
interface Response {
  data?: any; // 使用可选属性
}

// 获取设备数据
import {
  getEquipmentData,
  getActivationProduct,
  getExpireProduct,
  getExpireCard,
} from "../api/equipmentApi.ts";
const equipmentData = ref<equipmentData>({
  productCount: 0,
  productActivateCount: 0,
  productFaultCount: 0,
  amount: 0,
  productOnlineCount: 0,
  productOutlineCount: 0,
  productUnactivateCount: 0,
  productNormalCount: 0,
  productTodayCount: 0,
  productTodayActivateCount: 0,
  todayAmount: 0,
  productTodayEndCount: 0,
  productDataDisplay: [],
  aftersalesTodayInstalls: [],
  productModelStatistics: [],
});
const list1 = ref<list1[]>([
  {
    id: 0,
    name: "设备总数",
    number: 0,
    img: new URL("@/assets/imgs/icon-12.png", import.meta.url).href,
  },
  {
    id: 1,
    name: "激活设备总数",
    number: 0,
    img: new URL("@/assets/imgs/icon-13.png", import.meta.url).href,
  },
  {
    id: 2,
    name: "故障设备总数",
    number: 0,
    img: new URL("@/assets/imgs/icon-14.png", import.meta.url).href,
  },
  {
    id: 3,
    name: "续费总金额（元）",
    number: 0,
    img: new URL("@/assets/imgs/icon-15.png", import.meta.url).href,
  },
]);
const list2 = ref<list2[]>([
  {
    id: 0,
    name: "今日服务总数",
    number: 0,
  },
  {
    id: 1,
    name: "今日激活设备数",
    number: 0,
  },
  {
    id: 2,
    name: "今日缴费金额(元)",
    number: 0,
  },
  {
    id: 3,
    name: "今日待完成服务总数",
    number: 0,
  },
]);
const getEquipment = async () => {
  const res: Response = await getEquipmentData();
  if (res.data) {
    equipmentData.value = res.data;
    list1.value[0].number = res.data.productCount;
    list1.value[1].number = res.data.productActivateCount;
    list1.value[2].number = res.data.productFaultCount;
    list1.value[3].number = res.data.amount;
    list2.value[0].number = res.data.productTodayCount;
    list2.value[1].number = res.data.productTodayActivateCount;
    list2.value[2].number = res.data.todayAmount;
    list2.value[3].number = res.data.productTodayEndCount;
  }
};

// 获取激活产品统计
const activationProductData = ref([]);
const selectMonth = ref(1);
const selectDeviceMonth = (time: number) => {
  selectMonth.value = time;
  getActivationData(time);
};
const getActivationData = (time: number) => {
  const data = {
    type: time,
  };
  getActivationProduct(data).then((res: Response) => {
    if (res.data) {
      activationProductData.value = res.data;
    }
  });
};

// 获取到期数据
const selectDate = ref(1);
const endDateArr = ref([]);
const endCardArr = ref([]);
const endType = ref(1);
const seletEndType = (type: number) => {
  endType.value = type;
  if(type !== endType.value){
    if(type === 1){
      getEndDateData(selectDate.value);
    } else {
      getEndDateCard(selectDate.value);
    }
  }
};
const selectDeviceDate = (time: number) => {
  selectDate.value = time;
  if(endType.value === 1){
    getEndDateData(time);
  } else {
    getEndDateCard(time)
  }
};
const getEndDateData = (time: number) => {
  const data = {
    day: time,
  };
  getExpireProduct(data).then((res: Response) => {
    if (res.data) {
      endDateArr.value = res.data;
    }
  });
};
const getEndDateCard = (day: number) => {
  const data = {
    day,
  };
  getExpireCard(data).then((res: Response) => {
    if (res.data) {
      endCardArr.value = res.data;
    }
  });
};
export {
  equipmentData,
  getEquipment,
  list1,
  list2,
  selectDeviceMonth,
  selectMonth,
  activationProductData,
  selectDate,
  endDateArr,
  selectDeviceDate,
  endType,
  seletEndType,
  endCardArr
};
