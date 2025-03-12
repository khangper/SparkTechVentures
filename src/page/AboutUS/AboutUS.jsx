import React, { useEffect } from "react";
import "./AboutUS.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Aos from "aos";
import "aos/dist/aos.css";
export default function AboutUS() {
  useEffect(() => {
      Aos.init({
        duration: 600, 
        easing: "ease-out", 
        once: true, 
      });
    }, []);
  return (
    <div className="Aboutcontainer">
      <div data-aos="zoom-out-down" className="AU-main-container">
        <div className="AU-intro">
          <div className="AU-rectangle" />
          <div className="AU-rectangle-1" />
          <div className="flex">
            <div className="AU-frame">
              <div className="AU-frame-2">
                <div className="AU-vector" />
                <div className="AU-about-our-spark-tech">
                  <span className="AU-about-our">Giới thiệu </span>
                  <span className="AU-tech-ventures">Công ty</span>
                  <span className="AU-about-our-3"> </span>
                  <span className="AU-tech-ventures-4">Tech Ventures</span>
                  <span className="AU-company"> Của chúng tôi</span>
                </div>
              </div>
              <div className="AU-frame-5">
                <span className="AU-construction-equipment">
                Chúng tôi chuyên cung cấp dịch vụ cho thuê thiết bị xây dựng chất lượng cao để hỗ trợ nhu cầu của khách hàng trong ngành xây dựng.
                </span>
                <button className="AU-button">
                  <span className="AU-get-free-quote">NHẬN BÁO GIÁ MIỄN PHÍ</span>
                </button>
              </div>
            </div>

            <div className="Aumain-container">
              <div className="what-we-do">Chúng tôi làm gì</div>

              <div className="AUS-frame-1">
                <div className="AUS-group" />
                <div className="AUS-frame-2">
                  <span className="AUS-building-construction">
                  Cho thuê thiết bị xây dựng
                  </span>
                  <span className="AUS-construction-equipment">
                  Nhiều loại thiết bị xây dựng, phù hợp với các dự án
                  từ nhỏ đến lớn
                  </span>
                </div>
              </div>

              <div className="AUS-frame-3">
                <div className="AUS-group-4" />
                <div className="AUS-frame-5">
                  <span className="AUS-building-repairs">
                  Bảo trì thiết bị
                  </span>
                  <span className="AUS-periodic-maintenance">
                  Bảo trì và sửa chữa định kỳ để đảm bảo thiết bị hoạt động hiệu quả và an toàn.
                  </span>
                </div>
              </div>
              <div className="AUS-frame-6">
                <div className="AUS-group-7" />
                <div className="AUS-frame-8">
                  <span className="AUS-custom-design">Dịch vụ giao hàng:</span>
                  <span className="AUS-text-6">
                  Giao và nhận thiết bị tận nơi, tiết kiệm thời gian và công sức cho khách hàng.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-aos="fade-down" className="Au-mid">
        <div className="new">Về Chúng tôi</div>
        <div className="vector" />
        <div className="container ">
          <div className="row ">
            <div className="AU-test col-6">
            Spark Tech Ventures, chúng tôi tự hào là đơn vị hàng đầu trong lĩnh vực cho thuê thiết bị và máy móc xây dựng. Được thành lập
với sứ mệnh hỗ trợ ngành xây dựng, chúng tôi cung cấp
các giải pháp thiết bị chất lượng cao, đáng tin cậy và phù hợp
với nhu cầu của khách hàng.
              <br />
              <br />
              Chúng tôi cung cấp danh mục thiết bị đa dạng, bao gồm cần cẩu,
con lăn, máy uốn thép, máy dập và máy đầm, tất cả
đều được bảo dưỡng thường xuyên để đảm bảo hiệu suất tối ưu. Với
đội ngũ nhân viên tận tụy và giàu kinh nghiệm, chúng tôi cam kết cung cấp
dịch vụ khách hàng tuyệt vời và tư vấn chuyên nghiệp để giúp bạn
lựa chọn thiết bị phù hợp nhất cho dự án của mình.
            </div>
            <div className="AU-test col-6">
            Chúng tôi cũng hiểu rằng thời gian là tiền bạc, vì vậy dịch vụ giao và nhận thiết bị tại chỗ của chúng tôi giúp bạn tiết kiệm công sức và thời gian trong
quá trình xây dựng. Hơn nữa, dịch vụ bảo trì thường xuyên của chúng tôi đảm bảo rằng thiết bị luôn hoạt động an toàn và
hiệu quả.
              <br />
              <br />
              Spark Tech Ventures, sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi. Chúng tôi
liên tục nỗ lực cải thiện dịch vụ và mang lại giá trị tốt nhất
cho khách hàng. Hãy để chúng tôi đồng hành cùng bạn trong các dự án xây dựng của bạn!
            </div>
          </div>
        </div>
      </div>      
      <div data-aos="fade-right">
      <div className="only-the-best">CHỈ CÓ TỐT NHẤT</div>
      <div className="AU-end">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="AUE-frame-3">
                <div className="AUE-group" />
                <div className="AUE-frame-4">
                  <span className="AUE-eco-friendly-construction">
                  Xây dựng thân thiện với môi trường
                  </span>
                  <span className="AUE-leading-brands-equipment">
                  Chúng tôi cung cấp thiết bị được sản xuất bởi các thương hiệu hàng đầu trong ngành, được kiểm tra kỹ lưỡng và bảo trì thường xuyên để đảm bảo hoạt động hiệu quả và an toàn.
                  </span>
                </div>
              </div>
              <div className="AUE-frame-3">
                <div className="AUE-group" />
                <div className="AUE-frame-4">
                  <span className="AUE-eco-friendly-construction">
                  Đội ngũ chuyên nghiệp
                  </span>
                  <span className="AUE-leading-brands-equipment">
                  Đội ngũ nhân viên của chúng tôi được đào tạo bài bản và có kinh nghiệm trong ngành xây dựng, luôn sẵn sàng hỗ trợ và tư vấn cho bạn lựa chọn thiết bị phù hợp nhất.
                  </span>
                </div>
              </div>
              <div className="AUE-frame-3">
                <div className="AUE-group" />
                <div className="AUE-frame-4">
                  <span className="AUE-eco-friendly-construction">
                  Dịch vụ khách hàng tuyệt vời
                  </span>
                  <span className="AUE-leading-brands-equipment">
                  Chúng tôi cam kết cung cấp trải nghiệm tuyệt vời cho khách hàng với sự hỗ trợ nhanh chóng và tận tâm. Sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="AUE-frame-3">
                <div className="AUE-group" />
                <div className="AUE-frame-4">
                  <span className="AUE-eco-friendly-construction">
                  An toàn là trên hết
                  </span>
                  <span className="AUE-leading-brands-equipment">
                  Chúng tôi coi trọng vấn đề an toàn trong mọi việc chúng tôi làm. Tất cả các thiết bị
đều tuân thủ các tiêu chuẩn ,
mang đến cho bạn sự an tâm khi sử dụng.
                  </span>
                </div>
              </div>
              <div className="AUE-frame-3">
                <div className="AUE-group" />
                <div className="AUE-frame-4">
                  <span className="AUE-eco-friendly-construction">
                  Đổi mới liên tục
                  </span>
                  <span className="AUE-leading-brands-equipment">
                  Chúng tôi liên tục cải thiện dịch vụ và thiết bị của mình để
đáp ứng nhu cầu ngày càng tăng của khách hàng. Chúng tôi luôn
tìm kiếm các giải pháp mới và hiệu quả hơn để phục vụ bạn
tốt nhất.
                  </span>
                </div>
              </div>
              <button className="AUE-button">
                <span className="AUE-free-quote">BÁO GIÁ MIỄN PHÍ</span>
              </button>
            </div>
            <div className="col-4">
              <div className="AUE-Picture1"></div>
              <div className="AUE-Picture2"></div>
            </div>
          </div>
        </div>
      </div>
      </div>

    </div>
  );
}
