import React from 'react';
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

import { useLocation } from 'react-router-dom';


export default function Main() {
  const location = useLocation(); const queryParams = new URLSearchParams(location.search); const name = queryParams.get('name'); const price = queryParams.get('price');
  const img = queryParams.get('img');

  console.log('Received data:', location.state);
  return (

<div>
  <div className='breadcrumb-container'>
  <div className='breadcrumb'>
  <span>Home</span>
  <span>View All</span>
  <span>Excavator</span>
</div>
<div className='search-bar'>
  <input type='text' placeholder='Search...' />
</div>
  </div>


<div className='main-container'>


<div className='left-image-container'>
   {/* Ảnh lớn chính */}
   <div className='main-image'>
    <img  src={img} alt="Excavator main view" />
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
    {name && price && (
    <span className='price'>{price}/Day</span>  )}
  </button>
  <button className='status-btn'>
    <span className='status-label'>Status:</span>
    <span className='status-value'>Good</span>
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
{name && price && (
  <span className='product-title'>
   {name}
  </span>)}
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
  <span className='vendor-name'> Sparktech ventures</span>
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


<div className='Description'>

  <div className="excavator-description">
    <h2 className="description-title">Description</h2>
    
      <p>
        The excavator is a specialized construction machine designed for tasks
        like digging, lifting, material transportation, and leveling. Its
        ability to operate efficiently on various terrains makes it the perfect
        choice for large-scale construction projects, mining, and infrastructure
        works. Equipped with a powerful engine, a high-capacity bucket, and a
        comfortable cabin, this excavator ensures high performance and saves
        time.
      </p>
    
    <h3>Key Features:</h3>
    <ul>
      <li>Durable, high-performance engine.</li>
      <li>Large-capacity bucket for increased productivity.</li>
      <li>User-friendly design with easy controls.</li>
      <li>Capable of working on rugged terrains with ease.</li>
    </ul>
  </div>

</div>

{/* Feedback */}

<div className='main-container-FB'>


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



</div>


</div>

 




  );
}
