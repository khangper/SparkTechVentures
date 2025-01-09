// import axios from "axios";

// // Tạo instance của Axios với base URL
// const api = axios.create({
//   // baseURL: "https://66f28a6871c84d805875ad02.mockapi.io",
//   baseURL: "http://localhost:5083/api",
// });

// export default api;

import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5083/api", // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json", // Set the default Content-Type header
  },
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
