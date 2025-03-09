import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomPage.css";
// import bigstock from "../../assets/images/bigstock.png";
import bigstock2 from "../../assets/images/bigstock2.png";
import bigstock3 from "../../assets/images/bigstock3.png";
import bigstock1 from "../../assets/images/bigstock1.png";
// import bookmar from "../../assets/images/Bookmark.png";
import "bootstrap/dist/css/bootstrap.min.css";
import PriceFilter from "./PriceFilter/PriceFilter";
import api from "../../Context/api";
import { useLocation } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const mode = location.state?.mode;
  const productId = location.state?.productId;
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    if (mode === "compare") {
      navigate(`/compare/${productId}`, {
        state: { secondProduct: id, mode: "selected" },
      });
    } else {
      navigate(`/main?id=${id}`);
    }
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
    </div>
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const itemsPerPage = 9;
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

  const displayedItems = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  useEffect(() => {
    Aos.init({
      duration: 600,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Hero Carousel */}
          {/* <div className="relative">
            <div
              id="LD-carouselExampleCaptions"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="2000"
            >
              <div className="carousel-indicators absolute bottom-4 flex justify-center w-full gap-2">
                <button
                  type="button"
                  data-bs-target="#LD-carouselExampleCaptions"
                  data-bs-slide-to="0"
                  className="active h-2 w-8 bg-white rounded-full"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#LD-carouselExampleCaptions"
                  data-bs-slide-to="1"
                  className="h-2 w-8 bg-white rounded-full"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#LD-carouselExampleCaptions"
                  data-bs-slide-to="2"
                  className="h-2 w-8 bg-white rounded-full"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner h-[600px]">
                <div className="carousel-item active h-full">
                  <img
                    src="https://png.pngtree.com/background/20250126/original/pngtree-construction-engineer-supervising-work-at-construction-site-picture-image_15536206.jpg"
                    className="d-block w-full h-full object-cover"
                    alt="Construction Site"
                  />
                  <div className="carousel-caption text-left absolute top-1/2 left-16 transform -translate-y-1/2 max-w-xl">
                    <h5 className="text-4xl font-bold mb-4 text-white">
                      BUILD WITHOUT LIMITS – RENT NOW
                    </h5>
                    <p className="text-lg mb-6 text-gray-100">
                      Looking for top-notch construction gear without breaking
                      the bank? We've got you covered! Choose your equipment,
                      rent it, and start building like a pro.
                    </p>
                    <a
                      href="/login"
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-md transition-all"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
                <div className="carousel-item h-full">
                  <img
                    src="https://i.pinimg.com/736x/08/08/dc/0808dc1653185fa9b5862ab8ff914406.jpg"
                    className="d-block w-full h-full object-cover"
                    alt="Construction Equipment"
                  />
                  <div className="carousel-caption text-left absolute top-1/2 left-16 transform -translate-y-1/2 max-w-xl">
                    <h5 className="text-4xl font-bold mb-4 text-white">
                      BUDGET-FRIENDLY VIBES, EPIC PROJECTS
                    </h5>
                    <p className="text-lg mb-6 text-gray-100">
                      Who says quality has to be expensive? Save cash, boost
                      productivity, and keep your project on point with our
                      seamless rental process.
                    </p>
                    <a
                      href="/login"
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-md transition-all"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
                <div className="carousel-item h-full">
                  <img
                    src="https://i.pinimg.com/736x/7a/1c/c4/7a1cc44e8356752747500a5271cd4325.jpg"
                    className="d-block w-full h-full object-cover"
                    alt="Construction Project"
                  />
                  <div className="carousel-caption text-left absolute top-1/2 left-16 transform -translate-y-1/2 max-w-xl">
                    <h5 className="text-4xl font-bold mb-4 text-white">
                      BUILD BIG, RENT SMART
                    </h5>
                    <p className="text-lg mb-6 text-gray-100">
                      Step up your game with our state-of-the-art equipment
                      designed for modern projects. Get ready to upgrade your
                      construction experience.
                    </p>
                    <a
                      href="/login"
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-md transition-all"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev absolute top-1/2 left-4 transform -translate-y-1/2"
                type="button"
                data-bs-target="#LD-carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon bg-black/30 rounded-full p-4"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next absolute top-1/2 right-4 transform -translate-y-1/2"
                type="button"
                data-bs-target="#LD-carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon bg-black/30 rounded-full p-4"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div> */}

          {/* Product listing */}
          <div
            data-aos="zoom-out-down"
            className="container mx-auto px-4 py-12 max-w-7xl"
          >
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <div className="text-sm text-gray-600">
                Hiển thị {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, searchResults.length)} of{" "}
                {searchResults.length} kết quả
              </div>
              <div className="flex items-center gap-4">
                {/* <div className="hidden md:block text-gray-600">
                  Sort by popularity
                </div> */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Loại
                  </h2>
                  <ul className="space-y-2">
                    <li
                      className={`cursor-pointer py-1 ${
                        selectedCategory === ""
                          ? "text-yellow-600 font-medium"
                          : "text-gray-600 hover:text-yellow-600"
                      }`}
                      onClick={() => setSelectedCategory("")}
                    >
                     Tất cả loại
                    </li>
                    {categories.map((category) => (
                      <li
                        key={category.id}
                        className={`cursor-pointer py-1 ${
                          selectedCategory === category.name
                            ? "text-yellow-600 font-medium"
                            : "text-gray-600 hover:text-yellow-600"
                        }`}
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Thương hiệu
                  </h2>
                  <ul className="space-y-2">
                    <li
                      className={`cursor-pointer py-1 ${
                        selectedBrand === ""
                          ? "text-yellow-600 font-medium"
                          : "text-gray-600 hover:text-yellow-600"
                      }`}
                      onClick={() => setSelectedBrand("")}
                    >
                        Tất cả thương hiệu
                    </li>
                    {brands.map((brand) => (
                      <li
                        key={brand.id}
                        className={`cursor-pointer py-1 ${
                          selectedBrand === brand.name
                            ? "text-yellow-600 font-medium"
                            : "text-gray-600 hover:text-yellow-600"
                        }`}
                        onClick={() => setSelectedBrand(brand.name)}
                      >
                        {brand.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <PriceFilter onPriceChange={handlePriceChange} />
                </div>
              </div>

              {/* Product Grid */}
              <div className="md:w-3/4">
                {loading ? (
                  <div className="flex justify-center p-12">
                    <LoadingSpinner />
                  </div>
                ) : displayedItems.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <p className="text-gray-600">
                      No results found for your search.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleProductClick(item.id)}
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={
                              item.imgSrc ||
                              "http://localhost:5083/images/default-image.jpg"
                            }
                            alt={item.name || "Product image"}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-lg mb-2 text-gray-800 line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-yellow-600 font-bold">
                            {item.price.toLocaleString("vi-VN")} VND/ngày
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="mt-12 flex flex-col  sm:flex-row justify-center items-center">
                  <nav className="mb-4 sm:mb-0" aria-label="Pagination">
                    <ul className="flex items-center">
                      <li>
                        <button
                          className={`px-3 py-1 rounded-md mr-2 ${
                            currentPage === 1
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          &laquo;
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i + 1}>
                          <button
                            className={`px-3 py-1 rounded-md mx-1 ${
                              currentPage === i + 1
                                ? "bg-yellow-500 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button
                          className={`px-3 py-1 rounded-md ml-2 ${
                            currentPage === totalPages
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </nav>
                  {/* <Link
                    to="/all-product"
                    className="text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    View all products &rarr;
                  </Link> */}
                </div>
              </div>
            </div>
          </div>

          {/* News Section */}
          <div className="bg-gray-100 py-16" data-aos="zoom-out-right">
            <div className="container mx-auto px-4 max-w-7xl">
              <h2 className="text-3xl font-bold text-center mb-2">News</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto mb-12"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img
                    src={bigstock2}
                    className="w-full h-48 object-cover"
                    alt="Máy Uốn Sắt Thủy Lực Cầm Tay"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3">
                      Cung Cấp Máy Uốn Sắt Thủy Lực Cầm Tay
                    </h3>
                    <p className="text-gray-600 mb-6 min-h-20">
                      Quá trình nắn thẳng và sửa chữa các thanh sắt, thép đã
                      được lắp đặt trên sàn bê tông, cột chịu lực...
                    </p>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded transition-colors">
                      TÌM HIỂU THÊM
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img
                    src={bigstock1}
                    className="w-full h-48 object-cover"
                    alt="Thang Máy Chở Hàng"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3">
                      Thang Máy Chở Hàng Tải Trọng 1000kg
                    </h3>
                    <p className="text-gray-600 mb-6 min-h-20">

                      Có một điểm chung dễ nhận thấy ở các tòa nhà cao tầng:
                      việc nâng và hạ khối lượng lớn vật liệu.
                    </p>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded transition-colors">
                      TÌM HIỂU THÊM
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <img
                    src={bigstock3}
                    className="w-full h-48 object-cover"
                    alt="Máy Uốn & Cắt Sắt D25 Hàn Quốc"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3">
                      Cung Cấp Máy Uốn & Cắt Sắt D25 Hàn Quốc Đã Qua Sử Dụng
                    </h3>
                    <p className="text-gray-600 mb-6 min-h-20">

                      Các công trình xây dựng vừa và nhỏ nói chung, cũng như
                      công trình dân dụng nói riêng, thường có những đặc điểm
                      sau:
                    </p>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-6 rounded transition-colors">
                      TÌM HIỂU THÊM
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center mt-10">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-8 rounded-md transition-colors">
                 Xem tất cả
                </button>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="flex flex-col lg:flex-row" data-aos="zoom-out-left">
            <div className="lg:w-1/2 bg-black p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                We're Been Building For Over 10 Years
              </h2>
              <div className="w-24 h-1 bg-yellow-500 mb-8"></div>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis aperiam nisi mollitia odit nam reiciendis molestiae
                reprehenderit est, optio modi ad necessitatibus perspiciatis
                similique sint cumque eveniet, omnis accusantium pariatur. Lorem
                ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div>
                <a
                  href="/about"
                  className="border-2 border-yellow-500 text-white hover:bg-yellow-500 hover:text-black py-3 px-8 inline-block font-medium transition-all"
                >
                  ABOUT US
                </a>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="h-[400px] lg:h-auto">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/KIeHd_OdX1I?si=RkNU9GGCZBJNVvzQ"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="bg-yellow-500 py-6 px-8 flex-1">
                  <div className="space-y-2">
                    <p className="font-bold text-lg">Call for a quote</p>
                    <p className="font-bold text-2xl">(346) 234-6973</p>
                  </div>
                </div>
                <div className="bg-gray-200 py-6 px-8 flex items-center justify-center flex-1">
                  <a
                    href="/quote"
                    className="border-2 border-black hover:bg-black hover:text-white px-4 py-3 font-medium transition-colors"
                  >
                    ONLINE ESTIMATE FORM
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Feedback */}
          <div
            className="bg-gray-100 py-16"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <div className="container mx-auto px-4 max-w-7xl">
              <h2 className="text-3xl font-bold text-center mb-2">
                Customer Feedback
              </h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto mb-12"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-8">
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6">
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sapien, dignissim tristique tellus sed faucibus nullam."
                    </p>
                    <p className="font-bold text-gray-800">John Smith</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
