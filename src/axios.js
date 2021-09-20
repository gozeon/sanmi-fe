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
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const code = +error.response?.status;
    if (code === 404) {
      Promise.reject(error);
      return;
    }
    if (400 < code < 500) {
      Message.error("登录信息失效，请重新登录");
    }
    if (code >= 500) {
      Message.error("系统故障，管理员正在排查中");
    }
    Promise.reject(error);

    return;
  }
);

export default axios;
