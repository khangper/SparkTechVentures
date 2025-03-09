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
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="bg-amber-500 rounded-lg p-3 mb-6">
                <h2 className="text-white text-xl font-bold text-center">
                  Hóa đơn
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Ngày:</span>
                  <span className="text-gray-800">{date}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    Tên người nhận:
                  </span>
                  <span className="text-gray-800">{recipientName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    Phương thức thanh toán:
                  </span>
                  <span className="text-gray-800">{paymentMethodText}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Địa chỉ:</span>
                  <span className="text-gray-800">{address}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Sản phẩm:</span>
                  <span className="text-gray-800">{product}</span>
                </div>

                <div className="border-t border-dashed border-gray-300 my-4"></div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">
                    Tổng cộng:
                  </span>
                  <span className="text-lg font-bold text-amber-600">
                    {totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-amber-500 p-8 flex flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Cảm ơn bạn đã thanh toán!
              </h1>
              <p className="text-amber-100 mb-12 text-lg">
                Giao dịch của bạn đã thành công.
              </p>
              <Link
                to="/"
                className="no-underline inline-block px-8 py-4 rounded-lg bg-white text-amber-600 font-bold hover:bg-amber-50 transition-colors shadow-lg"
              >
                Trở về Trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThanksPage;
