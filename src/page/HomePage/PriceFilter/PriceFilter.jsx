import React, { useState } from 'react';
import './PriceFilter.css';

const PriceFilter = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState(4);
  const [maxPrice, setMaxPrice] = useState(800);

  const handleMinChange = (event) => {
    const value = Number(event.target.value);
    setMinPrice(value);
    onPriceChange(value, maxPrice); // Gửi giá trị về trang cha
  };

  const handleMaxChange = (event) => {
    const value = Number(event.target.value);
    setMaxPrice(value);
    onPriceChange(minPrice, value); // Gửi giá trị về trang cha
  };

  return (
    <div className="price-filter">
      <div className="slider-container">
        <input
          type="range"
          min="4"
          max="800"
          value={minPrice}
          onChange={handleMinChange}
          className="slider"
        />
        <input
          type="range"
          min="4"
          max="800"
          value={maxPrice}
          onChange={handleMaxChange}
          className="slider"
        />
      </div>
      <div className="displayflex">
        <div className="price-range">
          Giá ${minPrice} - ${maxPrice}
        </div>
        <button className="filter-button">Filter</button>
      </div>
    </div>
  );
};

export default PriceFilter;



