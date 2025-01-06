import axios from "axios";

// Tạo instance của Axios với base URL
const api = axios.create({
  baseURL: "https://66f28a6871c84d805875ad02.mockapi.io",
});

export default api;
