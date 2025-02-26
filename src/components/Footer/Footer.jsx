import React from 'react'
import './Footer.css';


const Footer = () => {
  return (
    <div className="FT-main-containers">
      <div className="FT-contact-section">
        <span className="FT-contact-title">Contact Us</span>
        <div className="FT-contact-vector"></div>
        <div className="FT-contact-inputs">
          <div className="FT-input-group">
          <input type="text" className="FT-inputfrom" placeholder="Name" aria-label="name" aria-describedby="basic-addon1"/>
          </div>
          <div className="FT-input-group">
            {/* <input className="FT-input-field FT-email-input" type="email" placeholder="Email" /> */}
            <input type="text" className="FT-inputfrom" placeholder="Email" aria-label="name" aria-describedby="basic-addon1"/>
          </div>
        </div>
        <div className="FT-message-group">
          {/* <textarea className="FT-message-field" placeholder="Message"></textarea> */}
          {/* <textarea className="form-control" placeholder="Message" id="floatingTextarea2" style="height: 100px"/> */}
          <input type="text" className="FT-inputfrom" placeholder="Message" aria-label="name" aria-describedby="basic-addon1"/>

        </div>
        <button className="FT-send-button">
          <span className="FT-button-text">SEND MESSAGE</span>
        </button>
      </div>
      <div className="FT-info-section">
      <div className="FT-social-media">
          <span className="FT-icon-facebook"></span>
          <span className="FT-icon-twitter"></span>
          <span className="FT-icon-linkedin"></span>
        </div>
        <div className="FT-contact-details">

          <div className="FT-contact-info">
            <div className="FT-icon-location"></div>
            <span className="FT-location-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
          </div>
          <div className="FT-contact-info">
            <div className="FT-icon-phone"></div>
            <span className="FT-phone-number">092123456</span>
          </div>
          <div className="FT-contact-info">
            <div className="FT-icon-email"></div>
            <span className="FT-email-address">SparkTechVentures@gmail.com</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Footer