import React, { useEffect, useState } from "react";
import "./index.css";
import bigstock from "../assets/images/bigstock.png";
import smalltock1 from "../assets/images/smallstock1.png";
import smalltock2 from "../assets/images/smallstock2.png";
import smalltock3 from "../assets/images/smallstock3.png";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import api from "../Context/api";
import { ArrowRightLeft, Plus } from "lucide-react";
import { useParams } from "react-router-dom";

const fuelOptions = [
  { label: "PETROL", value: 0 },
  { label: "DIESEL", value: 1 },
  { label: "ELECTRIC", value: 2 },
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
  console.log(location);
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
          console.log(response.data.data);
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductImage();
    apiProduct();
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
          console.log(response.data.data);
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

  const handleRedirectToHomePage = () => {
    navigate("/", { state: { mode: "compare", productId: `${idt}` } });
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      console.log("Token exists:", token);
    } else {
      console.log("Token does not exist or user is not logged in.");
    }

    if (!token) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      const orderId = 1;

      const response = await api.post(
        "/orderitem",
        {
          orderId: orderId,
          productId: Number(productId),
          quantity: 1,
          price: product.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.isSuccess) {
        alert(
          `Product added to cart successfully (ID: ${response.data.data.id})`
        );
      } else {
        alert(response.data.message || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(
        "An error occurred while adding the product to the cart. Please try again later."
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }
  return (
    <div>
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <Link to="/">
            <span herf="/">Home </span>
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-right-fill"
            viewBox="0 0 16 16"
          >
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
          <Link to="/AllProduct">
            <span>View all</span>
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-caret-right-fill"
            viewBox="0 0 16 16"
          >
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
          <span>Detail</span>
        </div>
      </div>

      <div className="main-container-compare ">
        <div className="left-image-container">
          <span className="product-title">{product.name}</span>
          <div className="font-bold">
            <span className="vendor-prefix">by</span>
            <span className="vendor-name"> {product.storeName}</span>
          </div>

          <div className="main-image">
            <img
              src={product.defaultImage}
              className="HH-Picture-small"
              alt={product.name || "Product image"}
            />
          </div>

          <div className="thumbnail1-container">
            {images && images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className="thumbnail">
                  <img src={image.imageUrl} alt={`Product view ${index + 1}`} />
                </div>
              ))
            ) : (
              <>
                <div className="thumbnail">
                  <img src={smalltock1} alt="Excavator view 1" />
                </div>
                <div className="thumbnail">
                  <img src={smalltock2} alt="Excavator view 2" />
                </div>
                <div className="thumbnail">
                  <img src={smalltock3} alt="Excavator view 3" />
                </div>
              </>
            )}
          </div>

          <div className="price-status-compare">
            <button className="price-btn">
              <span className="currency">$</span>

              <span className="price">{product.price}/Day</span>
            </button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Description
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-[100%]">
              {product.description.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>

            <div className="space-y-4">
              <p className="flex items-center text-lg text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-car-front-fill mr-2 text-red-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
                </svg>
                Category:{" "}
                <span className="font-semibold">{product.categoryName}</span>
              </p>
              <p className="flex items-center text-lg text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-box mr-2 text-blue-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                </svg>
                Brand:{" "}
                <span className="font-semibold">{product.brandName}</span>
              </p>
            </div>
          </div>
        </div>

        <ArrowRightLeft size={90} className="mt-[250px]" />

        {mode === "selected" && productSecond ? (
          <div className="left-image-container">
            <span className="product-title">{productSecond.name}</span>
            <div className="font-bold">
              <span className="vendor-prefix">by</span>
              <span className="vendor-name"> {productSecond.storeName}</span>
            </div>
            {/* Ảnh lớn chính */}
            <div className="main-image">
              <img
                className="HH-Picture-small"
                src={productSecond.defaultImage}
                alt={productSecond.name || "Product image"}
              />
            </div>

            <div className="thumbnail-container">
              {imageSecond && imageSecond.length > 0 ? (
                imageSecond.map((image, index) => (
                  <div key={index} className="thumbnail">
                    <img
                      src={image.imageUrl}
                      alt={`Product view ${index + 1}`}
                    />
                  </div>
                ))
              ) : (
                <>
                  <div className="thumbnail">
                    <img src={smalltock1} alt="Excavator view 1" />
                  </div>
                  <div className="thumbnail">
                    <img src={smalltock2} alt="Excavator view 2" />
                  </div>
                  <div className="thumbnail">
                    <img src={smalltock3} alt="Excavator view 3" />
                  </div>
                </>
              )}
            </div>

            <div className="price-status-compare">
              <button className="price-btn">
                <span className="currency">$</span>

                <span className="price">{productSecond.price}/Day</span>
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Description
              </h2>
              <p className="text-lg text-gray-600 mb-6 max-w-[100%]">
                {productSecond.description.replace(/<\/?[^>]+(>|$)/g, "")}
              </p>

              <div className="space-y-4">
                <p className="flex items-center text-lg text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-car-front-fill mr-2 text-red-500"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
                  </svg>
                  Category:{" "}
                  <span className="font-semibold">
                    {productSecond.categoryName}
                  </span>
                </p>
                <p className="flex items-center text-lg text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box mr-2 text-blue-500"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                  </svg>
                  Brand:{" "}
                  <span className="font-semibold">
                    {productSecond.brandName}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-[155px]">
            <div
              className="bg-pink-300 p-20 border rounded-3xl cursor-pointer"
              onClick={handleRedirectToHomePage}
            >
              <div className="bg-black text-gray-300 p-6 border-8 border-white ">
                <Plus size={60} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="overflow-x-auto p-4 flex justify-center">
        <table className="w-full max-w-4xl text-sm text-left text-gray-600 shadow-md sm:rounded-lg border border-gray-200">
          <thead className="bg-blue-500 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-center">Specification</th>
              <th className="px-6 py-3 text-center">{product.name}</th>
              <th className="px-6 py-3 text-center">{productSecond.name}</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b bg-gray-50 hover:bg-gray-100 transition">
              <td className="px-6 py-4 font-semibold">Weight</td>
              <td className="px-6 py-4 text-center">{product.weight} tons</td>
              <td className="px-6 py-4 text-center">
                {productSecond ? productSecond.weight : ""}
              </td>
            </tr>

            <tr className="border-b bg-white hover:bg-gray-100 transition">
              <td className="px-6 py-4 font-semibold">Dimensions</td>
              <td className="px-6 py-4 text-center">{product.dimensions}</td>
              <td className="px-6 py-4 text-center">
                {productSecond ? productSecond.dimensions : ""}
              </td>
            </tr>

            <tr className="border-b bg-gray-50 hover:bg-gray-100 transition">
              <td className="px-6 py-4 font-semibold">Fuel Type</td>
              <td className="px-6 py-4 text-center">
                {fuelOptions.find((option) => option.value === product.fuelType)
                  ?.label || "Not specified"}
              </td>
              <td className="px-6 py-4 text-center">
                {productSecond
                  ? fuelOptions.find(
                      (option) => option.value === productSecond.fuelType
                    )?.label || "Not specified"
                  : ""}
              </td>
            </tr>

            <tr className="border-b bg-white hover:bg-gray-100 transition">
              <td className="px-6 py-4 font-semibold">Availability</td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full 
          ${
            product.status === "AVAILABLE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
                >
                  {product.status === "AVAILABLE" ? "In stock" : "Out of stock"}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                {productSecond && (
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full 
            ${
              productSecond.status === "AVAILABLE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
                  >
                    {productSecond.status === "AVAILABLE"
                      ? "In stock"
                      : "Out of stock"}
                  </span>
                )}
              </td>
            </tr>

            <tr className="border-b bg-gray-50 hover:bg-gray-100 transition">
              <td className="px-6 py-4 font-semibold">Price</td>
              <td className="px-6 py-4 text-center text-blue-600 font-bold">
                ${product.price?.toLocaleString()}
              </td>
              <td className="px-6 py-4 text-center text-blue-600 font-bold">
                {productSecond
                  ? `$${productSecond.price?.toLocaleString()}`
                  : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
