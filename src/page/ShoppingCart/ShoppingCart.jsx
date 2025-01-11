// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ShoppingCart.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, useNavigate } from 'react-router-dom';

// const ShoppingCart = () => {
//   const [items, setItems] = useState([]);
//   const navigate = useNavigate();
//   const mockApiUrl = "https://6778ac1c482f42b62e8f5327.mockapi.io/cartItems"; 

//   // Lấy dữ liệu từ MockAPI
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(mockApiUrl);
//         setItems(response.data);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       }
//     };
  
//     fetchCartItems(); // Gọi hàm bất đồng bộ
//   }, []); // Chỉ chạy khi component được render lần đầu
  

//   // Cập nhật dữ liệu lên MockAPI
//   const updateCartItems = async (updatedItems) => {
//     try {
//       await axios.put(mockApiUrl, updatedItems);
//       setItems(updatedItems);
//     } catch (error) {
//       console.error("Error updating cart items:", error);
//     }
//   };

//   const handleCheckout = () => {
//     navigate('/CheckoutPage', { state: { totalPrice: total, shippingCost } });
//   };

//   const shippingCost = 4;
//   const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const total = subtotal + shippingCost;

//   const updateQuantity = async (id, delta) => {
//     const updatedItem = items.find((item) => item.id === id);
  
//     if (updatedItem) {
//       const newQuantity = Math.max(updatedItem.quantity + delta, 1);
  
//       try {
//         // Gửi yêu cầu cập nhật số lượng lên MockAPI
//         await axios.put(`${mockApiUrl}/${id}`, { ...updatedItem, quantity: newQuantity });
  
//         // Cập nhật state cục bộ sau khi API thành công
//         setItems((prevItems) =>
//           prevItems.map((item) =>
//             item.id === id ? { ...item, quantity: newQuantity } : item
//           )
//         );
//       } catch (error) {
//         console.error("Error updating item quantity:", error);
//       }
//     }
//   };
  

//   return (
//     <div className="shopping-container">
//       <div className="cart">
//         <div className="SH-flex">
//           <Link to="/">
//             <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="SH-icon bi bi-reply" viewBox="0 0 16 16">
//               <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.7 8.7 0 0 0-1.921-.306 7 7 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028zM7.8 10.386q.103 0 .223.006c.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96z"/>
//             </svg>
//           </Link>
//           <h2>Shopping cart</h2>
//         </div>
//         <div className="SH-line-2"></div>
//         <p>You have {items.length} item(s) in your cart</p>
//         <div className="cart-items">
//           {items.map((item) => (
//             <div key={item.id} className="cart-item">
//               <img src={item.image} alt={item.name} className="item-image" />
//               <div className="item-details">
//                 <h3>{item.name}</h3>
//                 <p>{item.brand}</p>
//               </div>
//               <div className="item-actions">
//                 <div className="quantity-selector">
//                   <button onClick={() => updateQuantity(item.id, -1)}>-</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => updateQuantity(item.id, 1)}>+</button>
//                 </div>
//                 <p className="SP-price">${item.price * item.quantity}</p>
//                 <button className="delete-btn">🗑</button>
//               </div>
//               <Link to="/ViewDetail" state={{ item }}>
//                   <button className="VD-view-detail-btn">View Detail</button>
//                 </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="summary">
//         <h2>Total</h2>
//         <div className="SH-line-1"></div>
//         <div className="summary-details">
//           <div className="item-summary">
//             <h3>Product Summary</h3>
//             {items.map((item) => (
//               <p key={item.id}>{item.name} (x{item.quantity}): ${item.price * item.quantity}</p>
//             ))}
//           </div>
//           <p>Subtotal: <span>${subtotal}</span></p>
//           <p>Shipping: <span>${shippingCost}</span></p>
//           <p>Total (Tax incl.): <span>${total}</span></p>
//         </div>
//         <div className="SH-line-1"></div>
//         <button className="checkout-btn" onClick={handleCheckout}>
//           Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShoppingCart;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShoppingCart.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // API thật của bạn, thay vì mockAPI:
  const orderItemApiUrl = "http://localhost:5083/api/orderitem";

  // Lấy danh sách order items từ server
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Lấy token để gửi kèm trong header
        const token = localStorage.getItem("accessToken");
        if (!token) {
          alert("Please log in to view your cart.");
          navigate("/login");
          return;
        }

        // Gọi API lấy order item
        const response = await axios.get(orderItemApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Kiểm tra isSuccess
        if (response.data.isSuccess) {
          // Lưu data vào state
          setItems(response.data.data);
        } else {
          alert(response.data.message || "Failed to load cart items.");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
  
    fetchCartItems();
  }, [navigate]); // Gọi khi component mount, và khi navigate thay đổi

  // Tính toán subtotal, shipping, total
  const shippingCost = 4;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  // Cập nhật số lượng (ví dụ, nếu backend cho phép PUT/PATCH đến /api/orderitem/:id)
  const updateQuantity = async (id, delta) => {
    const updatedItem = items.find((item) => item.id === id);
    if (!updatedItem) return;

    const newQuantity = Math.max(updatedItem.quantity + delta, 1);

    try {
      const token = localStorage.getItem("accessToken");
      // Giả sử server chấp nhận PUT/PATCH để cập nhật quantity
      const response = await axios.put(`${orderItemApiUrl}/${id}`, {
        ...updatedItem,
        quantity: newQuantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kiểm tra nếu cập nhật OK
      if (response.data.isSuccess) {
        // Cập nhật state cục bộ
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        alert(response.data.message || "Failed to update quantity.");
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  // (Tuỳ chọn) Xoá một item khỏi giỏ hàng
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(`${orderItemApiUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.isSuccess) {
        // Loại bỏ item khỏi state
        setItems(items.filter((item) => item.id !== id));
      } else {
        alert(response.data.message || "Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Nhấn nút Checkout
  const handleCheckout = () => {
    navigate("/CheckoutPage", {
      state: {
        totalPrice: total,
        shippingCost,
        cartItems: items,
      },
    });
  };
  

  return (
    <div className="shopping-container">
      <div className="cart">
        <div className="SH-flex">
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
              fill="currentColor" className="SH-icon bi bi-reply" viewBox="0 0 16 16">
              <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.7 8.7 0 0 0-1.921-.306 7 7 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028z"/>
            </svg>
          </Link>
          <h2>Shopping cart</h2>
        </div>
        <div className="SH-line-2"></div>
        <p>You have {items.length} item(s) in your cart</p>
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              {/* Hiển thị ảnh sản phẩm (nếu backend trả về productImage) */}
              <img src={item.productImage} alt={item.productName} className="item-image" />

              <div className="item-details">
                <h3>{item.productName}</h3>
                {/* Hiển thị brand (nếu có) */}
                <p>{item.brandName}</p>
              </div>

              <div className="item-actions">
                <div className="quantity-selector">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <p className="SP-price">${item.price * item.quantity}</p>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                  🗑
                </button>
              </div>

              {/* Xem chi tiết sản phẩm (nếu cần) */}
              <Link to="/ViewDetail" state={{ item }}>
                <button className="VD-view-detail-btn">View Detail</button>
              </Link>
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
              <p key={item.id}>
                {item.productName} (x{item.quantity}): 
                ${item.price * item.quantity}
              </p>
            ))}
          </div>
          <p>Subtotal: <span>${subtotal}</span></p>
          <p>Shipping: <span>${shippingCost}</span></p>
          <p>Total (Tax incl.): <span>${total}</span></p>
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
