import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiChevronLeft, HiTrash, HiPlus, HiMinus } from "react-icons/hi";

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu giỏ hàng từ sessionStorage
    const storedCartItems = sessionStorage.getItem("cartItems");
    if (storedCartItems) {
      setItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Hàm cập nhật số lượng của sản phẩm
  const updateQuantity = (productId, delta) => {
    const updatedItems = items.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity: Math.max(item.quantity + delta, 1) };
      }
      return item;
    });
    setItems(updatedItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  // Hàm xoá sản phẩm khỏi giỏ hàng
  const handleDelete = (productId) => {
    const updatedItems = items.filter((item) => item.productId !== productId);
    setItems(updatedItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  // Tính toán tổng tiền
  const shippingCost = 4;
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  // Chuyển sang trang CheckoutPage
  const handleCheckout = () => {
    navigate("/CheckoutPage", {
      state: {
        cartItems: items,
        totalPrice: total,
        shippingCost,
      },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Shopping Cart */}
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Link
                to="/all"
                className="text-gray-600 hover:text-blue-600 mr-4 transition duration-200"
              >
                <HiChevronLeft className="h-6 w-6" />
              </Link>
              <h2 className="text-2xl font-bold text-gray-800">Giỏ Hàng</h2>
            </div>
            <div className="border-b border-gray-200 mb-4"></div>
            <p className="text-gray-500 mb-6">
              Bạn có {items.length} sản phẩm trong giỏ hàng
            </p>

            {items.length === 0 ? (
              <div className="flex flex-col items-center py-12">
                <img
                  src="https://i.imgur.com/dCdflKN.png"
                  alt="Empty Cart"
                  className="w-32 mb-5"
                />
                <h3 className="text-xl font-medium text-gray-700 mb-3">
                  Giỏ hàng của bạn đang trống
                </h3>
                <p className="text-gray-500 mb-6">
                  Khám phá sản phẩm của chúng tôi và tìm những ưu đãi tốt nhất!
                </p>
                <Link
                  to="/all"
                  className="no-underline bg-yellow-600 text-white px-6 py-3 rounded-md font-medium hover:bg-yellow-700 transition-colors"
                >
                  Bắt đầu mua sắm
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
                  >
                    <div className="md:w-1/4">
                      <img
                        src={item.defaultImage}
                        alt={item.productName}
                        className="w-full h-40 object-cover object-center"
                      />
                    </div>
                    <div className="md:w-3/4 p-4 flex flex-col md:flex-row justify-between">
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          {item.productName}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {item.description ||
                            "Premium quality product from our collection"}
                        </p>
                        <button
                          className="text-red-500 hover:text-red-700 flex items-center text-sm transition-colors"
                          onClick={() => handleDelete(item.productId)}
                        >
                          <HiTrash className="h-4 w-4 mr-1" /> Remove
                        </button>
                      </div>
                      <div className="flex flex-col items-end space-y-4 mt-4 md:mt-0">
                        <p className="font-bold text-lg text-blue-600">
                          {item.price.toLocaleString("vi-VN")} VND/ngày
                        </p>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                          <button
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition"
                            onClick={() => updateQuantity(item.productId, -1)}
                          >
                            <HiMinus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-medium border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition"
                            onClick={() => updateQuantity(item.productId, 1)}
                          >
                            <HiPlus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-bold text-lg">
                          Tổng cộng:{" "}
                          <span className="text-blue-600">
                            {(item.price * item.quantity).toLocaleString(
                              "vi-VN"
                            )}{" "}
                            VND/ngày
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Tóm Tắt Đơn Hàng
              </h2>
              <div className="border-b border-gray-200 mb-4"></div>

              {items.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Sản phẩm</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between text-gray-600 py-2 border-b border-gray-100 last:border-0"
                      >
                        <span className="truncate flex-1 pr-4">
                          {item.productName}{" "}
                          <span className="text-gray-400">
                            (x{item.quantity})
                          </span>
                        </span>
                        <span className="font-medium text-blue-600">
                          {(item.price * item.quantity).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="font-medium">
                    {subtotal.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng</span>
                    <span className="text-blue-600">
                      {total.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                      /ngày
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Bao gồm thuế</p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className={`w-full py-3 px-4 rounded-md font-medium text-white flex items-center justify-center ${
                  items.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:opacity-90"
                }`}
              >
                {items.length === 0 ? "Giỏ hàng trống" : "Tiến hành thanh toán"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
