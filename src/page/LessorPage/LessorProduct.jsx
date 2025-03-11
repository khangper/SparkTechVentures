import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import loadingAnimation from "../../assets/loading.json";
import Lottie from "lottie-react";
import api from "../../Context/api";

export default function LessorProduct() {
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          "auth/user-infor",
        
        );
        setUserInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [token]);

  useEffect(() => {
    if (!userInfo?.storeId) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `product/by-store/${userInfo.storeId}`
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userInfo]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="w-32"
          />
        </div>
      ) : (
        <>
          <div className="mb-6 flex gap-4 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            <Link
              to={`/lessor/add-product`}
              className="no-underline text-white"
            >
              <button
                // onClick={() => navigate("/lessor/add-product")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus size={20} />
                <span>Add Product</span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={product.defaultImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 min-h-[56px]">
                    {product.name}
                  </h3>
                  <p
                    className="text-sm text-gray-900 min-h-[40px]"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2, 
                      overflow: "hidden",
                    }}
                  >
                    {product.description.replace(/<\/?[^>]+(>|$)/g, "")}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-500">
                     
                      {product.price.toLocaleString("vi-VN")} VNĐ
                    </span>
                    <button
                      onClick={() => navigate(`/lessor/product/${product.id}`)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {products.length === 0
                  ? "There are no products yet. Add a new one!"
                  : "No matching products found."}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
