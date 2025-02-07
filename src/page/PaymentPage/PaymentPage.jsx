import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy thông tin đơn hàng từ trang CheckoutPage
  const { orderId, totalAmount } = location.state || {};

  // State để lưu link thanh toán từ PayOS
  const [paymentLink, setPaymentLink] = useState("");
  const [error, setError] = useState("");

  // Gọi API để tạo link thanh toán
  useEffect(() => {
    const createPaymentLink = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          alert("Please log in to proceed with payment.");
          navigate("/login");
          return;
        }

        // Gọi API PayOS để tạo link thanh toán
        const response = await axios.post(
          "http://localhost:5083/api/payos",
          {
            orderCode: orderId, // Mã đơn hàng
            amount: totalAmount, // Tổng số tiền thanh toán
            description: `Payment for order #${orderId}`, // Mô tả đơn hàng
            returnUrl: "http://localhost:3000/payment-success", // URL sau khi thanh toán thành công
            cancelUrl: "http://localhost:3000/payment-cancel", // URL nếu thanh toán bị hủy
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.isSuccess) {
          // Lưu link thanh toán vào state
          setPaymentLink(response.data.data.paymentUrl);
        } else {
          setError(response.data.message || "Failed to create payment link.");
        }
      } catch (error) {
        console.error("Error creating payment link:", error);
        setError("An error occurred while creating the payment link.");
      }
    };

    if (orderId && totalAmount) {
      createPaymentLink();
    } else {
      setError("Invalid order information. Please try again.");
    }
  }, [orderId, totalAmount, navigate]);

  // Chuyển hướng đến trang thanh toán của PayOS
  const handleProceedToPayment = () => {
    if (paymentLink) {
      window.location.href = paymentLink; // Chuyển hướng đến trang thanh toán
    } else {
      alert("Payment link is not available. Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>
      <div className="payment-content">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <p>Order ID: {orderId}</p>
            <p>Total Amount: ${totalAmount}</p>
            {paymentLink ? (
              <button className="proceed-btn" onClick={handleProceedToPayment}>
                Proceed to Payment
              </button>
            ) : (
              <p>Generating payment link...</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;