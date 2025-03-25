import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CircleDollarSign } from "lucide-react";
import api from "../../Context/api";
import RevenueChart from "./RevenueChart";
import OrderManagementDashboard from "../../page/LessorPage/OrderManagementDashboard ";

export default function TrangChuChuChoThue() {
  const [doanhThu, setDoanhThu] = useState();
  const [tongQuan, setTongQuan] = useState();

  useEffect(() => {
    const layDoanhThu = async () => {
      try {
        const response = await api.get(`lessor/revenue`);
        if (response.data && response.data.data.length > 0) {
          setDoanhThu(response.data.data[0].totalRevenue);
        }
      } catch (error) {
        console.error("Lỗi khi lấy doanh thu:", error);
      }
    };

    const layTongQuan = async () => {
      try {
        const response = await api.get(`lessor/summary`);
        setTongQuan(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin tổng quan:", error);
      }
    };

    layDoanhThu();
    layTongQuan();
  }, []);

  const theHienTuong = {
    an: { opacity: 0, y: 50 },
    hien: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="p-3"
      initial="an"
      animate="hien"
      variants={{
        hien: { transition: { staggerChildren: 0.2 } },
      }}
    >
      <motion.div
        className="p-4 bg-white shadow-md space-y-4 flex justify-between items-center rounded-xl"
        variants={theHienTuong}
      >
        <div className="space-y-4">
          <div className="font-extrabold text-3xl">Tổng doanh thu của bạn: </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">
            {doanhThu ? doanhThu.toLocaleString("vi-VN") : "0"} VNĐ
          </div>
        </div>
        <CircleDollarSign className="text-gray-400" size={80} />
      </motion.div>

      <motion.div className="flex mt-3 justify-around">
        {[
          {
            nhan: "Số lượng đơn hàng",
            giaTri: tongQuan?.totalOrders,
            mau: "green",
            tang: true,
            phanTram: "12%",
          },
          {
            nhan: "Tổng số thiết bị",
            giaTri: tongQuan?.totalEquipment,
            mau: "green",
            tang: true,
            phanTram: "28%",
          },
          {
            nhan: "Sản phẩm đang cho thuê",
            giaTri: 12,
            mau: "red",
            tang: false,
            phanTram: "7%",
          },
        ].map((muc, index) => (
          <motion.div
            key={index}
            className="space-y-6 p-6 bg-white flex flex-col justify-center rounded-3xl shadow-lg border border-gray-200 w-80"
            variants={theHienTuong}
          >
            <label className="font-bold text-center">{muc.nhan}</label>
            <div className="flex justify-center items-center">
              <div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-bold text-black">
                    {muc.giaTri}
                  </span>
                  <div className="flex items-center gap-1">
                    <div
                      className={`p-[6px] rounded-3xl bg-${muc.mau}-100 flex items-center justify-center font-semibold text-${muc.mau}-600 text-sm`}
                    >
                      {muc.tang ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )}
                    </div>
                    <span className={`font-semibold text-${muc.mau}-600`}>
                      {muc.phanTram}
                    </span>
                  </div>
                </div>
                <div className="text-slate-400">So với tuần trước</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={theHienTuong}>
        <OrderManagementDashboard />
      </motion.div>
    </motion.div>
  );
}
