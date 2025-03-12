import React, { useEffect, useState } from "react";
import "./ContactUS.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Aos from "aos";
import "aos/dist/aos.css";
export default function ContactUS() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);

  const handleToggle1 = () => setIsOpen1(!isOpen1);
  const handleToggle2 = () => setIsOpen2(!isOpen2);
  const handleToggle3 = () => setIsOpen3(!isOpen3);
  const handleToggle4 = () => setIsOpen4(!isOpen4);
  const handleToggle5 = () => setIsOpen5(!isOpen5);

    useEffect(() => {
        Aos.init({
          duration: 600, 
          easing: "ease-out", 
          once: true, 
        });
      }, []);
  return (
    <div className="CU-ALLcontainer" data-aos="zoom-out-down">
      <div className="CU-container">
        <div className="CU-Padding">
        {/* Contact us head */}
        <div className="CU-header">
          <div className="CU-rectangle">
            <div className="CU-rectangle-1">
              <div className="CU-frame">
                <div className="CU-frame-2">
                  <div className="CU-frame-3">
                    <div className="CU-vector" />
                    <span className="CU-contact-us">Liên hệ</span>
                  </div>
                </div>
                <div className="CU-frame-4">
                  <span className="CU-lorem-ipsum">
                  Chúng tôi luôn sẵn sàng hỗ trợ bạn! Nếu bạn có bất kỳ câu hỏi nào về dịch vụ cho thuê thiết bị xây dựng, đừng ngần ngại liên hệ với chúng tôi.
                  </span>
                  <button className="CU-button">
                    <span className="CU-send-message">GỬI TIN NHẮN</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="CU-rectangle-5">
            <div className="CU-frame-6">
              <div className="CU-frame-7">
                <span className="CU-contact-info">Thông tin liên lạc</span>
                <div className="CU-frame-8">
                  <div className="CU-frame-9">
                    <span className="CU-our-office">Văn phòng của chúng tôi</span>
                    <span className="CU-divi-st">
                      1234 Divi St. #1000, San Francisc, CA 93251
                    </span>
                  </div>
                  <div className="CU-frame-a">
                    <span className="CU-open-office-hours">
                      Giờ hoạt động
                    </span>
                    <span className="CU-office-hours">
                      M-F: 9am – 6pm S-S: 10am – 4pm
                    </span>
                  </div>
                  <div className="CU-frame-b">
                    <span className="CU-get-in-touch">LIÊN HỆ</span>
                    <span className="CU-construction-inc">
                      constructioninc.com <br />
                      (346) 426-2351
                    </span>
                  </div>
                </div>
              </div>
              <div className="CU-frame-c">
                <div className="CU-facebook" />
                <div className="CU-twitter" />
                <div className="CU-linkedin" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact us mid */}
      <div className="CU-mid">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="CU-mid-main-container">
                <span className="call">Call: (541) 931-3526</span>
                <span className="make-ideas-reality">
                Chúng tôi không thể chờ đợi để được gặp bạn
                </span>
              </div>
            </div>
            <div className="flex col-6">
              <button className="CU-mid-button">
                <span className="AUE-free-quote">BIỂU MẪU ƯỚC TÍNH TRỰC TUYẾN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
        </div>

      {/* Contact us end */}
      <div className="CU-end">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="CU-end-Titile">
                <div className="CU-new">Liên hệ</div>
                {/* <div className="vector" /> */}
              </div>
              <div className="CU-end-from CU-end-from1">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Message"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="hehed">
                <div className="CU-end-informa">
                  <p className="d-inline-flex gap-1">
                    <a
                      className="CU-end-dropdow"
                      data-bs-toggle="collapse"
                      href="#collapseExample1"
                      role="title"
                      aria-expanded={isOpen1}
                      aria-controls="collapseExample1"
                      onClick={handleToggle1}
                    >
                      Làm thế nào để thuê thiết bị xây dựng trên website?
                    </a>
                  </p>
                  <div
                    className={`collapse ${isOpen1 ? "show" : ""}`}
                    id="collapseExample1"
                  >
                    <div className="card card-body content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sapien, dignissim tristique tellus sed faucibus nullam.
                      Tincidunt mauris ut quam sed mauris proin feugiat.
                    </div>
                  </div>
                </div>

                <div className="CU-end-informa">
                  <p className="d-inline-flex gap-1">
                    <a
                      className="CU-end-dropdow"
                      data-bs-toggle="collapse"
                      href="#collapseExample2"
                      role="title"
                      aria-expanded={isOpen2}
                      aria-controls="collapseExample2"
                      onClick={handleToggle2}
                    >
                      Thời gian thuê thiết bị tối thiểu và tối đa là bao lâu?
                    </a>
                  </p>
                  <div
                    className={`collapse ${isOpen2 ? "show" : ""}`}
                    id="collapseExample2"
                  >
                    <div className="card card-body content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sapien, dignissim tristique tellus sed faucibus nullam.
                      Tincidunt mauris ut quam sed mauris proin feugiat.
                    </div>
                  </div>
                </div>

                <div className="CU-end-informa">
                  <p className="d-inline-flex gap-1">
                    <a
                      className="CU-end-dropdow"
                      data-bs-toggle="collapse"
                      href="#collapseExample3"
                      role="title"
                      aria-expanded={isOpen3}
                      aria-controls="collapseExample3"
                      onClick={handleToggle3}
                    >
                      Giá thuê thiết bị đã bao gồm chi phí vận chuyển chưa?
                    </a>
                  </p>
                  <div
                    className={`collapse ${isOpen3 ? "show" : ""}`}
                    id="collapseExample3"
                  >
                    <div className="card card-body content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sapien, dignissim tristique tellus sed faucibus nullam.
                      Tincidunt mauris ut quam sed mauris proin feugiat.
                    </div>
                  </div>
                </div>

                <div className="CU-end-informa">
                  <p className="d-inline-flex gap-1">
                    <a
                      className="CU-end-dropdow"
                      data-bs-toggle="collapse"
                      href="#collapseExample4"
                      role="title"
                      aria-expanded={isOpen4}
                      aria-controls="collapseExample4"
                      onClick={handleToggle4}
                    >
                     Thiết bị thuê có được bảo trì và kiểm tra trước khi giao không?
                    </a>
                  </p>
                  <div
                    className={`collapse ${isOpen4 ? "show" : ""}`}
                    id="collapseExample4"
                  >
                    <div className="card card-body content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sapien, dignissim tristique tellus sed faucibus nullam.
                      Tincidunt mauris ut quam sed mauris proin feugiat.
                    </div>
                  </div>
                </div>

                <div className="CU-end-informa">
                  <p className="d-inline-flex gap-1">
                    <a
                      className="CU-end-dropdow"
                      data-bs-toggle="collapse"
                      href="#collapseExample5"
                      role="title"
                      aria-expanded={isOpen5}
                      aria-controls="collapseExample5"
                      onClick={handleToggle5}
                    >
                      Tôi có thể hủy hoặc gia hạn hợp đồng thuê thiết bị không?
                    </a>
                  </p>
                  <div
                    className={`collapse ${isOpen5 ? "show" : ""}`}
                    id="collapseExample5"
                  >
                    <div className="card card-body content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sapien, dignissim tristique tellus sed faucibus nullam.
                      Tincidunt mauris ut quam sed mauris proin feugiat.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
