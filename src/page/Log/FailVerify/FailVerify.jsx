import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../SuccessVerify/SuccessVerify.css'; 



const FailVerify = () => {
  return (
    <div className="RegistrationSuccess">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center position-relative">
              <div className="card-header bg-danger text-white">
                <i className="fas fa-exclamation-triangle text-white mr-2"></i>
                Registration failed!
              </div>
              <div className="card-body">
                <h5 className="card-title">An error occurred. Please try again.</h5>                
                <a href="/signup" className="btn RegistrationFailed-btn">Try again</a>
              </div>
              <div className="card-footer text-muted">
              Thank you for trusting SparkTech Ventures.
              </div>
              {/* Optional effect - adjust or remove if you want */}
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

export default FailVerify;