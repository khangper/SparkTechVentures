// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const OrderListPage = () => {
//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem("accessToken");
//   const accountId = localStorage.getItem("accountId");

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!token || !accountId) {
//         alert("Please log in to view order history.");
//         return;
//       }

//       try {
//         // Gọi API order
//         const response = await axios.get("http://localhost:5083/api/order", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.data.isSuccess) {
//           // Lọc đơn hàng theo accountId (nếu API chưa lọc sẵn)
//           const userOrders = response.data.data.filter(
//             (order) => order.customerId === parseInt(accountId, 10)
//           );
//           setOrders(userOrders);
//         } else {
//           alert(response.data.message || "Failed to load orders.");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         alert("Could not fetch orders.");
//       }
//     };

//     fetchOrders();
//   }, [token, accountId]);

//   if (!token || !accountId) {
//     return <div>Please log in to view order history.</div>;
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Order History</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
//             <p>Order ID: {order.id}</p>
//             <p>Status: {order.status}</p>
//             <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
//             <p>Payment Method: {order.paymentMethod}</p>
//             <p>Purchase Method: {order.purchaseMethod}</p>
//             <p>Recipient Name: {order.recipientName}</p>
//             <p>Recipient Phone: {order.recipientPhone}</p>
//             <p>Address: {order.address}</p>
//             <p>Date of Receipt: {order.dateOfReceipt}</p>
//             <p>Date of Return: {order.dateOfReturn}</p>
//             <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default OrderListPage;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("accessToken");
  const accountId = localStorage.getItem("accountId");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token || !accountId) {
        alert("Please log in to view order history.");
        return;
      }

      try {
        // Gọi API order
        const response = await axios.get("http://localhost:5083/api/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.isSuccess) {
          // Lọc đơn hàng theo accountId (nếu API chưa lọc sẵn)
          const userOrders = response.data.data.filter(
            (order) => order.customerId === parseInt(accountId, 10)
          );
          setOrders(userOrders);
        } else {
          alert(response.data.message || "Failed to load orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Could not fetch orders.");
      }
    };

    fetchOrders();
  }, [token, accountId]);

  if (!token || !accountId) {
    return <div>Please log in to view order history.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              position: "relative",
            }}
          >
            <p>Order ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
            <p>Payment Method: {order.paymentMethod}</p>
            <p>Purchase Method: {order.purchaseMethod}</p>
            <p>Recipient Name: {order.recipientName}</p>
            <p>Recipient Phone: {order.recipientPhone}</p>
            <p>Address: {order.address}</p>
            <p>Date of Receipt: {order.dateOfReceipt}</p>
            <p>Date of Return: {order.dateOfReturn}</p>
            <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>

            {/* Link tới trang Order Details */}
            <Link
              to={`/order/${order.id}`}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                textDecoration: "none",
                color: "#007bff",
              }}
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderListPage;
