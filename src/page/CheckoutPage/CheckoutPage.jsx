import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isBefore, differenceInDays } from "date-fns";
import api from "../../Context/api";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems = [] } = location.state || {};
  const initialTotalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(initialTotalPrice);
  const [errorMessage, setErrorMessage] = useState("");

  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setStartDate("");
      setTotalDays(0);
      setTotalAmount(0);
      setErrorMessage("Ngày bắt đầu không thể ở quá khứ.");
      return;
    }

    setStartDate(e.target.value);
    setErrorMessage("");

    if (endDate && selectedDate < new Date(endDate)) {
      const days = differenceInDays(new Date(endDate), selectedDate);
      setTotalDays(days);
      setTotalAmount(days * initialTotalPrice);
    }
  };

  const handleEndDateChange = (e) => {
    const selectedDate = new Date(e.target.value);

    if (!startDate) {
      setEndDate("");
      setTotalDays(0);
      setTotalAmount(0);
      setErrorMessage("Vui lòng chọn ngày bắt đầu trước.");
      return;
    }

    if (selectedDate <= new Date(startDate)) {
      setEndDate("");
      setTotalDays(0);
      setTotalAmount(0);
      setErrorMessage("Ngày kết thúc phải sau ngày bắt đầu.");
      return;
    }

    setEndDate(e.target.value);
    setErrorMessage("");

    const days = differenceInDays(selectedDate, new Date(startDate));
    setTotalDays(days);
    setTotalAmount(days * initialTotalPrice);
  };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Vui lòng đăng nhập trước khi thanh toán.");
        navigate("/login");
        return;
      }

      const accountId = localStorage.getItem("accountId");
      const role = localStorage.getItem("role");
      if (!accountId || !role) {
        alert("Không tìm thấy thông tin tài khoản. Vui lòng đăng nhập lại.");
        navigate("/login");
        return;
      }

      let customerId = role === "CUSTOMER" ? parseInt(accountId, 10) : 0;

      if (!startDate || !endDate) {
        alert("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.");
        return;
      }
      if (!isBefore(new Date(startDate), new Date(endDate))) {
        alert("Ngày bắt đầu phải trước ngày kết thúc.");
        return;
      }
      if (totalDays === 0) {
        alert("Thời gian thuê phải ít nhất 1 ngày.");
        return;
      }

      const payload = {
        order: {
          paymentMethod,
          purchaseMethod: 0,
          recipientName,
          recipientPhone,
          address,
          dateOfReceipt: startDate,
          dateOfReturn: endDate,
          customerId,
          returnUrl: "http://localhost:5173/paysuccess",
        },
        orderItems: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      const orderResponse = await api.post("order/with-items", payload);

      if (!orderResponse.data.isSuccess) {
        alert(orderResponse.data.message || "Tạo đơn hàng thất bại.");
        return;
      }

      const orderId = orderResponse.data.data.order.id;
      console.log("Lưu orderId vào localStorage:", orderId);
      localStorage.setItem("orderId", orderId);

      if (paymentMethod === 2 && orderResponse.data.data.order.payOsUrl) {
        window.location.href = orderResponse.data.data.order.payOsUrl;
        return;
      }

      navigate("/thanks", {
        state: {
          date: new Date().toLocaleDateString("vi-VN"),
          recipientName,
          recipientEmail: localStorage.getItem("email") || "Không có",
          paymentMethod,
          address,
          product: cartItems.map((item) => item.productName).join(", "),
          totalAmount: totalAmount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          }),
        },
      });
    } catch (error) {
      console.error("Lỗi:", error);
       toast.error(error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.")
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Thanh Toán
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Thông Tin Giao Hàng
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên Người Nhận
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Nhập tên người nhận"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số Điện Thoại
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa Chỉ
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập địa chỉ giao hàng"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Phương Thức Thanh Toán
            </h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === 0}
                  onChange={() => setPaymentMethod(0)}
                  className="h-5 w-5 text-blue-600"
                />
                <span className="text-gray-800">
                  Thanh toán khi nhận hàng (COD)
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === 2}
                  onChange={() => setPaymentMethod(2)}
                  className="h-5 w-5 text-blue-600"
                />
                <span className="text-gray-800">
                  PayOS (Thanh toán trực tuyến)
                </span>
              </label>
            </div>
          </div>

          {/* Rental Dates */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Ngày Thuê
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày Bắt Đầu
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày Kết Thúc
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
            )}

            <div className="mt-4 bg-blue-50 p-4 rounded-md">
              <p className="text-gray-700">
                <span className="font-medium">Tổng Số Ngày:</span> {totalDays}
              </p>
              <p className="text-gray-700 font-semibold mt-1">
                <span>Tổng Tiền:</span>{" "}
                {totalAmount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
              Tóm Tắt Đơn Hàng
            </h2>

            <div className="max-h-64 overflow-y-auto mb-4">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.productName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <p className="text-gray-800">
                        {(item.price * item.quantity).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4 mt-2">
              <div className="flex justify-between font-semibold text-lg mb-4">
                <p>Tổng cộng:</p>
                <p>
                  {totalAmount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>

              <button
                onClick={handleComplete}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all font-medium"
              >
                Hoàn Tất Đơn Hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
