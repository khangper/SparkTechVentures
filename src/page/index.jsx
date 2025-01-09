import React, { useEffect, useState } from 'react';
import './index.css';
import bigstock from '../assets/images/bigstock.png';
import smalltock1 from '../assets/images/smallstock1.png'
import smalltock2 from '../assets/images/smallstock2.png'
import smalltock3 from '../assets/images/smallstock3.png'
import startbreadown5 from '../assets/images/rating-5.png'
import startbreadown4 from '../assets/images/rating-4.png'
import startbreadown3 from '../assets/images/rating-3.png'
import startbreadown2 from '../assets/images/rating-2.png'
import startbreadown1 from '../assets/images/rating-1.png'

import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../Context/api';


export default function Main() {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const productId = searchParams.get("id"); // Lấy ID từ query string

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/${productId}`);
        if (response.data.isSuccess) {
          setProduct(response.data.data);
        } else {
          console.error("Error: ", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (

<div>
  <div className='breadcrumb-container'>
  <div className='breadcrumb'>
  <Link to='/'><span herf='/'>Home </span></Link><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
</svg>
  <Link to='/AllProduct'><span>View all</span></Link><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
</svg>
   <span>Detail</span>
</div>
{/* <div className='search-bar'>
  <input type='text' placeholder='Search...' />
</div> */}
  </div>


<div className='main-container'>


<div className='left-image-container'>
   {/* Ảnh lớn chính */}
   <div className='main-image'>
   <img
  className="HH-Picture-small"
  src={product.defaultImage || "http://localhost:5083/images/default-image.jpg"}
  alt={product.name || "Product image"}
/>
  </div>

  {/* Thumbnails */}
  <div className='thumbnail-container'>
    <div className='thumbnail'>
      <img src={smalltock1} alt="Excavator view 1" />
    </div>
    <div className='thumbnail'>
      <img src={smalltock2} alt="Excavator view 2" />
    </div>
    <div className='thumbnail'>
      <img src={smalltock3} alt="Excavator view 3" />
    </div>
  </div>
</div>


<div className='product-container'>
  <div className='price-status'>
  <button className='price-btn'>
    <span className='currency'>$</span>
    
    <span className='price'>{product.price}/Day</span> 

  </button>
  <button className='status-btn'>
    <span className='status-label'>Stock:</span>
    <span className='status-value'>{product.stock}</span>
  </button>
</div>

<div className='cart-section'>
  <button className='add-cart-btn'>
    <span className='cart-text'>Add to Cart</span>
  </button>
  <div className='cart-icon-wrapper'>
    <div className='cart-icon' />
  </div>
</div>

<div className='buy-section'>
  <button className='buy-btn'>Buy Now</button>
</div>

<div className='product-info'>

  <span className='product-title'>
  {product.name}
  </span>

  <div className='product-image' />
  <div className='rating'>
    <div className='rating-stars'>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className='star-icon' />
      ))}
    </div>
    <span className='rating-count'>(3,345)</span>
  </div>
</div>
<div className='vendor'>
  <span className='vendor-prefix'>by</span>
  <span className='vendor-name'> {product.storeName}</span>
</div>
<div className='CM-container'>
  <div className='CM-header-row'>
    <span className='CM-username'>Alex Morningstar</span>
    <div className='CM-avatar' />
    <div className='Star-th'>
      <div className='CM-rating-star' />
      <div className='CM-rating-star-second' />
      <div className='CM-rating-star-third' />
      <div className='CM-rating-star-fourth' />
      <div className='CM-rating-star-fifth' />
    </div>
  </div>
  <div className='CM-description'>
    <span className='CM-highlight'>
      Contrary to popular belief <br />
    </span>
    <span className='CM-details'>
      Its ability to move flexibly on rough terrain and optimized technical details make this excavator an excellent choice for any project, from construction to mining.
    </span>
  </div>
  <div className='CM-separator-line' />
</div>
</div>

</div>

<div class="ViewD-product-description">
  <h2 class="ViewD-title">Description</h2>
  <p class="ViewD-description-text">
    {product.description}
    <p>Category: {product.categoryName}</p>
    <p>Brand: {product.brandName}</p>
  </p>
  <div class="ViewD-technical-specifications">
    <h3>Technical specifications:</h3>
    <table class="ViewD-specifications-table">
      <tr>
        <th>Weight</th>
        <td>{product.weight}</td>
      </tr>
      <tr>
        <th>Dimensions</th>
        <td>{product.dimensions}</td>
      </tr>
      <tr>
        <th>Fuel Type</th>
        <td>{product.fuelType}</td>
      </tr>
    </table>
  </div>
</div>


{/* Feedback */}

{/* <div className='main-container-FB'>


<div className='left-image-container'>
<div className="TT-container">
  <div className="TT-header">
    <span className="TT-title">Rate Alem Cinema</span>
  </div>
  <div className="TT-sub-header">
    <span className="TT-description">Rating and reviews are verified and are from people who use the service</span>
  </div>
  <div className="TT-content">
    <div className="TT-rating-summary">
      <div className="TT-rating-score">
        <span className="TT-score">4.5</span>
      </div>
      <div className="TT-rating-stars">
        {[...Array(4)].map((_, index) => (
          <div className="TT-star" key={index}>
            <div className="TT-star-icon"></div>
          </div>
        ))}
        <div className="TT-star-half"></div>
      </div>
      <span className="TT-review-count">2,256,896</span>
    </div>
    <div className="TT-rating-breakdown">
      <div className="TT-breakdown-item">
        <span className="TT-rating-number">5</span>
        <div className="TT-progress-bar">
          <img 
            src={startbreadown5} // Hình ảnh cho đánh giá 5
            alt="Rating 5" 
            className="TT-progress-inner" 
          />
        </div>
      </div>
      <div className="TT-breakdown-item">
        <span className="TT-rating-number">4</span>
        <div className="TT-progress-bar">
          <img 
            src={startbreadown4} // Hình ảnh cho đánh giá 4
            alt="Rating 4" 
            className="TT-progress-inner" 
          />
        </div>
      </div>
      <div className="TT-breakdown-item">
        <span className="TT-rating-number">3</span>
        <div className="TT-progress-bar">
          <img 
            src={startbreadown3} // Hình ảnh cho đánh giá 3
            alt="Rating 3" 
            className="TT-progress-inner" 
          />
        </div>
      </div>
      <div className="TT-breakdown-item">
        <span className="TT-rating-number">2</span>
        <div className="TT-progress-bar">
          <img 
            src={startbreadown2} // Hình ảnh cho đánh giá 2
            alt="Rating 2" 
            className="TT-progress-inner" 
          />
        </div>
      </div>
      <div className="TT-breakdown-item">
        <span className="TT-rating-number">1</span>
        <div className="TT-progress-bar">
          <img 
            src={startbreadown1} // Hình ảnh cho đánh giá 1
            alt="Rating 1" 
            className="TT-progress-inner" 
          />
        </div>
      </div>
    </div>
  </div>
</div>  
</div>


<div className='product-container'>
<div className="FB-feedback-container">
    <div className="FB-feedback-header">
      <div className="FB-feedback-title">Session feedback</div>
      <div className="FB-feedback-subtitle">Please rate your experience below</div>
    </div>
    <div className="FB-feedback-rating">
      <div className="FB-rating-stars">
        <div className="FB-star FB-full" />
        <div className="FB-star FB-full" />
        <div className="FB-star FB-full" />
        <div className="FB-star FB-full" />
        <div className="FB-star FB-half" />
      </div>
      <div className="FB-rating-score">4/5 stars</div>
    </div>
    <div className="FB-feedback-additional">
      <div className="FB-additional-title">Additional feedback</div>
      <div className="FB-additional-input">
        <span className="FB-input-label">My feedback:</span>
        <input 
          className="FB-input-box" 
         
          rows="4" 
          style={{ resize: 'none' }}
        />
      </div>
    </div>
  </div>
  
</div>



</div> */}


</div>

 




  );
}



