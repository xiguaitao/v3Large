/**
 *id
 *name名称
 *num数量
 *incomplete未完成数量
 *width进度条
 */
export interface list {
  id: number;
  name: string;
  num: number;
  incomplete: number;
  width: number;
}
/**
 *id
 *name 名称
 *number 数量
 *img 图片
 */
export interface list1 {
  id: number;
  name: string;
  number: number;
  img: string;
}
/**
 *id
 *name 名称
 *number 数量
 */
export interface list2 {
  id: number;
  name: string;
  number: number;
}

export interface equipmentData {
  productCount: number;
  productActivateCount: number;
  productFaultCount: number;
  amount: number;
  productOnlineCount: number;
  productOutlineCount: number;
  productUnactivateCount: number;
  productNormalCount: number;
  productTodayCount: number;
  productTodayActivateCount: number;
  todayAmount: number;
  productTodayEndCount: number;
  productDataDisplay: [];
  aftersalesTodayInstalls: [];
  productModelStatistics: [];
}
