import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import truck from "../../assets/logocategory/dump-truck.png";
import crane from "../../assets/logocategory/crane.png";
import bulldozer from "../../assets/logocategory/bulldozer.png";
import scaffolding from "../../assets/logocategory/scaffolding.png";
import concreteMixer from "../../assets/logocategory/concrete-mixer.png";
import drill from "../../assets/logocategory/drill.png";
import roadroller from "../../assets/logocategory/road-roller.png";
import crusher from "../../assets/logocategory/crusher.png";
import api from "../../Context/api";
import { useNavigate } from "react-router-dom";

export default function CategoryGrid() {
  const [selected, setSelected] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const categoryAPI = async () => {
      try {
        const response = await api.get(`/product/categories-products`);
        setCategories(response.data.data);
        console.log(response.data.data);
      } catch (error) {}
    };
    categoryAPI();
  }, []);

  const viewProduct = (id) => {
    console.log(id);
    
    navigate(`/category/${id}`);
  };

  return (
    <div className="p-10 bg-slate-50">
      <motion.h2
        className="text-3xl font-bold text-center text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Danh Mục Thiết Bị
      </motion.h2>

      <motion.p
        className="text-gray-500 text-center mt-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Khám phá danh mục thiết bị xây dựng đa dạng, từ máy móc hạng nặng đến
        công cụ chuyên dụng, đáp ứng mọi nhu cầu thi công. Chất lượng đảm bảo,
        thuê nhanh chóng, hỗ trợ tận nơi!
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {categories.map((item, index) => (
          <motion.div
            key={item.categoryId}
            onClick={() => {
              setSelected(item.categoryId);
              viewProduct(item.categoryId);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: index * 0.1 }}
            className={`border-[8px] border-yellow-200 p-6 rounded-lg shadow-md cursor-pointer text-center hover:bg-yellow-400 group transition-all duration-200`}
          >
            <div className="flex justify-center">
              <img
                src={item.image || truck}
                alt={item.categoryName}
                className="w-16 h-16 object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mt-4 group-hover:text-white transition-colors duration-500 delay-100">
              {item.categoryName}
            </h3>
            <p className="text-yellow-500 font-medium mt-2 group-hover:text-white transition-colors duration-500 delay-100">
              {item.totalProducts} Thiết Bị
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
