import React from "react";
import { Link } from "react-router-dom"; 
import "../../css/bootstrap.min.css";
// import "../../css/style.css";
// import "./Footer.css";

// Import hình ảnh
import property1 from "../../assets/images/property-1.jpg";
import property2 from "../../assets/images/property-2.jpg";
import property3 from "../../assets/images/property-3.jpg";
import property4 from "../../assets/images/property-4.jpg";
import property5 from "../../assets/images/property-5.jpg";
import property6 from "../../assets/images/property-6.jpg";

const Footer = () => {
    return (
        <>
            {/* Footer Start */}
            <div className="container-fluid bg-dark text-white-50 footer pt-5 ">
                <div className="container py-5">
                    <div className="row g-5">
                        {/* Cột 1: Thông tin liên hệ */}
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Get In Touch</h5>
                            <p className="mb-2">
                                <i className="fa fa-map-marker-alt me-3"></i> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh
                            </p>
                            <p className="mb-2">
                                <i className="fa fa-phone-alt me-3"></i>0925778789
                            </p>
                            <p className="mb-2">
                                <i className="fa fa-envelope me-3"></i>devprojectlabvn@gmail.com
                            </p>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social" href="https://twitter.com">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="btn btn-outline-light btn-social" href="https://facebook.com">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a className="btn btn-outline-light btn-social" href="https://youtube.com">
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a className="btn btn-outline-light btn-social" href="https://linkedin.com">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>

                        {/* Cột 2: Liên kết nhanh */}
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Quick Links</h5>
                            <Link className="btn btn-link text-white-50" to="/about">About Us</Link>
                            <Link className="btn btn-link text-white-50" to="/contact">Contact Us</Link>
                            <Link className="btn btn-link text-white-50" to="/services">Our Services</Link>
                            <Link className="btn btn-link text-white-50" to="/privacy-policy">Privacy Policy</Link>
                            <Link className="btn btn-link text-white-50" to="/terms">Terms & Condition</Link>
                        </div>

                        {/* Cột 3: Photo Gallery */}
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Photo Gallery</h5>
                            <div className="row g-2 pt-2">
                                {[property1, property2, property3, property4, property5, property6].map((image, index) => (
                                    <div className="col-4" key={index}>
                                        <img className="img-fluid rounded bg-light p-1" src={image} alt={`property-${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cột 4: Newsletter */}
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Newsletter</h5>
                            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                            <div className="position-relative mx-auto" style={{ maxWidth: "400px" }}>
                                <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="email" placeholder="Your email" />
                                <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <Link className="border-bottom" to="https://www.facebook.com/profile.php?id=61555812419699">SparkTech Ventures
                                </Link>, All Rights Reserved.
                                <br />
                                Designed By <a className="border-bottom" href="https://www.facebook.com/profile.php?id=61555812419699">SparkTech Ventures Team</a>
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <div className="footer-menu">
                                    <Link to="/">Home</Link>
                                    <Link to="/cookies">Cookies</Link>
                                    <Link to="/help">Help</Link>
                                    <Link to="/faqs">FAQs</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer End */}
        </>
    );
};

export default Footer;