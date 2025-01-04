import React from "react";
import "./CheckoutPage.css";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
    const location = useLocation();
  const { totalPrice = 0, shippingCost = 0 } = location.state || {};

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Payment</h1>

      <div className="checkout-content">
        {/* Left Section */}
        <div className="checkout-left">
          <div className="CK-section">
            <h2>My information</h2>
            <p>Email</p>
            <p>abcxyz@gmail.com</p>
            <button className="edit-btn">✎</button>
          </div>

          <div className="CK-section">
            <h2>Billing address</h2>
            <p>Nguyen Van A</p>
            <p>A50, 50th street</p>
            <p>00700 District 9</p>
            <button className="edit-btn">✎</button>
          </div>

          <div className="CK-section">
            <h2>Delivery</h2>
            <p>Nguyen Van A</p>
            <p>0390099123</p>
            <p>Standard delivery</p>
            <p>$50 / 3-7 business days (Hanoi, Ho Chi Minh city: 3-4 business days)</p>
            <p>Nguyen Van A</p>
            <p>A50, 50th street</p>
            <p>00700 District 9</p>
            <p>Vietnam</p>
            <button className="edit-btn">✎</button>
          </div>

          <div className="CK-section">
            <h2>Pay</h2>
            <p>What payment method would you like to use?</p>
            <div className="payment-method">
              <label>
                <input type="radio" name="payment-method" defaultChecked /> Card payment
              </label>
              <div className="card-icons">
                <img className="CK-icon" src="https://static-00.iconduck.com/assets.00/visa-icon-1024x656-u9fqgerf.png" alt="Visa" />
                <img className="CK-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" alt="Mastercard" />
              </div>
            </div>

            <form className="card-payment-form">
              <label>Name *</label>
              <input type="text" placeholder="Name" required />

              <label>Surname *</label>
              <input type="text" placeholder="Surname" required />

              <label>Card number *</label>
              <input type="text" placeholder="1234 5678 9012 3456" required />

              <label>Expiration date *</label>
              <input type="text" placeholder="MM/YY" required />

              <label>CVV/CVC *</label>
              <input type="text" placeholder="123" required />
            </form>

            <label>
              <input type="radio" name="payment-method" /> Cash on Delivery (COD)
            </label>
          </div>
        </div>

        {/* Right Section */}
        <div className="checkout-right">
        <div className="order-summary">
            <h2>Order Summary</h2>
            <p>Order value: <span>${totalPrice - shippingCost}</span></p>
            <p>Delivery fee: <span>${shippingCost}</span></p>
            <div className="total-line"></div>
            <p>Total: <span>${totalPrice}</span></p>
            <button className="complete-btn">Complete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
