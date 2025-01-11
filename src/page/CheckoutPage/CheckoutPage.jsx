import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { format, differenceInDays, isBefore } from "date-fns";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy dữ liệu từ ShoppingCart
  const { totalPrice = 0, shippingCost = 0, cartItems = [] } = location.state || {};

  // State cho form
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CREDIT"); // "CREDIT" hoặc "CASH"

  // State cho ngày thuê và ngày trả
  const [startDate, setStartDate] = useState(""); // Ngày thuê
  const [endDate, setEndDate] = useState(""); // Ngày trả
  const [totalDays, setTotalDays] = useState(0); // Số ngày thuê
  const [totalAmount, setTotalAmount] = useState(0); // Tổng số tiền

  // Hàm xử lý thay đổi ngày thuê
  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    setStartDate(selectedDate);

    // Nếu đã có ngày trả thì tính toán lại
    if (endDate && isBefore(new Date(selectedDate), new Date(endDate))) {
      const days = differenceInDays(new Date(endDate), new Date(selectedDate));
      setTotalDays(days);
      setTotalAmount(days * totalPrice); // Số ngày * giá thuê mỗi ngày
    } else {
      setTotalDays(0);
      setTotalAmount(0);
    }
  };

  // Hàm xử lý thay đổi ngày trả
  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;
    setEndDate(selectedDate);

    // Nếu đã có ngày thuê thì tính toán
    if (startDate && isBefore(new Date(startDate), new Date(selectedDate))) {
      const days = differenceInDays(new Date(selectedDate), new Date(startDate));
      setTotalDays(days);
      setTotalAmount(days * totalPrice); // Số ngày * giá thuê mỗi ngày
    } else {
      alert("End date must be after start date.");
      setTotalDays(0);
      setTotalAmount(0);
    }
  };

  // Khi bấm Complete
  const handleComplete = async () => {
    try {
      // 1. Kiểm tra token
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Please log in before checkout.");
        navigate("/login");
        return;
      }

      // 2. Lấy accountId, role
      const accountId = localStorage.getItem("accountId");
      const role = localStorage.getItem("role");
      if (!accountId || !role) {
        alert("Cannot find account information. Please log in again.");
        navigate("/login");
        return;
      }

      // 3. Xác định staffId / customerId
      let staffId = 0;
      let customerId = 0;
      if (role === "STAFF") {
        staffId = parseInt(accountId, 10);
      } else if (role === "CUSTOMER") {
        customerId = parseInt(accountId, 10);
      }

      // 4. Kiểm tra logic ngày
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

      // 5. Gọi API tạo order
      const orderResponse = await axios.post(
        "http://localhost:5083/api/order",
        {
          staffId,
          customerId,
          totalPrice: totalAmount, // Tổng tiền đã tính toán
          paymentMethod,
          purchaseMethod: "ONLINE",
          recipientName,
          recipientPhone,
          address,
          dateOfReceipt: startDate, // Ngày thuê
          dateOfReturn: endDate, // Ngày trả
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 6. Kiểm tra kết quả tạo order
      if (!orderResponse.data.isSuccess) {
        alert(orderResponse.data.message || "Failed to create order.");
        return;
      }

      const newOrderId = orderResponse.data.data.id; // Lấy orderId từ backend

      // 7. Gọi API tạo transaction
      const transactionResponse = await axios.post(
        "http://localhost:5083/api/transaction",
        {
          orderId: newOrderId,
          accountId: parseInt(accountId, 10),
          paymentMethod: paymentMethod === "CASH" ? "CASH" : "TRANSFER",
          totalPrice: totalAmount,
          status: "PENDING", // Hoặc "PAID" tuỳ logic
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 8. Kiểm tra kết quả tạo transaction
      if (!transactionResponse.data.isSuccess) {
        alert(transactionResponse.data.message || "Failed to create transaction.");
        return;
      }

      alert("Order & Transaction created successfully!");
      navigate("/transaction");
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Check console for details.");
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-content">
        {/* Thông tin nhận hàng, paymentMethod... */}
        <div className="checkout-left">
          <div className="CK-section">
            <h2>Shipping Information</h2>
            <label>Recipient Name:</label>
            <input
            placeholder="Your Name"
              type="text"
               class="form-control"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
            <label>Conect:</label>
            <div className="input-group mb-3" >
            <input
             placeholder="Phone Number"
              type="text"  class="form-control"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
            />
          
            <input
            placeholder="Address"
              type="text"  class="form-control"
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
            />
            </div>
            
          </div>

          <div className="CK-section">
            <h2>Payment Method</h2>
            <div className="Ck-flexflex">
            <label>
              <input
                type="radio"
                name="payment-method"
                checked={paymentMethod === "CREDIT"}
                onChange={() => setPaymentMethod("CREDIT")}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="payment-method"
                checked={paymentMethod === "CASH"}
                onChange={() => setPaymentMethod("CASH")}
              />
              Cash on Delivery (COD)
            </label>
            </div>

          </div>

          <div className="CK-section">
            {/* <h2>Rental Dates</h2>
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
            />
            <p>Total Days: {totalDays}</p>
            <p>Total Amount: ${totalAmount.toFixed(2)}</p> */}

<div class="rental-section">
  <h2>Rental Dates</h2>
  <label>Start Date</label>
  <input
    type="date"
    value={startDate}
    onChange={handleStartDateChange}
  />
  <label>End Date</label>
  <input
    type="date"
    value={endDate}
    onChange={handleEndDateChange}
  />
  <p>Total Days: {totalDays}</p>
  <p>Total Amount: ${totalAmount.toFixed(2)}</p>
</div>
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
            <p>Shipping Cost: ${shippingCost}</p>
            <p>Total Price:${totalAmount.toFixed(2)}</p>

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
