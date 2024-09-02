import { ref } from "vue";
import type { list2 } from "../index.ts";
interface Response {
  data?: any; // 使用可选属性
}
import {
  getTodayOrder,
  getCustomerAddStatistics,
  getGoodsOrderMoneyStatistics,
  getGoodsOrderCountMonthly,
  getGoodsAddCountMonthly,
} from "../api/shopMallApi";
const tableData = ref([
  {
    date: "BHQ001",
    type: "水机安装",
    name: "赵宇轩",
    phone: "13259547585",
    state: "待接单",
  },
  {
    date: "BHQ001",
    type: "水机安装",
    name: "赵宇轩",
    phone: "13259547585",
    state: "待接单",
  },
]);
const todayObj = ref({
  todayAmount: 0,
  todayOrderCount: 0,
  todaySendOrderCount: 0,
  todayRefundOrder: 0,
  todayAddGoodsCount: 0,
  todayAddCustomerCount: 0,
  todayAddUnionCount: 0,
});
const customerBuyGoodsMoneyRank = ref([]);
const customerBuyGoodsCountRank = ref([]);
const goodsBuyRank = ref([]);
const goodsBuyRankUnion = ref([]);
const goodsTotalCount = ref({ selfSupportCount: 0, unionSupportCount: 0 });
// 中间总数
const list2 = ref<list2[]>([
  {
    id: 0,
    name: "总交易金额（元）",
    number: 0,
  },
  {
    id: 1,
    name: "总交易订单量",
    number: 0,
  },
  {
    id: 2,
    name: "总用产数",
    number: 0,
  },
  {
    id: 3,
    name: "总商品效",
    number: 0,
  },
  {
    id: 3,
    name: "总联盟商家数",
    number: 0,
  },
]);
const getTodayOrderData = async () => {
  const res: Response = await getTodayOrder();
  tableData.value = res.data.goodsOrderStatisticsTodays;
  todayObj.value.todayAmount = res.data.todayAmount;
  todayObj.value.todayOrderCount = res.data.todayOrderCount;
  todayObj.value.todaySendOrderCount = res.data.todaySendOrderCount;
  todayObj.value.todayRefundOrder = res.data.todayRefundOrder;
  todayObj.value.todayAddGoodsCount = res.data.todayAddGoodsCount;
  todayObj.value.todayAddCustomerCount = res.data.todayAddCustomerCount;
  todayObj.value.todayAddUnionCount = res.data.todayAddUnionCount;
  customerBuyGoodsMoneyRank.value = res.data.customerBuyGoodsMoneyRank;
  customerBuyGoodsCountRank.value = res.data.customerOderCountRank;
  goodsTotalCount.value.selfSupportCount =
    res.data.goodsTotalCount.selfSupportCount;
  goodsTotalCount.value.unionSupportCount =
    res.data.goodsTotalCount.unionSupportCount;
  goodsBuyRank.value = res.data.goodsBuyRank || [];
  goodsBuyRankUnion.value = res.data.goodsBuyRankUnion || [];
  list2.value[0].number = res.data.totalAmount;
  list2.value[1].number = res.data.totalOrderCount;
  list2.value[2].number = res.data.totalCustomerCount;
  list2.value[3].number = res.data.goodsCount;
  list2.value[4].number = res.data.totalUnionCount;
};
const selectedRange = ref(3);
// 监听选择变化
const onChange = (e: any) => {
  selectedRange.value = e.target.value;
  getCustomerAddStatisticsMonth(selectedRange.value);
};
const addConutArr = ref([]);
const addNumInfo = ref({
  cyclical: 0,
  same: 0,
});
const getCustomerAddStatisticsMonth = async (type: number) => {
  const data = {
    type,
  };
  const res: Response = await getCustomerAddStatistics(data);
  addConutArr.value = res.data.customerDataStatistics;
  addNumInfo.value.cyclical = res.data.qoq;
  addNumInfo.value.same = res.data.yoy;
};

// 销售趋势分析
const saleTime = ref(1);
const changeTime = (time: number) => {
  saleTime.value = time;
  getSaleData(time);
};
const saleData = ref([]);
const saleNumInfo = ref({
  cyclical: 0,
  same: 0,
});
const getSaleData = (time: number) => {
  const data = {
    type: time,
  };
  getGoodsOrderMoneyStatistics(data).then((res: Response) => {
    saleData.value = res.data.goodsOrderMoneyStatistics;
    saleNumInfo.value.cyclical = res.data.qoq;
    saleNumInfo.value.same = res.data.yoy;
  });
};

// 订单统计分析
const orderNumberData = ref([]);
const orderType = ref(1);
const selectOrderMonth = (time: number) => {
  orderType.value = time;
  getOrderMonth(time);
};
const getOrderMonth = (time: number) => {
  const data = {
    type: time,
  };
  getGoodsOrderCountMonthly(data).then((res: Response) => {
    orderNumberData.value = res.data;
  });
};

// 新增商品分析
const addProduct = ref([]);
const addProductType = ref(1);
const selectAddProductMonth = (time: number) => {
  addProductType.value = time;
  getAddProductMonth(time);
};
const getAddProductMonth = (time: number) => {
  const data = {
    type: time,
  };
  getGoodsAddCountMonthly(data).then((res: Response) => {
    addProduct.value = res.data;
  });
};
export {
  tableData,
  getTodayOrderData,
  todayObj,
  customerBuyGoodsMoneyRank,
  customerBuyGoodsCountRank,
  goodsTotalCount,
  goodsBuyRank,
  goodsBuyRankUnion,
  onChange,
  selectedRange,
  addConutArr,
  getCustomerAddStatisticsMonth,
  list2,
  saleTime,
  changeTime,
  saleData,
  getSaleData,
  addNumInfo,
  selectOrderMonth,
  orderType,
  saleNumInfo,
  orderNumberData,
  addProduct,
  addProductType,
  selectAddProductMonth,
};
