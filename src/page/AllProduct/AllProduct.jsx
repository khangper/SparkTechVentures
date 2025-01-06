import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bigstock from '../../assets/images/bigstock.png';
import bookmar from '../../assets/images/Bookmark.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceFilter from '../HomePage/PriceFilter/PriceFilter';
import api from '../../Context/api';

function AllProduct() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(4); // Giá tối thiểu từ PriceFilter
  const [maxPrice, setMaxPrice] = useState(800); // Giá tối đa từ PriceFilter
  const [items, setItems] = useState([]);
  // const items = [ 
  //   { id: 1, name: 'Caterpillar 320D', price: 200, imgSrc: bigstock, category: 'Heavy Machinery', brand: 'Caterpillar' },
  //   { id: 2, name: 'Leander 320D', price: 500, imgSrc: bigstock, category: 'Heavy Machinery', brand: 'Komatsu' },
  //   { id: 3, name: 'Caterpillar 320D', price: 200, imgSrc: bigstock, category: 'Heavy Machinery', brand: 'Caterpillar' },
  //   { id: 4, name: 'Caterpillar 320D', price: 500, imgSrc: bigstock, category: 'Heavy Machinery', brand: 'Caterpillar' },
  //   { id: 5, name: 'Caterpillar 320D', price: 200, imgSrc: bigstock, category: 'Lifting Equipment', brand: 'Komatsu' },
  //   { id: 6, name: 'Caterpillar 320D', price: 500, imgSrc: bigstock, category: 'Heavy Machinery', brand: 'Caterpillar' },
  //   { id: 7, name: 'Caterpillar 320D', price: 200, imgSrc: bigstock, category: 'Heavy Machinery', brand: 'Caterpillar' },
  //   { id: 8, name: 'Caterpillar 320D', price: 200, imgSrc: bigstock, category: 'Lifting Equipment', brand: 'Komatsu' },
  //   { id: 9, name: 'Caterpillar 320D', price: 500, imgSrc: bigstock, category: 'Lifting Equipment', brand: 'Komatsu' },
  //   { id: 10, name: 'Caterpillar 320D', price: 200, imgSrc: bigstock, category: 'Lifting Equipment', brand: 'Komatsu' },
  // ];

  const searchResults = items.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesBrand = selectedBrand ? item.brand === selectedBrand : true;
    const matchesPrice = item.price >= minPrice && item.price <= maxPrice; // Lọc theo giá
    return matchesSearchTerm && matchesCategory && matchesBrand && matchesPrice;
  });
  const imageMap = {
    bigstock: bigstock,
    // Thêm các hình ảnh khác nếu có
  };
  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };
  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const response = await api.get('/ProductSpark'); // Gọi GET tới baseURL
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally {
        
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="HH-Link-container">
        <div className="HH-textcontainer">
          <div className="HH-page">
            Showing {searchResults.length} results
          </div>
        </div>
        <div className="HH-GG">
          <div className="HH-filter">Sort by popularity</div>
          <div className="HH-search-bar">
            <input
              type="text"
              placeholder="Search..."
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
              <div className="col-9 no-results">
                <p>No results found for your search.</p>
              </div>
            ) : (
              searchResults.map(item => (
                <div key={item.id} className="HH-Picture">
<Link
  to={`/main?name=${encodeURIComponent(item.name)}&price=${item.price}&img=${encodeURIComponent(
    imageMap[item.imgSrc] ? imageMap[item.imgSrc] : item.imgSrc // Ưu tiên ảnh từ imageMap, nếu không có thì dùng trực tiếp item.imgSrc
  )}`}
>
  <img
  className="HH-Picture-small"
  src={
    imageMap[item.imgSrc] // Kiểm tra trong imageMap trước
      ? imageMap[item.imgSrc] // Nếu có, dùng ảnh từ imageMap
      : item.imgSrc // Nếu không có, dùng trực tiếp item.imgSrc
  }
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
    </div>
  );
}

export default AllProduct;
