import React, { useEffect } from 'react'
import bigstock2 from '../../assets/images/bigstock2.png'
import bigstock3 from '../../assets/images/bigstock3.png'
import bigstock1 from '../../assets/images/bigstock1.png'
import "./Blog.css"
import Aos from "aos";
import "aos/dist/aos.css";
function Blog() {
      useEffect(() => {
          Aos.init({
            duration: 600, 
            easing: "ease-out", 
            once: true, 
          });
        }, []);
  return (
    <div className='Blog-containerall' data-aos="zoom-out-down">
              {/* header BlogBlog */}
              <div className='Signup-header'>
        <div className='QA-Container'>
          <div className='QA-ra1'>            
            <div className="CU-frame">
            <div className="CU-frame-2">
              <div className="CU-frame-3">
                <div className="CU-vector" />
                <span className="CU-contact-us">Blog</span>
              </div>
            </div>
          
            </div>
          </div>
        </div>

            </div>
            {/* Body Blog */}
            <div className='Blog-Body'>
<div className='HH_BlogBlog mt-80'>
<div className='latest-project'>
<div className='card New1' >
<img src={bigstock2} className="card-img-top" alt="..."/>
  <div className="card-body">
  <span className="BB-handheld-hydraulic-iron">
  Làm Thế Nào Để Chọn Đúng Thiết Bị Xây Dựng Cho Dự Án Của Bạn?
              </span>
              <div className="may-9-2014-category">May 9, 2014 | Category</div>
              <span className="BB-straightening-repairing-iron">
              Hướng dẫn chi tiết cách lựa chọn thiết bị phù hợp giúp tối ưu chi phí và hiệu suất thi công.
              </span>

  </div>
</div>
<div className='card New1' >
<img src={bigstock1} className="card-img-top" alt="..."/>
  <div className="card-body">
  <span className="BB-handheld-hydraulic-iron">
  Thuê Thiết Bị Xây Dựng – Giải Pháp Tiết Kiệm Chi Phí Cho Doanh Nghiệp
              </span>
              <div className="may-9-2014-category">May 9, 2014 | Category</div>

              <span className="BB-straightening-repairing-iron">
              So sánh chi phí giữa thuê và mua thiết bị, giúp bạn đưa ra quyết định tối ưu cho ngân sách công trình.
              </span>

  </div>
</div>
<div className='card New1' >
<img src={bigstock3} className="card-img-top" alt="..."/>
  <div className="card-body">
  <span className="BB-handheld-hydraulic-iron">
  Bảo Dưỡng Thiết Bị Xây Dựng Định Kỳ Quan Trọng Như Thế Nào?
              </span>
              <div className="may-9-2014-category">May 9, 2014 | Category</div>

              <span className="BB-straightening-repairing-iron">
              Lý do bạn nên sử dụng thiết bị được bảo trì tốt để đảm bảo an toàn và hiệu suất công việc.
              </span>

  </div>
</div>
</div>
<div className='New-viewall'>

</div>

</div>
<div className='HH_BlogBlog mt-80'>
<div className='latest-project'>
<div className='card New1' >
<img src={bigstock2} className="card-img-top" alt="..."/>
  <div className="card-body">
  <span className="BB-handheld-hydraulic-iron">
  Những Lợi Ích Khi Thuê Thiết Bị Xây Dựng Thay Vì Mua Mới
              </span>
              <div className="may-9-2014-category">May 9, 2014 | Category</div>

              <span className="BB-straightening-repairing-iron">
              Phân tích các lợi ích của việc thuê thiết bị, bao gồm giảm chi phí đầu tư ban đầu và linh hoạt sử dụng.
              </span>
  </div>
</div>
<div className='card New1' >
<img src={bigstock1} className="card-img-top" alt="..."/>
  <div className="card-body">
  <span className="BB-handheld-hydraulic-iron">
  5 Lưu Ý Quan Trọng Khi Thuê Thiết Bị Xây Dựng
              </span>
              <div className="may-9-2014-category">May 9, 2014 | Category</div>

              <span className="BB-straightening-repairing-iron">
              Những điều cần biết để đảm bảo bạn thuê được thiết bị chất lượng, đúng giá và đúng nhu cầu.
              </span>

  </div>
</div>
<div className='card New1' >
<img src={bigstock3} className="card-img-top" alt="..."/>
  <div className="card-body">
  <span className="BB-handheld-hydraulic-iron">
  Cách Đặt Thuê Thiết Bị Xây Dựng Nhanh Chóng Trên Website
              </span>
              <div className="may-9-2014-category">May 9, 2014 | Category</div>

              <span className="BB-straightening-repairing-iron">
              Hướng dẫn từng bước để bạn có thể thuê thiết bị dễ dàng chỉ trong vài phút.
              </span>

  </div>
</div>
</div>
<div className='New-viewall'>

</div>

</div>
            </div>
    </div>
  )
}

export default Blog
