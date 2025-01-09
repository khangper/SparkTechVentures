import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bigstock from '../../assets/images/bigstock.png';
import bookmar from '../../assets/images/Bookmark.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import PriceFilter from '../HomePage/PriceFilter/PriceFilter';
import api from '../../Context/api';

function AllProduct() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get("/product");
        if (response.data.isSuccess) {
          const products = response.data.data.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            imgSrc: item.defaultImage,
            price: item.price,
            category: item.categoryName,
            brand: item.brandName,
          }));
          setItems(products);
        } else {
          console.error("Error: ", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category");
        if (response.data.isSuccess) {
          setCategories(response.data.data);
        } else {
          console.error("Error: ", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch thương hiệu
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.get("/brand");
        if (response.data.isSuccess) {
          setBrands(response.data.data);
        } else {
          console.error("Error: ", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // Lọc sản phẩm
  const searchResults = items.filter((item) => {
    const matchesSearchTerm = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    const matchesBrand = selectedBrand ? item.brand === selectedBrand : true;
    const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
    return matchesSearchTerm && matchesCategory && matchesBrand && matchesPrice;
  });

  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };
  return (
    <div>
      {/* <div className="HH-Link-container">
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
<Link to={`/main?id=${item.id}`}>
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
      </div> */}

      {/* Header hiển thị số lượng kết quả */}
      <div className="HH-Link-container">
        <div className="HH-textcontainer">
          <div className="HH-page">Showing all {searchResults.length} results</div>
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

      {/* Container hiển thị sản phẩm */}
      <div className="container HH-PictureContainerALL">
        <div className="row">
          {/* Danh sách sản phẩm */}
          <div className="col-9 HH-PictureContaner">
            {loading ? (
              <div>Loading...</div>
            ) : searchResults.length === 0 ? (
              <div className="col-9 no-results">
                <p>No results found for your search.</p>
              </div>
            ) : (
              searchResults.map((item) => (
                <div key={item.id} className="HH-Picture">
                  <Link to={`/main?id=${item.id}`}>
                  <img
  className="HH-Picture-small"
  src={item.imgSrc || "http://localhost:5083/images/default-image.jpg"}
  alt={item.name || "Product image"}
/>
                    <div className="HH-P-container">
                      <div className="HH-P-price">
                        <div className="textt">{item.name}</div>
                        <div className="textt">${item.price}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>

          {/* Bộ lọc */}
          <div className="col-3">
            {/* Danh mục */}
            <div className="category">
              <h2>Category</h2>
              <ul className="category-list">
                <li
                  className={`category-item ${
                    selectedCategory === "" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory("")}
                >
                  All Categories
                </li>
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={`category-item ${
                      selectedCategory === category.name ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Thương hiệu */}
            <div className="brand">
              <h2>Brand</h2>
              <ul className="brand-list">
                <li
                  className={`brand-item ${
                    selectedBrand === "" ? "active" : ""
                  }`}
                  onClick={() => setSelectedBrand("")}
                >
                  All Brands
                </li>
                {brands.map((brand) => (
                  <li
                    key={brand.id}
                    className={`brand-item ${
                      selectedBrand === brand.name ? "active" : ""
                    }`}
                    onClick={() => setSelectedBrand(brand.name)}
                  >
                    {brand.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bộ lọc giá */}
            <PriceFilter onPriceChange={handlePriceChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProduct;
