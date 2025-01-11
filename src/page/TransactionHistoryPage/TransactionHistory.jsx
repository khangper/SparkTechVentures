import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("accessToken");
  const accountId = localStorage.getItem("accountId");

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token || !accountId) {
        alert("Please log in to view transaction history.");
        return;
      }

      try {
        // Gọi API transaction
        const response = await axios.get("http://localhost:5083/api/transaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.isSuccess) {
          // Lọc transaction theo accountId (nếu API chưa lọc sẵn)
          const userTransactions = response.data.data.filter(
            (t) => t.accountId === parseInt(accountId, 10)
          );
          setTransactions(userTransactions);
        } else {
          alert(response.data.message || "Failed to load transactions.");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        alert("Could not fetch transactions.");
      }
    };

    fetchTransactions();
  }, [token, accountId]);

  if (!token || !accountId) {
    return <div>Please log in to view transaction history.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        transactions.map((tx) => (
          <div key={tx.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p>Transaction ID: {tx.id}</p>
            <p>Order ID: {tx.orderId}</p>
            <p>Account ID: {tx.accountId}</p>
            <p>Payment Method: {tx.paymentMethod}</p>
            <p>Total Price: {tx.totalPrice}</p>
            <p>Status: {tx.status}</p>
            <p>Created At: {new Date(tx.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionHistory;
