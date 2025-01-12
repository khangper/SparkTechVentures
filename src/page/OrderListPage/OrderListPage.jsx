
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from '../../Context/api';

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
        const response = await api.get("/order", {
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
    <div style={{ padding: "0px 400px" }}>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
          className="order-history"
            key={order.id}
            style={{
              backgroundColor: 'wheat', borderRadius: '20px', color: 'darkblue', border: '1px solid #ccc', margin: '10px', padding: '10px', position: 'relative'
              
            }}
          >
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Total Price:</b> ${order.totalPrice.toFixed(2)}</p>
           

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
             
              <button type="button" class="btn btn-outline-info"> View Details</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderListPage;
