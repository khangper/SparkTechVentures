import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from '../../Context/api';

const OrderDetailsPage = () => {
  const { orderId } = useParams(); // Lấy `orderId` từ URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!token) {
        alert("Please log in to view order details.");
        return;
      }

      try {
        const response = await api.get(
          `/order/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.isSuccess) {
          setOrder(response.data.data);
        } else {
          setError(response.data.message || "Failed to load order details.");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("Could not fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
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
        <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
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
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
