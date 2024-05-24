import axios from "axios";

const baseConfig = {
  baseURL: "http://localhost:9000",
};

const createAxiosInstance = (useAuth) => {
  const instance = axios.create(baseConfig);
  instance.defaults.headers.common["Content-Type"] = "application/json";
  if (useAuth) {
    instance.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem("jwt");
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  return instance;
};

export default {
  service: createAxiosInstance,
};
