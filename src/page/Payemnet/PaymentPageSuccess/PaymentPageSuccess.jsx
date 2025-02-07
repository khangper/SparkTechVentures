import React from 'react'
import "./PaymentPageSuccess.css";
import paymentsuccessicon from '../../../assets/images/payment/iconthanhtoan.png'
import { Link } from 'react-router-dom';

function PaymentPageSuccess() {
  return (
    <div className='PaymentsuccessPage'>
        <div className='container'>
            <div className='row'>
                <div className='col-12 payment-flex'>
                    <div className='PaymentsuccessPage-container'>
                    <img src={paymentsuccessicon} className="PaymentsuccessPage-icon" alt="..."/>
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
  )
}

export default PaymentPageSuccess
