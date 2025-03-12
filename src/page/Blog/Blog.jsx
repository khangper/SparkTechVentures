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
<img src="https://file1.hutech.edu.vn/file/editor/phongctsv/chon_lua.jpg" className="card-img-top" alt="..."/>
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
<img src="https://www.prudential.com.vn/export/sites/prudential-vn/vi/.thu-vien/hinh-anh/pulse-nhip-song-khoe/song-khoe/2022/bi-quyet-tiet-kiem-tien-luong-hang-thang-cho-dan-cong-so-1200x800-1.jpg" className="card-img-top" alt="..."/>
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
<img src="https://dienmayhoanglien.vn/media/news/2405_Quy-trinh-bao-tri-bao-duong-may-moc-thiet-bi.jpg" className="card-img-top" alt="..."/>
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
<img src="https://tdfoss.vn/uploads/tdfoss.vn/tin-tuc/2019/2.jpeg" className="card-img-top" alt="..."/>
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
<img src="data:image/jpeg;base64,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" className="card-img-top" alt="..."/>
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
<img src="https://storage.googleapis.com/twg-content/images/how-people-use-their-devices-lg.width-1200.jpg" className="card-img-top" alt="..."/>
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
