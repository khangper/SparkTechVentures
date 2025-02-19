import React, { useEffect, useState } from 'react';
import "./PaymentPageSuccess.css";
import paymentsuccessicon from '../../../assets/images/payment/iconthanhtoan.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PaymentPageSuccess() {
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        const orderId = localStorage.getItem("orderId");
        console.log("Order ID từ LocalStorage:", orderId); 
  
        if (!orderId) {
          console.error("No orderId found in localStorage.");
          return;
        }
  
        // Gọi API http://localhost:5173/paysuccess trước
        const paySuccessResponse = await axios.get("http://localhost:5173/paysuccess");
        console.log("PaySuccess API Response:", paySuccessResponse.data);
  
        // Sau khi gọi thành công, tiếp tục cập nhật trạng thái đơn hàng
        const response = await axios.get(`https://localhost:5173/api/payos?orderCode=${orderId}`);
        console.log("API cập nhật trạng thái đơn hàng:", response.data);
  
        if (response.status === 200) {
          setOrderStatus(response.data);
        }
  
        localStorage.removeItem("orderId"); // Xóa sau khi xong
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    };
  
    updatePaymentStatus();
  }, []);
  

  return (
    <div className='PaymentsuccessPage'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 payment-flex'>
            <div className='PaymentsuccessPage-container'>
              <img src={paymentsuccessicon} className="PaymentsuccessPage-icon" alt="Payment Success" />
              <div className='PaymentsuccessPage-title'>
                Chúc mừng bạn đã thanh toán thành công
              </div>
              {orderStatus && (
                <div className="PaymentsuccessPage-status">
                  Trạng thái đơn hàng: {orderStatus.status || "Không xác định"}
                </div>
              )}
              <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="PaymentsuccessPage-button">
                  <div className="TK-text">Quay về trang chủ</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPageSuccess;

