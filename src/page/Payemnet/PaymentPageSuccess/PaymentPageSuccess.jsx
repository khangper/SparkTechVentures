import React, { useEffect, useState } from 'react';
import "./PaymentPageSuccess.css";
import paymentsuccessicon from '../../../assets/images/payment/iconthanhtoan.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PaymentPageSuccess() {
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const storedOrderId = localStorage.getItem("orderId");
        const token = localStorage.getItem("accessToken");

        console.log("Order ID từ LocalStorage:", storedOrderId);
        console.log("Token từ LocalStorage:", token);

        if (!storedOrderId) {
          console.error("Không tìm thấy orderId trong localStorage.");
          return;
        }
        if (!token) {
          console.error("Không tìm thấy accessToken. Người dùng chưa đăng nhập?");
          return;
        }

        // Gọi API cập nhật trạng thái thanh toán với Bearer Token
        const response = await axios.get(`http://localhost:5083/api/payos?orderCode=${storedOrderId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm Authorization Token
            "Content-Type": "application/json",
          },
        });

        console.log("API cập nhật trạng thái đơn hàng:", response.data);

        if (response.status === 200) {
          setOrderStatus(response.data);
        }

        localStorage.removeItem("orderId"); // Xóa orderId sau khi lấy dữ liệu
      } catch (error) {
        if (error.response?.status === 404) {
          console.error("Không tìm thấy đơn hàng. Kiểm tra orderCode:", orderId);
          alert("Không tìm thấy đơn hàng. Vui lòng kiểm tra lại!");
        } else if (error.response?.status === 401) {
          console.error("Lỗi 401: Token không hợp lệ hoặc hết hạn.");
          alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        } else {
          console.error("Lỗi khi gọi API:", error);
          alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
        }
      }
    };

    fetchOrderStatus();
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
              {orderId && (
                <div className="PaymentsuccessPage-order">
                  Mã đơn hàng: <strong>{orderId}</strong>
                </div>
              )}
              {/* {orderStatus && (
                <div className="PaymentsuccessPage-status">
                  Trạng thái đơn hàng: {orderStatus.status || "Không xác định"}
                </div>
              )} */}
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
