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
              className="HH-Picture-small"
              src={`https://media.istockphoto.com/id/143918313/vi/anh/m%C3%A1y-x%C3%BAc-t%E1%BA%A1i-m%E1%BB%99t-c%C3%B4ng-tr%C6%B0%E1%BB%9Dng-x%C3%A2y-d%E1%BB%B1ng-ch%E1%BB%91ng-l%E1%BA%A1i-m%E1%BA%B7t-tr%E1%BB%9Di-l%E1%BA%B7n.jpg?s=612x612&w=0&k=20&c=n0Gw-7m3yh6bNwQGZLQ3fXvQiuGhvYcAULSxGQS78oo=`}
              alt={product.name || "Product image"}
            />
          </div>

          {/* Thumbnails */}
          <div className="thumbnail-container">
            <div className="thumbnail">
              <img src={smalltock1} alt="Excavator view 1" />
            </div>
            <div className="thumbnail">
              <img src={smalltock2} alt="Excavator view 2" />
            </div>
            <div className="thumbnail">
              <img src={smalltock3} alt="Excavator view 3" />
            </div>
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
              {product.description}
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
                src={`https://media.istockphoto.com/id/143918313/vi/anh/m%C3%A1y-x%C3%BAc-t%E1%BA%A1i-m%E1%BB%99t-c%C3%B4ng-tr%C6%B0%E1%BB%9Dng-x%C3%A2y-d%E1%BB%B1ng-ch%E1%BB%91ng-l%E1%BA%A1i-m%E1%BA%B7t-tr%E1%BB%9Di-l%E1%BA%B7n.jpg?s=612x612&w=0&k=20&c=n0Gw-7m3yh6bNwQGZLQ3fXvQiuGhvYcAULSxGQS78oo=`}
                alt={productSecond.name || "Product image"}
              />
            </div>

            {/* Thumbnails */}
            <div className="thumbnail-container">
              <div className="thumbnail">
                <img src={smalltock1} alt="Excavator view 1" />
              </div>
              <div className="thumbnail">
                <img src={smalltock2} alt="Excavator view 2" />
              </div>
              <div className="thumbnail">
                <img src={smalltock3} alt="Excavator view 3" />
              </div>
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
                {productSecond.description}
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
      <div class="overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
        <table class="min-w-[90%] text-left text-sm font-light">
          <thead class="bg-gray-100">
            <tr>
              <th scope="col" class="px-6 py-3 text-gray-700">
                Column 1
              </th>
              <th scope="col" class="px-6 py-3 text-gray-700">
                Column 2
              </th>
              <th scope="col" class="px-6 py-3 text-gray-700">
                Column 3
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b bg-white hover:bg-gray-50">
              <td class="px-6 py-4">Row 1, Column 1</td>
              <td class="px-6 py-4">Row 1, Column 2</td>
              <td class="px-6 py-4">Row 1, Column 3</td>
            </tr>
            <tr class="border-b bg-white hover:bg-gray-50">
              <td class="px-6 py-4">Row 2, Column 1</td>
              <td class="px-6 py-4">Row 2, Column 2</td>
              <td class="px-6 py-4">Row 2, Column 3</td>
            </tr>
            <tr class="bg-white hover:bg-gray-50">
              <td class="px-6 py-4">Row 3, Column 1</td>
              <td class="px-6 py-4">Row 3, Column 2</td>
              <td class="px-6 py-4">Row 3, Column 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
