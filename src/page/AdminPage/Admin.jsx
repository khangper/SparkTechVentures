import { CircleDollarSign, Users, Store, Eye } from "lucide-react";
import OrderManagementDashboard from "../LessorPage/OrderManagementDashboard ";
import { useEffect, useState } from "react";
import api from "../../Context/api";
import Lottie from "lottie-react";
import loadingdashboard from "../../assets/loadingdashboard.json";

const Card = ({ title, value, icon: Icon, color }) => {
  const getIconColor = (iconComponent) => {
    switch (iconComponent) {
      case CircleDollarSign:
        return "text-yellow-500";
      case Users:
        return "text-green-500";
      case Store:
        return "text-purple-500";
      default:
        return "";
    }
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-gray-500 text-sm font-medium">{title}</h4>
          <p className="text-xl font-semibold">{value}</p>
        </div>
        {Icon && <Icon className={`w-8 h-8 ${getIconColor(Icon)}`} />}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [dashboard, setDashboard] = useState();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("order");
        setOrders(response.data.data);
      } catch (error) {
        console.error("Failed to fetch orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("admin/dashboard");
        setDashboard(response.data.data);
        console.log(response.data.data);
      } catch (error) {
      }
    };

    fetchDashboard();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(searchQuery) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedOrders = isReversed 
    ? [...filteredOrders].reverse()
    : filteredOrders;

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Tổng doanh thu"
          value={
            dashboard ? (
              dashboard.totalRevenue.toLocaleString()
            ) : (
              <Lottie
                animationData={loadingdashboard}
                loop={true}
                className="w-32"
              />
            )
          }
          icon={CircleDollarSign}
          color="border-yellow-500"
        />
        <Card
          title="Tổng người dùng"
          value={
            dashboard ? (
              dashboard.totalUsers
            ) : (
              <Lottie
                animationData={loadingdashboard}
                loop={true}
                className="w-32"
              />
            )
          }
          icon={Users}
          color="border-green-500"
        />
        <Card
          title="Tổng cửa hàng"
          value={
            dashboard ? (
              dashboard.totalStores
            ) : (
              <Lottie
                animationData={loadingdashboard}
                loop={true}
                className="w-32"
              />
            )
          }
          icon={Store}
          color="border-purple-500"
        />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Đơn hàng</h2>

        {/* Search Bar and Reverse Button */}
        <div className="mb-4 flex gap-4 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm ID, tên khách hàng, phương thức thanh toán"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-2 top-2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          
          <button
            onClick={() => setIsReversed(!isReversed)}
            className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2
              ${isReversed 
                ? 'bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform duration-200 ${isReversed ? 'rotate-180' : ''}`}
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
              {isReversed ? 'Mới nhất' : 'Cũ nhất'}
            </span>
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phương thức thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phương thức mua hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày nhận hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chi tiết
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {order.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {order.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {order.purchaseMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(order.dateOfReceipt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-left">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => openModal(order)}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeModal}></div>
          <div className="relative z-50 bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 my-8 max-h-[90vh] overflow-y-auto transform transition-all animate-fade-in-up">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Chi tiết đơn hàng #{selectedOrder.id}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Khách hàng</p>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ID Khách hàng</p>
                  <p className="font-medium">{selectedOrder.customerId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tổng giá trị</p>
                  <p className="font-medium">
                    {selectedOrder.totalPrice.toLocaleString()} VND
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trạng thái</p>
                  <p className="font-medium">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {selectedOrder.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Phương thức thanh toán
                  </p>
                  <p className="font-medium">{selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phương thức mua hàng</p>
                  <p className="font-medium">{selectedOrder.purchaseMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Người nhận</p>
                  <p className="font-medium">{selectedOrder.recipientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium">{selectedOrder.recipientPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="font-medium">{selectedOrder.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ngày tạo đơn</p>
                  <p className="font-medium">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ngày nhận hàng</p>
                  <p className="font-medium">
                    {new Date(selectedOrder.dateOfReceipt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ngày trả hàng</p>
                  <p className="font-medium">
                    {new Date(selectedOrder.dateOfReturn).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedOrder.payOsUrl && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Link thanh toán PayOS</p>
                  <a
                    href={selectedOrder.payOsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline break-words"
                  >
                    {selectedOrder.payOsUrl}
                  </a>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
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
}
