import React from 'react'
import paymentsuccessicon from '../../../assets/images/payment/iconcancel.png'
import { Link } from 'react-router-dom';

function PaymentPageCancel() {
  return (
    <div className='PaymentsuccessPage'>
        <div className='container'>
            <div className='row'>
                <div className='col-12 payment-flex'>
                    <div className='PaymentsuccessPage-container'>
                    <img src={paymentsuccessicon} className="PaymentsuccessPage-icon" alt="..."/>
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
  )
}

export default PaymentPageCancel
