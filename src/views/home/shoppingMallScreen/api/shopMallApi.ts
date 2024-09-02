import axios from "../../../../api/index.ts";
// /water-platform-originators-api/display/mall/getData
export const getTodayOrder = () => {
  return axios.get("/water-platform-admin-api/display/mall/getData");
};

// 用户新增
export const getCustomerAddStatistics = (data: object) => {
  return axios.get(
    "/water-platform-admin-api/display/mall/getCustomerAddStatistics",
    data
  );
};

// 获取销售趋势分析数据
export const getGoodsOrderMoneyStatistics = (data: object) => {
  return axios.get(
    "/water-platform-admin-api/display/mall/getGoodsOrderMoneyStatistics",
    data
  );
};

// 订单数统计分析
// /water-platform-originators-api/display/mall/getGoodsOrderCountMonthly
export const getGoodsOrderCountMonthly = (data: object) => {
  return axios.get(
    "/water-platform-admin-api/display/mall/getGoodsOrderCountMonthly",
    data
  );
};
// 新增商品分析
// /water-platform-originators-api/display/mall/getGoodsAddCountMonthly
export const getGoodsAddCountMonthly = (data: object) => {
  return axios.get(
    "/water-platform-admin-api/display/mall/getGoodsAddCountMonthly",
    data
  );
};
