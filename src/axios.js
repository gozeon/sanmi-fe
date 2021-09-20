import axios from "axios";
import { Message } from "element-ui";

axios.defaults.baseURL = "/api/";
axios.interceptors.request.use(
  function(config) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const code = +error.response?.status;
    if (400 < code && code < 500) {
      if (code !== 404) {
        Message.error("登录信息失效，请重新登录");
        return Promise.reject(new Error("获取信息失败"));
      }
    }
    if (code >= 500) {
      Message.error("系统故障，管理员正在排查中");
      return Promise.reject(new Error("系统故障，管理员正在排查中"));
    }
    return Promise.reject(error);
  }
);

export default axios;
