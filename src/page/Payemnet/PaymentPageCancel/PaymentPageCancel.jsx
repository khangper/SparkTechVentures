// import React from 'react'
// import paymentsuccessicon from '../../../assets/images/payment/iconcancel.png'
// import { Link } from 'react-router-dom';

// function PaymentPageCancel() {
//   return (
//     <div className='PaymentsuccessPage'>
//         <div className='container'>
//             <div className='row'>
//                 <div className='col-12 payment-flex'>
//                     <div className='PaymentsuccessPage-container'>
//                     <img src={paymentsuccessicon} className="PaymentsuccessPage-icon" alt="..."/>
//       <div className='PaymentsuccessPage-title'>
//         Bạn đã thanh toán thất bại
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

// export default PaymentPageCancel
import React, { useEffect } from 'react';
import paymentsuccessicon from '../../../assets/images/payment/iconcancel.png';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function PaymentPageCancel() {
  const location = useLocation();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        const orderCode = new URLSearchParams(location.search).get("orderCode");
        if (!orderCode) {
          console.error("No orderCode found in URL.");
          return;
        }

        // Gọi API cập nhật trạng thái đơn hàng (hủy thanh toán)
        await axios.get(`https://localhost:7160/api/payos?orderCode=${orderCode}`);
        console.log("Payment canceled for order", orderCode);
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
                Bạn đã thanh toán thất bại
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

export default PaymentPageCancel;
