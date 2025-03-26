import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../Context/api";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading.json";

const fuelOptions = [
  { label: "PETROL", value: 0 },
  { label: "DIESEL", value: 1 },
  { label: "ELECTRIC", value: 2 },
  { label: "HYBRID", value: 3 },
  { label: "GAS", value: 4 },
];

export default function LessorProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`product/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleEdit = () => {
    navigate(`/lessor/product/${product.id}/edit`, { state: { product } });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getFuelTypeLabel = (value) => {
    const labels = {
      0: "Xăng",
      1: "Dầu Diesel",
      2: "Điện",
      3: "Hybrid",
      4: "Gas"
    };
    return labels[value] || "Không xác định";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="w-32"
          />
        </div>
      ) : (
        <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="md:w-3/5 p-4">
              <div className=" flex items-center justify-center h-full">
                <img
                  src={product.defaultImage}
                  alt={product.name}
                  className="max-h-[500px] w-auto object-cover"
                />
              </div>
            </div>
            
            {/* Right side - Details */}
            <div className="md:w-2/5 p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                    {product.categoryName}
                  </span>
                  <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-medium">
                    {product.brandName}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="text-2xl font-bold text-blue-600">
                  {formatPrice(product.price)} / ngày
                </div>
                <div className="text-sm text-gray-500">
                  Cửa hàng: {product.storeName}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Mô tả</h3>
                <p className="text-gray-700">
                  {product.description.replace(/<\/?[^>]+(>|$)/g, "")}
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-4 grid grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium mr-2">Kho:</span>
                  <span className="text-gray-800">{product.stock} </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium mr-2">Trọng lượng:</span>
                  <span className="text-gray-800">{product.weight} kg</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium mr-2">Kích thước:</span>
                  <span className="text-gray-800">{product.dimensions}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium mr-2">Nhiên liệu:</span>
                  <span className="text-gray-800">
                    {getFuelTypeLabel(product.fuelType)}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium mr-2">Trạng thái:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${product.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {product.status === "ACTIVE" ? "Đang hoạt động" : "Không hoạt động"}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium mr-2">Ngày tạo:</span>
                  <span className="text-gray-800">{new Date(product.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>
              
              {/* <div className="border-t border-gray-200 pt-4 flex justify-end">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                  onClick={handleEdit}
                >
                  Chỉnh sửa sản phẩm
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
