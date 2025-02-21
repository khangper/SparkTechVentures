// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import api from '../../Context/api';

// const OrderDetailsPage = () => {
//   const { orderId } = useParams(); // Lấy `orderId` từ URL
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("accessToken");

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       if (!token) {
//         alert("Please log in to view order details.");
//         return;
//       }

//       try {
//         const response = await api.get(
//           `/order/${orderId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data.isSuccess) {
//           setOrder(response.data.data);
//         } else {
//           setError(response.data.message || "Failed to load order details.");
//         }
//       } catch (error) {
//         console.error("Error fetching order details:", error);
//         setError("Could not fetch order details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId, token]);

//   if (loading) {
//     return <div>Loading order details...</div>;
//   }

//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Order Details</h2>
//       {order && (
//         <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
//           <p>Order ID: {order.id}</p>
//           <p>Status: {order.status}</p>
//           <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
//           <p>Payment Method: {order.paymentMethod}</p>
//           <p>Purchase Method: {order.purchaseMethod}</p>
//           <p>Recipient Name: {order.recipientName}</p>
//           <p>Recipient Phone: {order.recipientPhone}</p>
//           <p>Address: {order.address}</p>
//           <p>Date of Receipt: {order.dateOfReceipt}</p>
//           <p>Date of Return: {order.dateOfReturn}</p>
//           <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderDetailsPage;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../../Context/api';

const OrderDetailsPage = () => {
  const { orderId } = useParams(); // Lấy orderId từ URL
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!token) {
        setError("Please log in to view order details.");
        setLoading(false);
        return;
      }

      try {
        // 1. Lấy thông tin chi tiết đơn hàng từ API
        const orderResponse = await api.get(`/order/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (orderResponse.data.isSuccess) {
          setOrder(orderResponse.data.data);
        } else {
          setError(orderResponse.data.message || "Failed to load order details.");
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Could not fetch order details.");
      }

      try {
        // 2. Lấy danh sách order items sử dụng API: /orderitem/by-order/{orderId}
        const itemsResponse = await api.get(`/orderitem/by-order/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (itemsResponse.data.isSuccess) {
          setOrderItems(itemsResponse.data.data);
        } else {
          setError(itemsResponse.data.message || "Failed to load order items.");
        }
      } catch (err) {
        console.error("Error fetching order items:", err);
        setError("Could not fetch order items.");
      }

      setLoading(false);
    };

    fetchOrderData();
  }, [orderId, token]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Details</h2>
      
      {order && (
        <div
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Purchase Method:</strong> {order.purchaseMethod}</p>
          <p><strong>Recipient Name:</strong> {order.recipientName}</p>
          <p><strong>Recipient Phone:</strong> {order.recipientPhone}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Date of Receipt:</strong> {order.dateOfReceipt}</p>
          <p><strong>Date of Return:</strong> {order.dateOfReturn}</p>
          <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      )}

      <h3>Order Items</h3>
      {orderItems.length === 0 ? (
        <p>No order items found for this order.</p>
      ) : (
        orderItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <p><strong>Product Name:</strong> {item.productName}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Price per Day:</strong> ${item.price.toFixed(2)}</p>
            <p>
              <strong>Total Price:</strong> $
              {(item.price * item.quantity).toFixed(2)}
            </p>
            <p><strong>Status:</strong> {item.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderDetailsPage;
