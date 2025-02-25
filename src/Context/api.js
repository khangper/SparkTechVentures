import axios from "axios";

const api = axios.create({
  baseURL: "https://constructionequipmentrental-f7d4esd5a9g4gjfv.southeastasia-01.azurewebsites.net/api",
  timeout: 500000,
});

// ✅ Interceptor cho request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
