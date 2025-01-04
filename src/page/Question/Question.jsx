import React, { useState } from 'react'
import "./Question.css"

export default function Question() {
    const [activeTab, setActiveTab] = useState('tab1'); // Khởi tạo trạng thái cho tab

    const handleTabClick = (tab) => {
      setActiveTab(tab); // Cập nhật trạng thái khi tab được nhấn
    };
  return (
    <div className='QA-containerall'>
        {/* header QA */}
            <div className='Signup-header'>
        <div className='QA-Container'>
          <div className='QA-ra1'>            
            <div className="CU-frame">
            <div className="CU-frame-2">
              <div className="CU-frame-3">
                <div className="CU-vector" />
                <span className="CU-contact-us">Question</span>
              </div>
            </div>
          
            </div>
          </div>
        </div>

            </div>
            {/* Mid to end QA */}
            <div className='QA-tab '>
            <div>
                <div className="tabs">
                    <button className={activeTab === 'tab1' ? 'active' : ''} onClick={() => handleTabClick('tab1')}>Order</button>
                    <button className={activeTab === 'tab2' ? 'active' : ''} onClick={() => handleTabClick('tab2')}>Payment</button>
                    <button className={activeTab === 'tab3' ? 'active' : ''} onClick={() => handleTabClick('tab3')}>Delivery</button>
                    <button className={activeTab === 'tab4' ? 'active' : ''} onClick={() => handleTabClick('tab4')}>Maintenance</button>

                </div>

            </div>

            </div>
            <div className="tab-content">
                    {activeTab === 'tab1' && 
                    <div className='tab-content__conten'>
                      <div className='tabcontent1__Q'>
                        How to rent equipment?
                      </div>
                      <div className='tabcontent__A'>
                      Simply visit our equipment rental page, select the type of machine you need,
  fill in the order form and we will contact you to confirm and arrange
  delivery.
                      </div>
                      <div className='tabcontent1__Q'>
                      What is the minimum rental period?                      </div>
                      <div className='tabcontent__A'>
                      The minimum rental period is 1 day. However, you can rent according to your project needs.
                      </div>
                      </div>}
                    {activeTab === 'tab2' && 
                                        <div className='tab-content__conten'>
                                        <div className='tabcontent1__Q'>
                                        Is a deposit required when renting equipment?
                                        </div>
                                        <div className='tabcontent__A'>
                                        Yes, we require a deposit to ensure the equipment is stored and returned in good condition.
                                        </div>
                                        <div className='tabcontent1__Q'>
                                        How do I pay?      
                                                     </div>
                                        <div className='tabcontent__A'>
                                        We accept a variety of payment methods, including cash, bank transfer and online payments.                                        </div>
                                        </div>}
                    {activeTab === 'tab3' &&
                                         <div className='tab-content__conten'>
                                         <div className='tabcontent1__Q'>
                                         Is there a delivery service?
                                         </div>
                                         <div className='tabcontent__A'>
                                         Yes, we offer a delivery and pick-up service. Just let us know where and when you need it.
                                         </div>
                                         <div className='tabcontent1__Q'>
                                         What if the equipment breaks down during the rental period?
                                                            </div>
                                         <div className='tabcontent__A'>
                                         If the equipment has a problem, please contact us immediately. Our technical support team will come to check and fix the problem.                                         </div>
                                         </div>}
                    {activeTab === 'tab4' &&
                                         <div className='tab-content__conten'>
                                         <div className='tabcontent1__Q'>
                                         Is there a maintenance service for the equipment?
                                         </div>
                                         <div className='tabcontent__A'>
                                         We provide regular maintenance services for the rental equipment to ensure that it always operates efficiently and safely.
                                         </div>
                                         <div className='tabcontent1__Q'>
                                         Is the equipment maintained before renting?                     </div>
                                         <div className='tabcontent__A'>
                                         All our equipment is regularly checked and maintained to ensure that it is in the best condition before being delivered to customers.
                                         </div>
                                         </div>}

                </div>
    </div>
  )
}
