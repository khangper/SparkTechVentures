import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Lấy trạng thái thanh toán từ URL
    const params = new URLSearchParams(location.search);
    const status = params.get("status"); // Giả sử PayOS gửi status=success hoặc status=failed

    if (status === "success") {
      navigate("/thanks");
    } else {
      alert("Payment failed or canceled.");
      navigate("/cart");
    }
  }, [navigate, location]);

  return <div>Processing your payment...</div>;
};

export default PaymentSuccess;
