import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SuccessVerify.css'; 

const SuccessVerify = () => {
  return (
    <div className="RegistrationSuccess">
      <div className=" m-7">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center position-relative">
              <div className="card-header bg-success text-white">
                <i className="fas fa-gem text-white mr-2"></i>
                Registration Successful!
              </div>
              <div className="card-body">
                <h5 className="card-title">Welcome to SparkTech Ventures</h5>
                <p className="card-text">
                  Your account has been successfully created. You can now start experiencing our services.
                </p>
                
                <a href="/login" className="btn RegistrationSuccess-btn">Log in now</a>
              </div>
              <div className="card-footer text-muted">
                Thank you for trusting SparkTech Ventures.
              </div>
              {/* Falling flower effect */}
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

export default SuccessVerify;
