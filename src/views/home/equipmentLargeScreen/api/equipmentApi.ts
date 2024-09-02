import axios from "../../../../api/index.ts";

// /water-platform-originators-api/display/product/getData
export const getEquipmentData = () => {
  return axios.get("/water-platform-admin-api/display/product/getData");
};

// 设备激活统计
export const getActivationProduct = (data: object) => {
  return axios.get(
    "/water-platform-admin-api/display/product/getActivationProduct",
    data
  );
};

// 获取指定日期到期的设备信息列表
export const getExpireProduct = (data: object) => {
  return axios.get(
    "/water-platform-admin-api/display/product/getExpireProduct",
    data
  );
};
// 获取指定日期到期的物联卡列表
// /water-platform-originators-api/display/product/getExpireCard
export const getExpireCard = (data: object) => {
  return axios.get(
    "/water-platform-admin-api/display/product/getExpireCard",
    data
  );
};
