// import React from 'react'
// import "./PaymentPageSuccess.css";
// import paymentsuccessicon from '../../../assets/images/payment/iconthanhtoan.png'
// import { Link } from 'react-router-dom';

// function PaymentPageSuccess() {
//   return (
//     <div className='PaymentsuccessPage'>
//         <div className='container'>
//             <div className='row'>
//                 <div className='col-12 payment-flex'>
//                     <div className='PaymentsuccessPage-container'>
//                     <img src={paymentsuccessicon} className="PaymentsuccessPage-icon" alt="..."/>
//       <div className='PaymentsuccessPage-title'>
//         Chúc mừng bạn đã thanh toán thành công
//       </div>
//       <Link to="/" style={{ textDecoration: 'none' }}>
//               <div className="PaymentsuccessPage-button">
//                 <div className="TK-text">Back to Home</div>
//               </div>
//             </Link>
//                     </div>

//                 </div>

//             </div>

//         </div>

//     </div>
//   )
// }

// export default PaymentPageSuccess
import React, { useEffect } from 'react';
import "./PaymentPageSuccess.css";
import paymentsuccessicon from '../../../assets/images/payment/iconthanhtoan.png';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function PaymentPageSuccess() {
  const location = useLocation();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        const orderCode = new URLSearchParams(location.search).get("orderCode");
        if (!orderCode) {
          console.error("No orderCode found in URL.");
          return;
        }

        // Gọi API cập nhật trạng thái đơn hàng
        await axios.get(`https://localhost:7160/api/payos?orderCode=${orderCode}`);
        console.log("Payment success confirmed for order", orderCode);
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    };

    updatePaymentStatus();
  }, [location]);

  return (
    <div className='PaymentsuccessPage'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 payment-flex'>
            <div className='PaymentsuccessPage-container'>
              <img src={paymentsuccessicon} className="PaymentsuccessPage-icon" alt="..." />
              <div className='PaymentsuccessPage-title'>
                Chúc mừng bạn đã thanh toán thành công
              </div>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="PaymentsuccessPage-button">
                  <div className="TK-text">Back to Home</div>
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
