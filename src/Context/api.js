import axios from "axios";

// Tạo instance của Axios với base URL
const api = axios.create({
  baseURL: "https://66f28a6871c84d805875ad02.mockapi.io",
});

export default api;

export const fetchProductData = async (id) => {
  try {
    const response = await api.get(`/ProductSpark/${id}`); // Fetch specific product data
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
