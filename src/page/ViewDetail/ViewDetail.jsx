import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewDetail.css";

const ViewDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  if (!item) {
    return (
      <div className="VD-detail-container">
        <h2>No item selected!</h2>
        <button className="VD-back-btn" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="VD-detail-container">
      <button className="VD-back-btn" onClick={() => navigate("/shoppingCart")}>
        ← Back to Shopping Cart
      </button>
      <div className="VD-detail-content">
        <img src={item.image} alt={item.name} className="VD-detail-image" />
        <div className="VD-detail-info">
          <h2>{item.name}</h2>
          <p><strong>Brand:</strong> {item.brand}</p>
          <p><strong>Price:</strong> ${item.price}</p>
          {/* <p><strong>Description:</strong> {item.description}</p> */}
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;
