import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../Context/api";
import {
  GitCompareArrows,
  Star,
  Home,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import Aos from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

export default function Index() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/${productId}`);
        if (response.data.isSuccess) {
          setProduct(response.data.data);
          setMainImage(
            response.data.data.defaultImage ||
              "http://localhost:5083/images/default-image.jpg"
          );
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProductImage = async () => {
      try {
        const response = await api.get(`productimage/by-product/${productId}`);
        if (response.data.isSuccess) {
          setImages(response.data.data);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchProduct();
    fetchProductImage();

    Aos.init({
      duration: 600,
      easing: "ease-out",
      once: true,
    });
  }, [productId]);

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

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-medium text-gray-600">
          Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 flex items-center text-sm text-gray-600">
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
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-800 font-medium">Chi tiết sản phẩm </span>
      </div>

      {/* Product Details Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-6" data-aos="fade-right">
              <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-96 object-contain"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                <div
                  className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                    mainImage === product.defaultImage
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                  onClick={() =>
                    handleImageClick(
                      product.defaultImage ||
                        "http://localhost:5083/images/default-image.jpg"
                    )
                  }
                >
                  <img
                    src={
                      product.defaultImage ||
                      "http://localhost:5083/images/default-image.jpg"
                    }
                    alt="Main"
                    className="w-full h-20 object-cover"
                  />
                </div>

                {images && images.length > 0
                  ? images.slice(0, 3).map((image, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                          mainImage === image.imageUrl
                            ? "border-blue-500"
                            : "border-gray-200"
                        }`}
                        onClick={() => handleImageClick(image.imageUrl)}
                      >
                        <img
                          src={image.imageUrl}
                          alt={`Product view ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 bg-gray-50" data-aos="fade-left">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {product.name}
                </h1>

                <Link
                  to={`/compare/${productId}`}
                  className="flex items-center bg-white text-yellow-600 gap-2 px-4 py-2 rounded-lg border border-blue-500 
                  font-semibold transition-all duration-300 ease-in-out shadow-sm 
                  hover:bg-blue-500 hover:text-yellow-800 hover:shadow-md no-underline"
                >
                  <GitCompareArrows size={18} />
                  <span>Compare</span>
                </Link>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#FBBF24" strokeWidth={0} />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 text-sm">
                  (3,345 reviews)
                </span>
              </div>

              <div className="mb-4">
                <span className="text-gray-600">Cửa hàng: </span>
                <span className="font-medium">{product.storeName}</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="bg-yellow-500 text-white px-4 py-2 rounded-md font-bold text-xl">
                  {product.price.toLocaleString("vi-en")}
                  <span className="text-sm font-normal">/Ngày</span>
                </div>
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md">
                  <span className="text-gray-600 mr-1">Kho:</span>
                  <span
                    className={`font-bold ${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stock}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 mb-8"
                disabled={product.stock === 0}
              >
                <ShoppingCart />
                <span>
                  {product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
                </span>
              </button>

              {/* Quick Specifications */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-500">Weight</div>
                  <div className="font-semibold">{product.weight} kg</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-500">Dimensions</div>
                  <div className="font-semibold">{product.dimensions} cm</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-500">Fuel Type</div>
                  <div className="font-semibold">{product.fuelType}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {product.categoryName}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {product.brandName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              {product.description.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Technical Specifications
            </h3>
            <div className="overflow-hidden bg-gray-50 border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-800 bg-gray-100">
                      Weight
                    </th>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.weight} kg
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-800 bg-gray-100">
                      Dimensions
                    </th>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.dimensions} cm
                    </td>
                  </tr>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-800 bg-gray-100">
                      Fuel Type
                    </th>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.fuelType}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Đánh giá</h2>

          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold mr-3">
                AM
              </div>
              <div>
                <div className="font-semibold">Alex Morningstar</div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#FBBF24" strokeWidth={0} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              <span className="font-medium">Contrary to popular belief</span>
              <br />
              Its ability to move flexibly on rough terrain and optimized
              technical details make this excavator an excellent choice for any
              project, from construction to mining.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
