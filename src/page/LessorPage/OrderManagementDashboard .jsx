import React, { useEffect, useState } from "react";
import api from "../../Context/api";
import { Eye } from "lucide-react";

const OrderManagementDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`lessor/orders`);
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;
    const matchesSearch =
      order.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.recipientPhone.includes(searchTerm) ||
      order.id.toString().includes(searchTerm);

    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const sortedOrders = isReversed
    ? [...filteredOrders].reverse()
    : filteredOrders;

  return (
    <div className="">
      <div className="max-w-7xl mx-auto mt-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Quản lý đơn hàng
        </h1>

        {/* Controls */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 ">
            <div className="w-full">
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => setIsReversed(!isReversed)}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2
              ${
                isReversed
                  ? "bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isReversed ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
                <span className="hidden sm:inline">
                  {isReversed ? "Mới nhất" : "Cũ nhất"}
                </span>
              </button>
            </div>

            {/* <div className="w-full md:w-auto">
              <select
                className="px-4 py-2 border rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All statuses</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div> */}
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Khách hàng
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sản phẩm
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Giá
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Thời gian thuê
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    CHI TIẾT
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-sm font-medium text-gray-900">
                        {order.recipientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.recipientPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.orderItems.map((item) => (
                        <div key={item.id}>
                          {item.productName} (x{item.quantity})
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {order.totalPrice.toLocaleString("vi-VN")} VNĐ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>Nhận: {formatDate(order.dateOfReceipt)}</div>
                      <div>Trả: {formatDate(order.dateOfReturn)}</div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status === "PENDING"
                          ? "PENDING"
                          : order.status === "COMPLETED"
                          ? "COMPLETED"
                          : order.status === "CANCELLED"
                          ? "CANCELLED"
                          : order.status}
                      </span>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center flex justify-center">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-blue-600 hover:text-blue-900 "
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No matching orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[85vh] overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">
              CHI TIẾT ĐƠN HÀNG #{selectedOrder.id}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
              >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
              </svg>
            </button>
          </div>

          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 70px)' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
            <h3 className="text-lg font-medium mb-2">
              THÔNG TIN KHÁCH HÀNG
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>
                <span className="font-medium">Tên:</span>{" "}
                {selectedOrder.recipientName}
              </p>
              <p>
                <span className="font-medium">Số điện thoại:</span>{" "}
                {selectedOrder.recipientPhone}
              </p>
              <p>
                <span className="font-medium">Địa chỉ:</span>{" "}
                {selectedOrder.address}
              </p>
            </div>
              </div>

              <div>
            <h3 className="text-lg font-medium mb-2">
              THÔNG TIN ĐƠN HÀNG
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
      
                    <p>
                      <span className="font-medium">
                        Phương thức thanh toán:
                      </span>{" "}
                      {selectedOrder.paymentMethod}
                    </p>
                    <p>
                      <span className="font-medium">Phương thức mua hàng:</span>{" "}
                      {selectedOrder.purchaseMethod}
                    </p>
                    <p>
                      <span className="font-medium">Ngày tạo:</span>{" "}
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Thời gian thuê</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>
                    <span className="font-medium">Ngày bắt đầu:</span>{" "}
                    {formatDate(selectedOrder.dateOfReceipt)}
                  </p>
                  <p>
                    <span className="font-medium">Ngày kết thúc:</span>{" "}
                    {formatDate(selectedOrder.dateOfReturn)}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Các sản phẩm</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Sản phẩm
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Số lượng
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Đơn giá
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Thành tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.orderItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.productName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.price.toLocaleString("vi-VN")} VND
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {(item.price * item.quantity).toLocaleString(
                              "vi-VN"
                            )}{" "}
                            VND
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td
                          colSpan="3"
                          className="px-6 py-4 text-sm font-medium text-gray-900 text-right"
                        >
                          Tổng cộng:
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          {selectedOrder.totalPrice.toLocaleString("vi-VN")} VND
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* {selectedOrder.paymentMethod === "PAYOS" && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Thanh toán: </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p>
                      <span className="font-medium">Payment URL:</span>{" "}
                      <a
                        href={selectedOrder.payOsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline truncate block"
                      >
                        {selectedOrder.payOsUrl}
                      </a>
                    </p>
                  </div>
                </div>
              )} */}

              <div className="flex justify-end gap-4 mt-6">
                {/* {selectedOrder.status === "PENDING" && (
                  <>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Confirm Order
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      Cancel Order
                    </button>
                  </>
                )} */}
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagementDashboard;
