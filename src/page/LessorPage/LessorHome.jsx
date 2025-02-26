import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { motion } from "framer-motion";
import { CircleDollarSign } from "lucide-react";
import api from "../../Context/api";
import RevenueChart from "./RevenueChart";
import OrderManagementDashboard from "./OrderManagementDashboard ";

export default function LessorHome() {
  const [revenue, setRevenue] = useState();
  const [summaries, setSummaries] = useState();

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await api.get(`lessor/revenue`);
        if (response.data && response.data.data.length > 0) {
          setRevenue(response.data.data[0].totalRevenue);
        }
      } catch (error) {
        console.error("Error fetching revenue:", error);
      }
    };

    const fetchSummary = async () => {
      try {
        const response = await api.get(`lessor/summary`);
        setSummaries(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchRevenue();
    fetchSummary();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="p-3"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      <motion.div
        className="p-4 bg-white shadow-md space-y-4 flex justify-between items-center rounded-xl"
        variants={cardVariants}
      >
        <div className="space-y-4">
          <div className="font-extrabold text-3xl">Your total revenue: </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">
            {revenue ? revenue.toLocaleString("vi-VN") : "0"} VNĐ
          </div>
        </div>
        <CircleDollarSign className="text-gray-400" size={80} />
      </motion.div>

      <motion.div className="flex mt-3 justify-around">
        {[
          {
            label: "Number of orders",
            value: summaries?.totalOrders,
            color: "green",
            isIncrease: true,
          },
          {
            label: "Total Equipment",
            value: summaries?.totalEquipment,
            color: "green",
            isIncrease: true,
          },
          {
            label: "Products on rent",
            value: 12,
            color: "red",
            isIncrease: false,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="space-y-6 p-6 bg-white flex flex-col justify-center rounded-3xl shadow-lg border border-gray-200 w-80"
            variants={cardVariants}
          >
            <label className="font-bold text-center">{item.label}</label>
            <div className="flex justify-center items-center">
              <div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-bold text-black">
                    {item.value}
                  </span>
                  <div className="flex items-center gap-1">
                    <div
                      className={`p-[6px] rounded-3xl bg-${item.color}-100 flex items-center justify-center font-semibold text-${item.color}-600 text-sm`}
                    >
                      {item.isIncrease ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )}
                    </div>
                    <span className={`font-semibold text-${item.color}-600`}>
                      15%
                    </span>
                  </div>
                </div>
                <div className="text-slate-400">compared to last week</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* <div className="flex mt-3 justify-around">
        <div className="space-y-6 p-6 bg-white flex flex-col justify-center rounded-3xl shadow-lg border border-gray-200 w-80">
          <label className="font-bold text-center">Number of orders</label>
          <div className="flex justify-center items-center">
            <div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-black">
                  {summaries?.totalOrders}
                </span>
                <div className="flex items-center gap-1">
                  <div className="p-[6px] rounded-3xl bg-green-100 flex items-center justify-center font-semibold text-green-600 text-sm">
                    <ArrowUp size={14} className="" />
                  </div>
                  <span className="font-semibold text-green-600">15%</span>
                </div>
              </div>
              <div className="text-slate-400">compared to last week</div>
            </div>
          </div>
        </div>
        <div className="space-y-6 p-6 bg-white flex flex-col justify-center rounded-3xl shadow-lg border border-gray-200 w-80">
          <label className="font-bold text-center">Total Equipment</label>
          <div className="flex justify-center items-center">
            <div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-black">
                  {summaries?.totalEquipment}
                </span>
                <div className="flex items-center gap-1">
                  <div className="p-[6px] rounded-3xl bg-green-100 flex items-center justify-center font-semibold text-green-600 text-sm">
                    <ArrowUp size={14} className="" />
                  </div>
                  <span className="font-semibold text-green-600">15%</span>
                </div>
              </div>
              <div className="text-slate-400">compared to last week</div>
            </div>
          </div>
        </div>
        <div className="space-y-6 p-6 bg-white flex flex-col justify-center rounded-3xl shadow-lg border border-gray-200 w-80">
          <label className="font-bold text-center">Products on rent</label>
          <div className="flex justify-center items-center">
            <div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-black">12</span>
                <div className="flex items-center gap-1">
                  <div className="p-[6px] rounded-3xl bg-red-100 flex items-center justify-center font-semibold text-red-600 text-sm">
                    <ArrowDown size={14} className="" />
                  </div>
                  <span className="font-semibold text-red-600">15%</span>
                </div>
              </div>
              <div className="text-slate-400">compared to last week</div>
            </div>
          </div>
        </div>
      </div> */}
      <motion.div variants={cardVariants}>
        <OrderManagementDashboard />
      </motion.div>
    </motion.div>
  );
}
