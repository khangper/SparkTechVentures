import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowRightLeft, ChevronRight, Home, Plus, ShoppingCart } from "lucide-react";
import api from "../Context/api";
import toast from "react-hot-toast";

const fuelOptions = [
  { label: "XĂNG", value: 0 },
  { label: "DẦU DIESEL", value: 1 },
  { label: "ĐIỆN", value: 2 },
  { label: "HYBRID", value: 3 },
  { label: "GAS", value: 4 },
];

export default function Compare() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const idt = params.id;
  const location = useLocation();
  const secondProduct = location.state?.secondProduct;
  const mode = location.state?.mode;
  const [productSecond, setProductSecond] = useState("");
  const [images, setImages] = useState([]);
  const [imageSecond, setImageSecond] = useState([]);

  useEffect(() => {
    const apiProduct = async () => {
      try {
        const response = await api.get(`/product/${secondProduct}`);
        setProductSecond(response.data.data);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchProductImage = async () => {
      try {
        const response = await api.get(
          `productimage/by-product/${secondProduct}`
        );
        if (response.data.isSuccess) {
          setImageSecond(response.data.data);
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    if (secondProduct) {
      fetchProductImage();
      apiProduct();
    }
  }, [secondProduct]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/${idt}`);
        if (response.data.isSuccess) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProductImage = async () => {
      try {
        const response = await api.get(`productimage/by-product/${idt}`);
        if (response.data.isSuccess) {
          setImages(response.data.data);
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductImage();
    fetchProduct();
  }, [idt]);

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock === 0) {
      toast.error("This product is out of stock.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    const existingCart = sessionStorage.getItem("cartItems");
    let cartItems = existingCart ? JSON.parse(existingCart) : [];

    if (cartItems.length > 0) {
      const existingStore = cartItems[0].storeId;
      if (existingStore !== product.storeId) {
        toast.error("You can only order products from the same store.");
        return;
      }
    }

    const productIndex = cartItems.findIndex(
      (item) => item.productId === product.id
    );

    if (productIndex >= 0) {
      if (cartItems[productIndex].quantity + 1 > product.stock) {
        toast.error("Not enough stock available.");
        return;
      }
      cartItems[productIndex].quantity += 1;
    } else {
      cartItems.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        defaultImage: product.defaultImage,
        storeId: product.storeId,
      });
    }

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    toast.success("Product added to cart!");
  };

  const handleRedirectToHomePage = () => {
    navigate("/all", { state: { mode: "compare", productId: `${idt}` } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  // if (!product) {
  //   return (
  //     <div className="flex justify-center items-center h-screen text-xl text-gray-700">
  //       Không tìm thấy sản phẩm.
  //     </div>
  //   );
  // }

  const ProductCard = ({ productData, productImages }) => (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {productData?.name}
        </h2>
        <div className="text-sm text-gray-600 mb-4">
          <span>bởi </span>
          <span className="font-bold">{productData?.storeName}</span>
        </div>

        <div className="aspect-w-4 aspect-h-3 mb-4">
          <img
            src={productData?.defaultImage}
            alt={productData?.name}
            className="w-full h-64 object-cover rounded-md"
          />
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {productImages && productImages.length > 0
            ? productImages.slice(0, 4).map((image, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={image?.imageUrl}
                    alt={`Hình ${index + 1}`}
                    className="w-full h-full object-cover rounded-sm border hover:opacity-80 transition"
                  />
                </div>
              ))
            : null}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="bg-yellow-600 text-white px-6 py-2 rounded-full font-bold text-lg">
            {productData?.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
            /ngày
          </div>
          <div
            className={`px-3 py-1 text-sm font-medium rounded-full 
            ${
              productData?.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {productData?.status === "ACTIVE" ? "Còn hàng" : "Hết hàng"}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2  my-3"
          disabled={productData?.stock === 0}
        >
          <ShoppingCart />
          <span>{productData?.stock === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}</span>
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Mô tả</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {productData?.description?.replace(/<\/?[^>]+(>|$)/g, "")}
        </p>

        <div className="space-y-2">
          <div className="flex items-center">
            <span className="w-24 text-gray-500">Danh mục:</span>
            <span className="font-medium">{productData?.categoryName}</span>
          </div>
          <div className="flex items-center">
            <span className="w-24 text-gray-500">Thương hiệu:</span>
            <span className="font-medium">{productData?.brandName}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <Link
          to="/"
          className="flex items-center hover:text-blue-500 transition-colors no-underline"
        >
          <Home size={16} className="mr-1" />
          <span>Trang chủ</span>
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <Link
          to="/AllProduct"
          className="hover:text-blue-500 transition-colors no-underline"
        >
          <span>Xem tất cả</span>
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700">So sánh</span>
      </nav>

      <h1 className="text-3xl font-bold text-center mb-10 text-yellow-800">
        So Sánh Sản Phẩm
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* First Product */}
        <div className="md:col-span-1">
          <ProductCard productData={product} productImages={images} />
        </div>

        {/* Compare Icon */}
        <div className="flex justify-center items-center">
          <div className="bg-yellow-100 p-4 rounded-full">
            <ArrowRightLeft size={40} className="text-yellow-600" />
          </div>
        </div>

        {/* Second Product or Add Product Button */}
        <div className="md:col-span-1">
          {mode === "selected" && productSecond ? (
            <ProductCard
              productData={productSecond}
              productImages={imageSecond}
            />
          ) : (
            <div
              onClick={handleRedirectToHomePage}
              className="flex flex-col justify-center items-center h-full bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border-2 border-dashed border-yellow-300 p-12 cursor-pointer transition-all duration-300 hover:border-yellow-500 hover:shadow-md"
            >
              <div className="bg-yellow-500 p-4 rounded-full mb-4">
                <Plus size={36} className="text-white" />
              </div>
              <span className="text-lg font-medium text-yellow-600">
                Thêm Sản Phẩm Để So Sánh
              </span>
              <p className="text-gray-500 text-sm text-center mt-2">
                Nhấp vào đây để chọn sản phẩm khác để so sánh
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto mb-12">
        <table className="w-full text-left border-collapse rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-yellow-600 to-amber-600 text-white">
              <th className="px-6 py-4 text-center">Thông số kỹ thuật</th>
              <th className="px-6 py-4 text-center">{product?.name}</th>
              <th className="px-6 py-4 text-center">
                {productSecond ? productSecond?.name : "Sản phẩm thứ hai"}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-white hover:bg-yellow-50 transition">
              <td className="px-6 py-4 font-semibold border-b">Trọng lượng</td>
              <td className="px-6 py-4 text-center border-b">
                {product?.weight} tấn
              </td>
              <td className="px-6 py-4 text-center border-b">
                {productSecond ? `${productSecond.weight} tấn` : "-"}
              </td>
            </tr>

            <tr className="bg-gray-50 hover:bg-yellow-50 transition">
              <td className="px-6 py-4 font-semibold border-b">Kích thước</td>
              <td className="px-6 py-4 text-center border-b">
                {product?.dimensions || "-"}
              </td>
              <td className="px-6 py-4 text-center border-b">
                {productSecond ? productSecond.dimensions || "-" : "-"}
              </td>
            </tr>

            <tr className="bg-white hover:bg-yellow-50 transition">
              <td className="px-6 py-4 font-semibold border-b">
                Loại nhiên liệu
              </td>
              <td className="px-6 py-4 text-center border-b">
                {fuelOptions.find(
                  (option) => option.value === product?.fuelType
                )?.label || "Không xác định"}
              </td>
              <td className="px-6 py-4 text-center border-b">
                {productSecond
                  ? fuelOptions.find(
                      (option) => option.value === productSecond.fuelType
                    )?.label || "Không xác định"
                  : "-"}
              </td>
            </tr>

            <tr className="bg-gray-50 hover:bg-yellow-50 transition">
              <td className="px-6 py-4 font-semibold border-b">Tình trạng</td>
              <td className="px-6 py-4 text-center border-b">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full 
                  ${
                    product?.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product?.status === "ACTIVE" ? "Còn hàng" : "Hết hàng"}
                </span>
              </td>
              <td className="px-6 py-4 text-center border-b">
                {productSecond ? (
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full 
                    ${
                      productSecond?.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {productSecond?.status === "ACTIVE"
                      ? "Còn hàng"
                      : "Hết hàng"}
                  </span>
                ) : (
                  "-"
                )}
              </td>
            </tr>

            <tr className="bg-white hover:bg-yellow-50 transition">
              <td className="px-6 py-4 font-semibold">Giá</td>
              <td className="px-6 py-4 text-center font-bold text-yellow-600">
                {product?.price?.toLocaleString()}đ
              </td>
              <td className="px-6 py-4 text-center font-bold text-yellow-600">
                {productSecond
                  ? `${productSecond?.price?.toLocaleString()}đ`
                  : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
