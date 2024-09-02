import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { ElMessage } from "element-plus";
// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
  code: number;
  msg: string;
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
  data?: T;
}
const URL: string = import.meta.env.VITE_APP_BASE_API || "/api";
enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200, // 请求成功
}
const config = {
  // 默认地址
  baseURL: URL as string,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
};

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);

    // 移除请求拦截器中的令牌检查逻辑
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 不再添加或检查令牌
        return config;
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error);
      }
    );

    // 响应拦截器保持不变
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response;
        if (data.code === RequestEnums.OVERDUE) {
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          localStorage.setItem("token", "");
          // router.replace({
          //   path: '/login'
          // })
          return Promise.reject(data);
        }
        if (data.code && data.code !== RequestEnums.SUCCESS) {
          ElMessage.error(data);
          return Promise.reject(data);
        }
        return data;
      },
      (error: AxiosError) => {
        const { response } = error;
        if (response) {
          this.handleCode(response.status);
        }
        if (!window.navigator.onLine) {
          ElMessage.error("网络连接失败");
          // 可以跳转到错误页面，也可以不做操作
          // return router.replace({
          //   path: '/404'
          // });
        }
      }
    );
  }

  // 常用方法封装
  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params });
  }
  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params);
  }
  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params);
  }
  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params });
  }
}

// 导出一个实例对象
export default new RequestHttp(config);
