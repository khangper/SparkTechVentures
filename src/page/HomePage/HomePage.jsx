import React, { useEffect, useState } from "react";
import { Link, Links, Navigate, useNavigate } from "react-router-dom";
import "./HomPage.css";
import bigstock from "../../assets/images/bigstock.png";
import bigstock2 from "../../assets/images/bigstock2.png";
import bigstock3 from "../../assets/images/bigstock3.png";
import bigstock1 from "../../assets/images/bigstock1.png";
import bookmar from "../../assets/images/Bookmark.png";
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
  // console.log(location);

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
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );

  // Thêm hàm handlePageChange ở đây
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Ví dụ: Scroll to top mỗi lần chuyển trang
    // window.scrollTo(0, 0);
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

  // Fetch Categories
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

  // Fetch Brands
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
        <div className="Home-container">
          <div className="LD-container">
            <div
              id="LD-carouselExampleCaptions"
              className="carousel slide LD-carousel"
              data-bs-ride="carousel"
              data-bs-interval="2000"
            >
              <div className="carousel-indicators LD-carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#LD-carouselExampleCaptions"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#LD-carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#LD-carouselExampleCaptions"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner LD-carousel-inner">
                <div className="carousel-item active LD-carousel-item">
                  <img
                    src="https://png.pngtree.com/background/20250126/original/pngtree-construction-engineer-supervising-work-at-construction-site-picture-image_15536206.jpg"
                    className="d-block w-100"
                    alt="Slide 1"
                  />
                  <div className="carousel-caption d-none d-md-block LD-carousel-caption">
                    <div className="LD-title">
                      <h5>BUILD WITHOUT LIMITS – RENT NOW</h5>
                      <p>
                        Looking for top-notch construction gear without breaking
                        the bank? We've got you covered! Choose your equipment,
                        rent it, and start building like a pro. Our friendly
                        crew is here to help you turn your project dreams into
                        reality—fast, easy, and hassle-free.
                      </p>
                      <a href="/login" className="btn-get-started">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
                <div className="carousel-item LD-carousel-item">
                  <img
                    src="https://i.pinimg.com/736x/08/08/dc/0808dc1653185fa9b5862ab8ff914406.jpg"
                    className="d-block w-100"
                    alt="Slide 2"
                  />
                  <div className="carousel-caption d-none d-md-block LD-carousel-caption">
                    <div className="LD-title">
                      <h5>BUDGET-FRIENDLY VIBES, EPIC PROJECTS</h5>
                      <p>
                        Who says quality has to be expensive? With our
                        competitive prices and hot deals, you can secure the
                        best construction equipment without emptying your
                        wallet. Save cash, boost productivity, and keep your
                        project on point with our seamless rental process.
                      </p>
                      <a href="/login" className="btn-get-started">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
                <div className="carousel-item LD-carousel-item">
                  <img
                    src="https://i.pinimg.com/736x/7a/1c/c4/7a1cc44e8356752747500a5271cd4325.jpg"
                    className="d-block w-100"
                    alt="Slide 3"
                  />
                  <div className="carousel-caption d-none d-md-block LD-carousel-caption">
                    <div className="LD-title">
                      <h5>BUILD BIG, RENT SMART</h5>
                      <p>
                        Step up your game with our state-of-the-art equipment
                        designed for modern projects. Embrace smart tech and
                        flexible rental options that make your job easier and
                        more efficient. Get ready to upgrade your construction
                        experience
                      </p>
                      <a href="/login" className="btn-get-started">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev LD-carousel-control-prev"
                type="button"
                data-bs-target="#LD-carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next LD-carousel-control-next"
                type="button"
                data-bs-target="#LD-carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* List product */}
          <div data-aos="zoom-out-down">
            <div className="HH-Link-container">
              <div className="HH-textcontainer">
                <div className="HH-page">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, searchResults.length)}{" "}
                  of {searchResults.length} results
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
                  {loading ? (
                    <div>Loading...</div>
                  ) : displayedItems.length === 0 ? (
                    <div className="col-9 no-results">
                      <p>No results found for your search.</p>
                    </div>
                  ) : (
                    displayedItems.map((item) => (
                      <div
                        key={item.id}
                        className="HH-Picture"
                        onClick={() => handleProductClick(item.id)}
                      >
                        <img
                          className="HH-Picture-small"
                          src={
                            item.imgSrc ||
                            "http://localhost:5083/images/default-image.jpg"
                          }
                          alt={item.name || "Product image"}
                        />

                        <div className="HH-P-container">
                          <div className="HH-P-price">
                            <div className="textt"> {item.name}</div>
                            <div className="textt">

                              Price {item.price.toLocaleString("vi-VN")} VND/day
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="col-3">
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
                  <PriceFilter onPriceChange={handlePriceChange} />
                </div>
              </div>
            </div>
            <div className="container PageList">
              <div className="row justify-content-center">
                <div className="col-8 justify-content-center kkk">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <button
                          className="page-link"
                          aria-label="Previous"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <span aria-hidden="true" className="ffff">&laquo;</span>
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li
                          key={i + 1}
                          className={`page-item ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link ffff"
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className="page-item">
                        <button
                          className="page-link"
                          aria-label="Next"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <span aria-hidden="true" className="ffff">&raquo;</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
                <Link to="/all-product" className="HomePage-text5 col-4 ml-80px ">
                  View all
                </Link>
              </div>
            </div>
          </div>
          {/* New */}

          <div className="HH_new" data-aos="zoom-out-right">
            <div className="new">News</div>
            <div className="vector" />

            <div className="latest-project">
              <div className="card New1">
                <img src={bigstock2} className="card-img-top" alt="..." />
                <div className="card-body">
                  <span className="handheld-hydraulic-iron">
                    Providing Handheld Hydraulic
                    <br /> Iron Bending Machine
                  </span>
                  <span className="straightening-repairing-iron">
                    The process of straightening and repairing iron and steel
                    bars that have been installed on concrete floors, fire
                    columns...{" "}
                  </span>
                  <button className="frame">
                    <span className="learn-more">LEARN MORE</span>
                  </button>
                </div>
              </div>
              <div className="card New1">
                <img src={bigstock1} className="card-img-top" alt="..." />
                <div className="card-body">
                  <span className="handheld-hydraulic-iron">
                    1000kg Load Capacity <br />
                    Cargo Elevator
                  </span>
                  <span className="straightening-repairing-iron">
                    There is one thing in common that we can easily see in
                    high-rise buildings: lifting and lowering large volumes of
                    materials.
                  </span>
                  <button className="frame">
                    <span className="learn-more">LEARN MORE</span>
                  </button>
                </div>
              </div>
              <div className="card New1">
                <img src={bigstock3} className="card-img-top" alt="..." />
                <div className="card-body">
                  <span className="handheld-hydraulic-iron">
                    Supply Used Korean D25 Steel
                    <br /> Bending and Cutting Machine
                  </span>
                  <span className="straightening-repairing-iron">
                    Medium and small construction works in general and civil
                    works in particular often have the following
                    characteristics:
                  </span>
                  <button className="frame">
                    <span className="learn-more">LEARN MORE</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="New-viewall">
              <button className="news-button">
                <span className="news-free-quote">VIEW ALL</span>
              </button>
            </div>
          </div>

          {/* Intro */}

          <div className="flex" data-aos="zoom-out-left">
            <div className="flex flex-col items-start bg-black space-y-16 p-3 ">
              <h1 className="text-white">
                We're Been Building For Over 10 Years
              </h1>
              <div className=" w-[100px] border-t-4 border-yellow-500"></div>
              <div className="text-white">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis aperiam nisi mollitia odit nam reiciendis molestiae
                reprehenderit est, optio modi ad necessitatibus perspiciatis
                similique sint cumque eveniet, omnis accusantium pariatur. Lorem
                ipsum, dolor sit amet consectetur adipisicing elit. Porro
                eveniet iusto in fuga adipisci quo rerum totam facere nam?
                Doloribus eaque eos facere ducimus illo, sapiente tenetur fuga
                ullam assumenda! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. A facere quidem ab consequuntur maiores,
                officiis at quisquam atque numquam voluptatibus culpa beatae
                aliquam amet odit quas dolore rem, quo praesentium!
              </div>
              <div className="border-2 border-yellow-500 px-8 py-2 text-white cursor-pointer">
                About us
              </div>
            </div>
            <div className="flex flex-col">
              <iframe
                width="1000"
                height="563"
                src="https://www.youtube.com/embed/KIeHd_OdX1I?si=RkNU9GGCZBJNVvzQ"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                // referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>
              <div className="flex">
                <div className="bg-yellow-500 p-1 w-[500px] flex items-center">
                  <div className="space-y-4 pl-4">
                    <div className="font-bold text-xl">Call for a quotes</div>
                    <div className="font-bold text-xl">(346) 234-6973</div>
                  </div>
                </div>
                <div className="bg-slate-300 p-5 w-[500px] flex justify-center">
                  <div className="border-4 border-black text-center p-2 w-48 font-medium">
                    Online Estimate Form
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Feedback */}

          <div
            className="HH_new HH-CT"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <div className="new">Customer Feedback</div>
            <div className="vector" />

            <div className="latest-project">
              <div className="card New1">
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
              <div className="card New1">
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
              <div className="card New1">
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
      )}
    </>
  );
}
// import React, { useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import headerImage1 from "../../assets/images/headerimage.jpg";
// import headerImage2 from "../../assets/images/headerimage2.jpg";
// import headerImage3 from "../../assets/images/headerimage3.jpg";
// import { ChevronRight, ChevronLeft } from "lucide-react";

// export default function HomePage() {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   return (
//     <div>
//       {/* Header image */}
//       <div className="grid grid-cols-2 ">
//         <div className="bg-gray-200 mx-auto flex justify-center items-center p-20">
//           <div>
//             <h1 className="font-extrabold text-3xl">
//               Tìm Kiếm{" "}
//               <span className="text-yellow-500">Thiết Bị Hoàn Hảo</span> Cho Dự
//               Án Của Bạn
//             </h1>

//             <p>
//               Khám phá nền tảng cho thuê thiết bị xây dựng đáng tin cậy, giúp
//               bạn tiếp cận nhanh chóng với các loại máy móc, công cụ chất lượng
//               cao.
//             </p>

//             <button className="bg-yellow-500 py-3 px-5 text-white font-bold rounded hover:bg-yellow-600">
//               Khám phá
//             </button>
//           </div>
//         </div>
//         <div className="relative w-full">
//           {/* <button
//             ref={prevRef}
//             className="absolute  left-0 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-all"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             ref={nextRef}
//             className="absolute right-[935px] top-60 z-10 md:right-[735px] transform -translate-y-1/2 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-all"
//           >
//             <ChevronRight size={20} />
//           </button> */}

//           <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
//             <button
//               ref={prevRef}
//               className="bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-all"
//             >
//               <ChevronLeft size={15} />
//             </button>
//             <button
//               ref={nextRef}
//               className="bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-all"
//             >
//               <ChevronRight size={15} />
//             </button>
//           </div>

//           <Swiper
//             modules={[Navigation, Pagination, Autoplay]}
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 3000 }}
//             loop={true}
//             navigation={{
//               prevEl: prevRef.current,
//               nextEl: nextRef.current,
//             }}
//             className="w-full h-full"
//             onSwiper={(swiper) => {
//               setTimeout(() => {
//                 if (prevRef.current && nextRef.current) {
//                   swiper.params.navigation.prevEl = prevRef.current;
//                   swiper.params.navigation.nextEl = nextRef.current;
//                   swiper.navigation.init();
//                   swiper.navigation.update();
//                 }
//               });
//             }}
//           >
//             <SwiperSlide>
//               <img
//                 src={headerImage1}
//                 alt="Construction Equipment 1"
//                 className="w-full h-full object-cover"
//               />
//             </SwiperSlide>
//             <SwiperSlide>
//               <img
//                 src={headerImage2}
//                 alt="Construction Equipment 2"
//                 className="w-full h-full object-cover"
//               />
//             </SwiperSlide>
//             <SwiperSlide>
//               <img
//                 src={headerImage3}
//                 alt="Construction Equipment 3"
//                 className="w-full h-full object-cover"
//               />
//             </SwiperSlide>
//           </Swiper>
//         </div>

//         <style>
//           {`
//           .swiper-pagination-bullet {
//             background-color: white !important; /* Chỉnh màu trắng */
//             opacity: 0.6;
//             transition: opacity 0.3s ease-in-out;
//           }

//           .swiper-pagination-bullet-active {
//             background-color: white !important; /* Màu trắng cho dot active */
//             opacity: 1;
//           }
//         `}
//         </style>
//       </div>

//       <div className="grid grid-cols-3">
//         <div className="flex flex-col justify-center items-start p-20 bg-[#2a2a2a] col-span-1 space-y-14">
//           <h1 className="font-extrabold text-xl text-white">
//             Thuê thiết bị xây dựng nhanh, tiện, giá tốt!
//           </h1>

//           <div className=" w-[100px] border-t-4 border-yellow-500"></div>

//           <p className="text-white ">
//             Chúng tôi cung cấp máy móc, công cụ xây dựng chất lượng cao, giúp
//             bạn dễ dàng thuê với giá minh bạch, thủ tục nhanh chóng. Hỗ trợ giao
//             nhận tận nơi và dịch vụ khách hàng 24/7, đảm bảo tiến độ công trình
//             của bạn luôn suôn sẻ!
//           </p>
//           <div className="border-3 border-yellow-500 text-yellow-500 px-8 py-2  cursor-pointer">
//             Về chúng tôi
//           </div>
//         </div>

//         <div className="col-span-2">
//           <iframe
//             className="w-full h-full"
//             src="https://www.youtube.com/embed/KIeHd_OdX1I?si=FAx_Salo6ktZ0MSi"
//             title="YouTube video player"
//             frameborder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             referrerpolicy="strict-origin-when-cross-origin"
//             allowfullscreen
//           ></iframe>

//           <div className="flex">
//             <div>
//               <p>Gọi cho chúng tôi</p>
//               <span></span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
