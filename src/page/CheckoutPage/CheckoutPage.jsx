import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { isBefore, differenceInDays } from "date-fns";
import "./CheckoutPage.css";
import api from "../../Context/api";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Nhận dữ liệu giỏ hàng từ ShoppingCart
  const { cartItems = [] } = location.state || {};
  const initialTotalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // State lưu thông tin đơn hàng
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(0); // 0: CASH, 2: PAYOS
  const [startDate, setStartDate] = useState(""); // Ngày thuê
  const [endDate, setEndDate] = useState(""); // Ngày trả
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(initialTotalPrice);
  const [errorMessage, setErrorMessage] = useState("");

// Xử lý chọn ngày thuê
const handleStartDateChange = (e) => {
  const selectedDate = new Date(e.target.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset giờ phút giây để so sánh chính xác

  if (selectedDate < today) {
    setStartDate("");
    setTotalDays(0);
    setTotalAmount(0);
    setErrorMessage("Start date cannot be in the past.");
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

// Xử lý chọn ngày trả
const handleEndDateChange = (e) => {
  const selectedDate = new Date(e.target.value);

  if (!startDate) {
    setEndDate("");
    setTotalDays(0);
    setTotalAmount(0);
    setErrorMessage("Please select a start date first.");
    return;
  }

  if (selectedDate <= new Date(startDate)) {
    setEndDate("");
    setTotalDays(0);
    setTotalAmount(0);
    setErrorMessage("End date must be after the start date.");
    return;
  }

  setEndDate(e.target.value);
  setErrorMessage("");

  const days = differenceInDays(selectedDate, new Date(startDate));
  setTotalDays(days);
  setTotalAmount(days * initialTotalPrice);
};


  // Xử lý hoàn tất đơn hàng
  // const handleComplete = async () => {
  //   try {
  //     const token = localStorage.getItem("accessToken");
  //     if (!token) {
  //       alert("Please log in before checkout.");
  //       navigate("/login");
  //       return;
  //     }
  
  //     const accountId = localStorage.getItem("accountId");
  //     const role = localStorage.getItem("role");
  //     if (!accountId || !role) {
  //       alert("Cannot find account information. Please log in again.");
  //       navigate("/login");
  //       return;
  //     }
  
  //     let customerId = role === "CUSTOMER" ? parseInt(accountId, 10) : 0;
  
  //     if (!startDate || !endDate) {
  //       alert("Please select both start and end dates.");
  //       return;
  //     }
  //     if (!isBefore(new Date(startDate), new Date(endDate))) {
  //       alert("Start date must be before end date.");
  //       return;
  //     }
  //     if (totalDays === 0) {
  //       alert("Rental period must be at least 1 day.");
  //       return;
  //     }
  
  //     const payload = {
  //       order: {
  //         paymentMethod,
  //         purchaseMethod: 0,
  //         recipientName,
  //         recipientPhone,
  //         address,
  //         dateOfReceipt: startDate,
  //         dateOfReturn: endDate,
  //         customerId,
  //         returnUrl: "http://localhost:5173/paysuccess", 
  //       },
  //       orderItems: cartItems.map((item) => ({
  //         productId: item.productId,
  //         quantity: item.quantity,
  //       })),
  //     };
  
  //     const orderResponse = await axios.post(
  //       "http://localhost:5083/api/order/with-items",
  //       payload,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  
  //     if (!orderResponse.data.isSuccess) {
  //       alert(orderResponse.data.message || "Failed to create order.");
  //       return;
  //     }
  
  //     // Lấy orderId từ phản hồi API và lưu vào localStorage
  //     const orderId = orderResponse.data.data.order.id;
  //     localStorage.setItem("orderId", orderId);
  
  //     // Nếu dùng PayOS, điều hướng đến URL thanh toán
  //     if (paymentMethod === 2 && orderResponse.data.data.order.payOsUrl) {
  //       window.location.href = orderResponse.data.data.order.payOsUrl;
  //       return;
  //     }
  //     // Nếu không dùng PayOS, điều hướng luôn đến trang cảm ơn
  //     navigate("/thanks", {
  //       state: {
  //         date: new Date().toLocaleDateString(),
  //         recipientName,
  //         recipientEmail: localStorage.getItem("email") || "N/A",
  //         paymentMethod,
  //         address,
  //         product: cartItems.map((item) => item.productName).join(", "),
  //         totalAmount: totalAmount.toFixed(2),
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Error occurred. Check console for details.");
  //   }
  // };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Please log in before checkout.");
        navigate("/login");
        return;
      }
  
      const accountId = localStorage.getItem("accountId");
      const role = localStorage.getItem("role");
      if (!accountId || !role) {
        alert("Cannot find account information. Please log in again.");
        navigate("/login");
        return;
      }
  
      let customerId = role === "CUSTOMER" ? parseInt(accountId, 10) : 0;
  
      if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
        return;
      }
      if (!isBefore(new Date(startDate), new Date(endDate))) {
        alert("Start date must be before end date.");
        return;
      }
      if (totalDays === 0) {
        alert("Rental period must be at least 1 day.");
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
  
      const orderResponse = await api.post(
        "order/with-items",
        payload,
        // {
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      );
  
      if (!orderResponse.data.isSuccess) {
        alert(orderResponse.data.message || "Failed to create order.");
        return;
      }
  
      // ✅ Lấy orderId từ phản hồi API và lưu vào localStorage
      const orderId = orderResponse.data.data.order.id;
      console.log("Lưu orderId vào localStorage:", orderId);
      localStorage.setItem("orderId", orderId);
  
      // ✅ Điều hướng đến trang thanh toán hoặc trang cảm ơn
      if (paymentMethod === 2 && orderResponse.data.data.order.payOsUrl) {
        // Thanh toán qua PayOS
        window.location.href = orderResponse.data.data.order.payOsUrl;
        return;
      }
  
      // Nếu không dùng PayOS, chuyển hướng đến trang cảm ơn
      navigate("/thanks", {
        state: {
          date: new Date().toLocaleDateString(),
          recipientName,
          recipientEmail: localStorage.getItem("email") || "N/A",
          paymentMethod,
          address,
          product: cartItems.map((item) => item.productName).join(", "),
          totalAmount: totalAmount.toFixed(2),
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Check console for details.");
    }
  };
  
  
  

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-content">
        {/* Thông tin nhận hàng */}
        <div className="checkout-left">
          <div className="CK-section">
            <h2>Shipping Information</h2>
            <label>Recipient Name:</label>
            <input
              type="text"
              className="form-control"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
            <label>Contact:</label>
            <div className="CC-input-group">
  <div className="CC-input-wrapper">
    <div>Số điện thoại:</div>
    <input
      type="text"
      className="form-control"
      value={recipientPhone}
      onChange={(e) => setRecipientPhone(e.target.value)}
    />
  </div>
  <div className="CC-input-wrapper">
    <div>Địa chỉ:</div>
    <input
      type="text"
      className="form-control"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
  </div>
</div>

          </div>

          {/* Phương thức thanh toán */}
          <div className="CK-section">
            <h2>Payment Method</h2>
            <label className="mr-5">
              <input
                type="radio"
                name="payment-method"
                checked={paymentMethod === 0}
                onChange={() => setPaymentMethod(0)}

              />
              Cash on Delivery (COD)
            </label>
            <label>
              <input
                type="radio"
                name="payment-method"
                checked={paymentMethod === 2}
                onChange={() => setPaymentMethod(2)}
              />
              PayOS (Online Payment)
            </label>
          </div>

          {/* Ngày thuê và ngày trả */}
          {/* <div className="CK-section">
            <h2>Rental Dates</h2>
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={handleStartDateChange} />
            <label>End Date</label>
            <input type="date" value={endDate} onChange={handleEndDateChange} />
            <p>Total Days: {totalDays}</p>
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
          </div> */}
          {/* Ngày thuê và ngày trả */}
<div className="CK-section">
  <h2>Rental Dates</h2>
  <div className="date-picker-group">
    <div>
      <label>Start Date</label>
      <input type="date" value={startDate} onChange={handleStartDateChange} />
    </div>
    <div>
      <label>End Date</label>
      <input type="date" value={endDate} onChange={handleEndDateChange} />
    </div>
  </div>
  {errorMessage && <p className="error-message">{errorMessage}</p>}
  <p><strong>Total Days:</strong> {totalDays}</p>
  <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
</div>

        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="checkout-right">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.productName} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <p>Total Price: ${totalAmount.toFixed(2)}</p>

            <button className="complete-btn" onClick={handleComplete}>
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;