import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import api from "../../Context/api";

const LessorCategory = () => {
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get("category");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);

  const filteredCategories =
    filter === "all"
      ? categories
      : categories.filter((cat) => cat.status.toString() === filter);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Category List</h1>
      {/* <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg text-white transition-colors duration-300 ${
            filter === "all" ? "bg-blue-600" : "bg-gray-400 hover:bg-blue-500"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-white transition-colors duration-300 ${
            filter === "0" ? "bg-green-600" : "bg-gray-400 hover:bg-green-500"
          }`}
          onClick={() => setFilter("0")}
        >
          Active
        </button>
      </div> */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:scale-105"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {category.name}
              </h2>
              {category.status === 0 ? (
                <CheckCircle className="text-green-500" size={24} />
              ) : (
                <XCircle className="text-red-500" size={24} />
              )}
            </div>
            <p className="text-gray-600">{category.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LessorCategory;
