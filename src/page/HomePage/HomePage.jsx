import React, { useState } from 'react';
import { Link, Links } from 'react-router-dom'; 
import './HomPage.css';
import bigstock from '../../assets/images/bigstock.png'
import bigstock2 from '../../assets/images/bigstock2.png'
import bigstock3 from '../../assets/images/bigstock3.png'
import bigstock1 from '../../assets/images/bigstock1.png'
import bookmar from '../../assets/images/Bookmark.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceFilter from './PriceFilter/PriceFilter';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(4); // Giá tối thiểu từ PriceFilter
  const [maxPrice, setMaxPrice] = useState(800); // Giá tối đa từ PriceFilter
  const items = [ 
    { id: 1, name: 'Caterpillar 320D', price: 200, imgSrc: bigstock,category: 'Heavy Machinery', brand: 'Caterpillar' }, 
    { id: 2, name: 'Leander 320D', price: 500, imgSrc: bigstock, category: 'Heavy Machinery', brand: 'Komatsu' }, 
    { id: 3, name: 'Caterpillar 320D', price: 200, imgSrc: bigstock,category: 'Heavy Machinery', brand: 'Caterpillar' },
    { id: 4, name: 'Caterpillar 320D', price: 500, imgSrc: bigstock,category: 'Heavy Machinery', brand: 'Caterpillar' },
    { id: 5, name: 'Caterpillar 320D', price: 200, imgSrc: bigstock, category: 'Lifting Equipment', brand: 'Komatsu' }, 
    { id: 6, name: 'Caterpillar 320D', price:500, imgSrc: bigstock,category: 'Heavy Machinery', brand: 'Caterpillar' }, 
    { id: 7, name: 'Caterpillar 320D', price: 200, imgSrc: bigstock,category: 'Heavy Machinery', brand: 'Caterpillar' }, 
    { id: 8, name: 'Caterpillar 320D', price: 200, imgSrc: bigstock, category: 'Lifting Equipment', brand: 'Komatsu' }, 
    { id: 9, name: 'Caterpillar 320D', price: 500, imgSrc: bigstock, category: 'Lifting Equipment', brand: 'Komatsu' }, 
    { id: 10, name: 'Caterpillar 320D', price: 200, imgSrc: bigstock, category: 'Lifting Equipment', brand: 'Komatsu' }, 

  ];

  const itemsPerPage = 9;
  const searchResults = items.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesBrand = selectedBrand ? item.brand === selectedBrand : true;
    const matchesPrice = item.price >= minPrice && item.price <= maxPrice; // Lọc theo giá
    return matchesSearchTerm && matchesCategory && matchesBrand && matchesPrice;
  });
  
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const displayedItems = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  return (

<div className='Home-container'>
  {/* List product */}

       <div className='HH-Link-container'>
        <div className='HH-textcontainer'>
          <div className='HH-page'>
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, searchResults.length)} of {searchResults.length} results
          </div>
        </div>
        <div className='HH-GG'>
          <div className='HH-filter'>Sort by popularity</div>
          <div className='HH-search-bar'>
            <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="container HH-PictureContainerALL">
        <div className="row">
              <div className="col-9 HH-PictureContaner">
      {searchResults.length === 0 ? (
        // Hiển thị thông báo nếu không có kết quả
        <div className="col-9 no-results">
          <p>No results found for your search.</p>
        </div>
      ) : (
        // Hiển thị danh sách sản phẩm nếu có kết quả
        displayedItems.map(item => (
          <div key={item.id} className="HH-Picture">
            <Link to={`/main?name=${item.name}&price=${item.price}&img=${item.imgSrc}`}>
              <img
                className="HH-Picture-small"
                src={item.imgSrc}
                alt={`Excavator view ${item.id}`}
              />
              <div className="HH-P-container">
                <div className="HH-P-price">
                  <div className="textt">{item.name}</div>
                  <div className="textt">${item.price}/day</div>
                </div>
                <img
                  className="Bookmar"
                  src={bookmar}
                  alt={`Excavator view ${item.id}`}
                />
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
          <div className="col-3">
          <div className="category">
  <h2>Category</h2>
  <ul className="category-list">
  <li
    className={`category-item ${selectedCategory === '' ? 'active' : ''}`}
    onClick={() => setSelectedCategory('')}
  >
    All Categories
  </li>
  <li
    className={`category-item ${selectedCategory === 'Heavy Machinery' ? 'active' : ''}`}
    onClick={() => setSelectedCategory('Heavy Machinery')}
  >
    Heavy Machinery
  </li>
  <li
    className={`category-item ${selectedCategory === 'Lifting Equipment' ? 'active' : ''}`}
    onClick={() => setSelectedCategory('Lifting Equipment')}
  >
    Lifting Equipment
  </li>
  <li
    className={`category-item ${selectedCategory === 'Road Construction Equipment' ? 'active' : ''}`}
    onClick={() => setSelectedCategory('Road Construction Equipment')}
  >
    Road Construction Equipment
  </li>
  <li
    className={`category-item ${selectedCategory === 'Specialized Construction Vehicles' ? 'active' : ''}`}
    onClick={() => setSelectedCategory('Specialized Construction Vehicles')}
  >
    Specialized Construction Vehicles
  </li>
</ul>

</div>
<div className="brand">
  <h2>Brand</h2>
  <ul className="brand-list">
  <li
    className={`brand-item ${selectedBrand === '' ? 'active' : ''}`}
    onClick={() => setSelectedBrand('')}
  >
    All Brands
  </li>
  <li
    className={`brand-item ${selectedBrand === 'Caterpillar' ? 'active' : ''}`}
    onClick={() => setSelectedBrand('Caterpillar')}
  >
    Caterpillar
  </li>
  <li
    className={`brand-item ${selectedBrand === 'Komatsu' ? 'active' : ''}`}
    onClick={() => setSelectedBrand('Komatsu')}
  >
    Komatsu
  </li>
  <li
    className={`brand-item ${selectedBrand === 'Liebherr' ? 'active' : ''}`}
    onClick={() => setSelectedBrand('Liebherr')}
  >
    Liebherr
  </li>
  <li
    className={`brand-item ${selectedBrand === 'Hitachi' ? 'active' : ''}`}
    onClick={() => setSelectedBrand('Hitachi')}
  >
    Hitachi
  </li>
</ul>

</div>

<PriceFilter onPriceChange={handlePriceChange} />

          </div>
        </div>
      </div>
      <div className='container PageList'>
        <div className='row justify-content-center'>
          <div className='col-8 justify-content-center kkk'>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <Link to="/AllProduct" className='col-4 ml-80px'>View all</Link>
        </div>
      </div>


{/* New */}

<div className='HH_new'>
<div className='new'>News</div>
<div className="vector" />

<div className='latest-project'>
<div className='card New1' >
<img src={bigstock2} className="card-img-top" alt="..."/>
  <div className="card-body">
  <span className="handheld-hydraulic-iron">
                Providing Handheld Hydraulic
                <br /> Iron Bending Machine
              </span>
              <span className="straightening-repairing-iron">
                The process of straightening and repairing iron and steel bars
                that have been installed  on concrete
                floors, fire columns...{" "}
              </span>
              <button className="frame">
                <span className="learn-more">LEARN MORE</span>
              </button>
  </div>
</div>
<div className='card New1' >
<img src={bigstock1} className="card-img-top" alt="..."/>
  <div className="card-body">
  <span className="handheld-hydraulic-iron">
  1000kg Load Capacity <br />
  Cargo Elevator
              </span>
              <span className="straightening-repairing-iron">
              There is one thing in common that we can easily see in high-rise
              buildings: lifting and lowering large volumes of materials.
              </span>
              <button className="frame">
                <span className="learn-more">LEARN MORE</span>
              </button>
  </div>
</div>
<div className='card New1' >
<img src={bigstock3} className="card-img-top" alt="..."/>
  <div className="card-body">
  <span className="handheld-hydraulic-iron">
  Supply Used Korean D25 Steel
  <br /> Bending and Cutting Machine
              </span>
              <span className="straightening-repairing-iron">
              Medium and small construction works in general and civil works
              in particular often have the following characteristics:
              </span>
              <button className="frame">
                <span className="learn-more">LEARN MORE</span>
              </button>
  </div>
</div>
</div>
<div className='New-viewall'>
<button className="news-button">
          <span className="news-free-quote">VIEW ALL</span>
        </button>
</div>

</div>


{/* Intro */}
<div className='Intro'>
<div className="Intro-rectangle-1">
  <div className='mt-8px'>
  <span className="Intro-building-years">
          We’ve Been Building For Over 10 Years
        </span>
  </div>
        <div className="Intro-vector" />
        <div className="Intro-frame">
          <span className="Intro-lorem-ipsum">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien,
            dignissim tristique tellus sed faucibus nullam. Tincidunt mauris ut
            quam sed mauris proin feugiat. Scelerisque lorem posuere iaculis
            nunc amet phasellus.
          </span>
          <button className="Intro-button">
            <span className="Intro-free-quote">ABOUT US</span>
          </button>
        </div>
      </div>
<div className='intro-flex-colum'>
<div className="Intro-rectangle-2">

        
      </div>

      <div className='container'>
        <div className='row'>
<div className='Intro-spann col-6'>
<span className="Intro-call-for-quote">Call for a Quote</span>
  <span className="Intro-phone-number">(346) 234-6973</span>
</div>
<div className="Intro-rectangle-3 col-6">
        <button className="Intro-button-4">
          <span className="Intro-free-quote-5">ONLINE ESTIMATE FORM</span>
        </button>
      </div>
        </div>
  
  </div>

</div>

</div>


{/* Customer Feedback */}
<div className='HH_new HH-CT'>
<div className='new'>Customer Feedback</div>
<div className="vector" />

<div className='latest-project'>
<div className='card New1' >

  <div className="card-body">
  <div className="CT-frame-1">
              <div className="CT-star" />
              <div className="CT-star-2" />
              <div className="CT-star-3" />
              <div className="CT-star-4" />
              <div className="CT-star-5" />
            </div>
              <span className="straightening-repairing-iron">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sapien, dignissim tristique tellus sed faucibus nullam.”
              </span>
              <span className="john-smith">John Smith</span>
              
  </div>
</div>
<div className='card New1' >

  <div className="card-body">
  <div className="CT-frame-1">
              <div className="CT-star" />
              <div className="CT-star-2" />
              <div className="CT-star-3" />
              <div className="CT-star-4" />
              <div className="CT-star-5" />
            </div>
              <span className="straightening-repairing-iron">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sapien, dignissim tristique tellus sed faucibus nullam.”
              </span>
              <span className="john-smith">John Smith</span>
             
  </div>
</div>
<div className='card New1' >

  <div className="card-body">
  <div className="CT-frame-1">
              <div className="CT-star" />
              <div className="CT-star-2" />
              <div className="CT-star-3" />
              <div className="CT-star-4" />
              <div className="CT-star-5" />
            </div>
              <span className="straightening-repairing-iron">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sapien, dignissim tristique tellus sed faucibus nullam.”
              </span>
              <span className="john-smith">John Smith</span>
  </div>
</div>
</div>


</div>
</div>
  );
}
