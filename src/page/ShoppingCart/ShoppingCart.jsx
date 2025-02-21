import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu giỏ hàng từ sessionStorage
    const storedCartItems = sessionStorage.getItem("cartItems");
    if (storedCartItems) {
      setItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Hàm cập nhật số lượng của sản phẩm
  const updateQuantity = (productId, delta) => {
    const updatedItems = items.map(item => {
      if (item.productId === productId) {
        return { ...item, quantity: Math.max(item.quantity + delta, 1) };
      }
      return item;
    });
    setItems(updatedItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  // Hàm xoá sản phẩm khỏi giỏ hàng
  const handleDelete = (productId) => {
    const updatedItems = items.filter(item => item.productId !== productId);
    setItems(updatedItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  // Tính toán tổng tiền
  const shippingCost = 4;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal ;

  // Chuyển sang trang CheckoutPage
  const handleCheckout = () => {
    navigate("/CheckoutPage", {
      state: {
        cartItems: items,
        totalPrice: total,
        shippingCost,
      },
    });
  };

  return (
    <div className="shopping-container">
      <div className="cart">
        <div className="SH-flex">
          <Link to="/">
            {/* Icon hoặc nút quay lại */}
          </Link>
          <h2>Shopping cart</h2>
        </div>
        <div className="SH-line-2"></div>
        <p>You have {items.length} item(s) in your cart</p>
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.productId} className="cart-item">
              <img src={item.defaultImage} alt={item.productName} className="item-image" />
              <div className="item-details">
                <h3>{item.productName}</h3>
              </div>
              <div className="item-actions">
                <div className="quantity-selector">
                  <button onClick={() => updateQuantity(item.productId, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, 1)}>+</button>
                </div>
                <p className="SP-price">${(item.price * item.quantity).toFixed(2)}</p>
                <button className="delete-btn" onClick={() => handleDelete(item.productId)}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="summary">
        <h2>Total</h2>
        <div className="SH-line-1"></div>
        <div className="summary-details">
          <div className="item-summary">
            <h3>Product Summary</h3>
            {items.map((item) => (
              <p key={item.productId}>
                {item.productName} (x{item.quantity}): ${ (item.price * item.quantity).toFixed(2) }
              </p>
            ))}
          </div>
          <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
          {/* <p>Shipping: <span>${shippingCost.toFixed(2)}</span></p> */}
          <p>Total (Tax incl.): <span>${total.toFixed(2)}</span></p>
        </div>
        <div className="SH-line-1"></div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
