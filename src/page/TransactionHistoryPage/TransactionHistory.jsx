import React, { useEffect, useState } from "react";
import api from "../../Context/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TransactionHistory.css";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const accountId = localStorage.getItem("accountId");

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token || !accountId) {
        alert("Please log in to view transaction history.");
        return;
      }
  
      setLoading(true);
      try {
        const response = await api.get(`/transaction/account/${accountId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.data.isSuccess) {
          // Sắp xếp giao dịch theo thời gian mới nhất trước
          const sortedTransactions = response.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
  
          setTransactions(sortedTransactions);
        } else {
          alert(response.data.message || "Failed to load transactions.");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        alert("Could not fetch transactions.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, [token, accountId]);
  

  if (!token || !accountId) {
    return <div className="TransactionPage-alert alert alert-warning">Please log in to view transaction history.</div>;
  }

  return (
    <div className="TransactionPage-container container mt-4">
      <h2 className="TransactionPage-title text-center mb-4">Transaction History</h2>

      {loading ? (
        <p className="text-center">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center">No transactions found.</p>
      ) : (
        <div className="TransactionPage-list row">
          {transactions.map((tx) => (
            <div key={tx.id} className="TransactionPage-card col-md-6 mb-3">
              <div className="card shadow-sm p-3 border-0 rounded hover-effect">
                <div className="card-body">
                  <h5 className="TransactionPage-titlelitte">Transaction ID: {tx.id}</h5>
                  <p className="mb-1"><strong>Order ID:</strong> {tx.orderId}</p>
                  <p className="mb-1"><strong>Payment Method:</strong> {tx.paymentMethod}</p>
                  <p className="mb-1"><strong>Total Price:</strong> {tx.totalPrice} VND</p>
                  <p className="mb-1"><strong>Status:</strong> <span className={`badge ${tx.status === 'COMPLETED' ? 'bg-success' : 'bg-danger'}`}>{tx.status}</span></p>
                  <p className="mb-0"><strong>Created At:</strong> {new Date(tx.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
