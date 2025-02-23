import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RegistrationSuccess.css'; 

const RegistrationSuccess = () => {
  return (
    <div className="RegistrationSuccess">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center position-relative">
              <div className="card-header bg-success text-white">
                <i className="fas fa-gem text-white mr-2"></i>
                Đăng ký thành công!
              </div>
              <div className="card-body">
                <h5 className="card-title">Chào mừng đến với SparkTech Ventures</h5>
                <p className="card-text">
                  Tài khoản của bạn đã được tạo thành công.Bạn có thể bắt đầu trải nghiệm dịch vụ của chúng tôi.
                </p>
                
                <a href="/login" className="btn RegistrationSuccess-btn">Đăng nhập ngay</a>
              </div>
              <div className="card-footer text-muted">
                Cảm ơn bạn đã tin tưởng SparkTech Ventures.
              </div>
              {/* Hiệu ứng hoa rơi */}
              <div className="falling-flowers">
                <span className="flower">🌸</span>
                <span className="flower">🌸</span>
                <span className="flower">🌸</span>
                <span className="flower">🌸</span>
                <span className="flower">🌸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
