import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "./Modal";
import api from "../../Context/api";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading.json";

export default function LessorProductDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`product/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="w-32"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 max-w-[80vw] bg-white p-6 rounded-lg shadow-lg">
          <img
            src={product.defaultImage}
            alt={product.name}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg"
          />

          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-semibold">{product.name}</h1>

            <div className="flex flex-wrap gap-3">
              <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full font-semibold">
                {product.categoryName}
              </span>
              <span className="text-gray-600 font-medium">
                {product.brandName}
              </span>
              <span className="text-gray-500">By: {product.storeName}</span>
            </div>

            <div className="">
              <h3 className="text-lg font-medium">Description</h3>
              <p className="text-gray-700">
                {product.description.replace(/<\/?[^>]+(>|$)/g, "")}
              </p>
            </div>

            <div className="space-y-2 text-gray-800 flex flex-col">
              <span>Stock: {product.stock}</span>
              <span>Weight: {product.weight} kg</span>
              <span>Dimensions: {product.dimensions}</span>
              <span>Fuel Type: {product.fuelType}</span>
            </div>
            <div className="flex justify-end">
              <Link to={`/lessor/product/${product.id}/edit`}>
                <button class="w-28 items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
