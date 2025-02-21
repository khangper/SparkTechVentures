// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import "./ThanksPage.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// function ThanksPage() {
//   const location = useLocation();
//   const {
//     date,
//     recipientName,
//     recipientEmail,
//     paymentMethod,
//     supplier,
//     address,
//     product,
//     totalAmount,
//   } = location.state || {};

//   return (
//     <div className="ThankContainer">
//       <div className="container">
//         <div className="row">
//           <div className="col-6 TK-frame-314">
//             <div className="TK-frame-311">
//               <div className="TK-rectangle-258">
//                 <div className="TK-rectangle-259">
//                   <div className="TK-receiptify">Receiptify</div>
//                 </div>
//                 <div className="TK-flex">
//                   <div className="TK-date">Date:</div>
//                   <div className="TK-_26-october-2024">{date}</div>
//                 </div>
//                 <div className="TK-flex">
//                   <div className="TK-date">Billed to:</div>
//                   <div className="TK-_26-october-2024">{recipientEmail}</div>
//                 </div>
//                 <div className="TK-flex">
//                   <div className="TK-date">Payment method:</div>
//                   <div className="TK-_26-october-2024">{paymentMethod}</div>
//                 </div>
//                 <div className="TK-flex">
//                   <div className="TK-date">Supplier:</div>
//                   <div className="TK-_26-october-2024">{supplier}</div>
//                 </div>
//                 <div className="TK-flex">
//                   <div className="TK-date">Address:</div>
//                   <div className="TK-_26-october-2024">{address}</div>
//                 </div>
//                 <div className="TK-flex">
//                   <div className="TK-date">Product:</div>
//                   <div className="TK-_26-october-2024">{product}</div>
//                 </div>
//                 <div className="TK-vector"></div>
//                 <div className="TK-flex">
//                   <div className="TK-total-span">Total:</div>
//                   <div className="TK-_250">${totalAmount}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-6">
//             <div className="thank-you-for-your-payment">
//               Thank you for your payment.
//             </div>
//             <Link to="/">
//               <div className="TK-rectangle-257">
//                 <div className="TK-text">Back to Home</div>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ThanksPage;
import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./ThanksPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ThanksPage() {
  const location = useLocation();
  const {
    date,
    recipientName,
    recipientEmail,
    paymentMethod,
    address,
    product,
    totalAmount,
  } = location.state || {};

  const paymentMethodText = paymentMethod === 2 ? "PayOS" : "COD";

  return (
    <div className="ThankContainer">
      <div className="container">
        <div className="row">
          <div className="col-6 TK-frame-314">
            <div className="TK-frame-311">
              <div className="TK-rectangle-258">
                <div className="TK-rectangle-259">
                  <div className="TK-receiptify">Receiptify</div>
                </div>
                <div className="TK-flex">
                  <div className="TK-date">Date:</div>
                  <div className="TK-_26-october-2024">{date}</div>
                </div>
                <div className="TK-flex">
                  <div className="TK-date">Recipient Name:</div>
                  <div className="TK-_26-october-2024">{recipientName}</div>
                </div>
                {/* <div className="TK-flex">
                  <div className="TK-date">Billed to:</div>
                  <div className="TK-_26-october-2024">{recipientEmail}</div>
                </div> */}
                <div className="TK-flex">
                  <div className="TK-date">Payment method:</div>
                  <div className="TK-_26-october-2024">{paymentMethodText}</div>
                </div>
                <div className="TK-flex">
                  <div className="TK-date">Address:</div>
                  <div className="TK-_26-october-2024">{address}</div>
                </div>
                <div className="TK-flex">
                  <div className="TK-date">Product:</div>
                  <div className="TK-_26-october-2024">{product}</div>
                </div>
                <div className="TK-vector"></div>
                <div className="TK-flex">
                  <div className="TK-total-span">Total:</div>
                  <div className="TK-_250">${totalAmount}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="thank-you-for-your-payment">
              Thank you for your payment.
            </div>
            <Link to="/" className="TK-rectangle-257">
  <div className="TK-text">Back to Home</div>
</Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ThanksPage;
