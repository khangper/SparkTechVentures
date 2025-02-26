
import React, { useState } from 'react';
import './PriceFilter.css';

const PriceFilter = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState(70000); // Giá trị min khởi tạo
  const [maxPrice, setMaxPrice] = useState(150000); // Giá trị max khởi tạo

  const handleMinChange = (event) => {
    const value = Number(event.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (event) => {
    const value = Number(event.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  const handleFilterClick = () => {
    // Chỉ gửi giá trị về component cha khi nhấn nút Filter
    onPriceChange(minPrice, maxPrice);
  };

  return (
    <div className="price-filter">
      <div className="slider-container">
        <input
          type="range"
          min="70000"
          max="150000"
          value={minPrice}
          onChange={handleMinChange}
          className="slider"
        />
        <input
          type="range"
          min="70000"
          max="150000"
          value={maxPrice}
          onChange={handleMaxChange}
          className="slider"
        />
      </div>
      <div className="price-range">
        Price: {new Intl.NumberFormat().format(minPrice)} - {new Intl.NumberFormat().format(maxPrice)} VND/day
      </div>
      <button className="filter-button" onClick={handleFilterClick}>
        Filter
      </button>
    </div>
  );
};

export default PriceFilter;
