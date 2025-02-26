import React, { useEffect, useState } from "react";
import {
  CircleDollarSign,
  Users,
  ShoppingCart,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
} from "lucide-react";
import api from "../../Context/api";
import { motion } from "framer-motion";

export default function LessorOrder() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("lessor/orders");
        setOrder(response.data.data.reverse());
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // const formatCurrency = (amount) => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //   }).format(amount / 23000);
  // };

  const getStatusBadge = (status) => {
    if (status === "COMPLETED" || status === "2") {
      return "bg-green-100 text-green-800 border border-green-200";
    } else if (status === "PENDING" || status === "0") {
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    } else {
      return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getStatusText = (status) => {
    if (status === "COMPLETED" || status === "2") {
      return "Completed";
    } else if (status === "PENDING" || status === "0") {
      return "Pending";
    } else {
      return status;
    }
  };

  const filteredOrders = order.filter((order) => {
    return (
      (order.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id?.toString().includes(searchTerm)) &&
      (statusFilter === "" ||
        order.status === statusFilter ||
        (statusFilter === "PENDING" && order.status === "0") ||
        (statusFilter === "COMPLETED" && order.status === "2")) &&
      (paymentFilter === "" || order.paymentMethod === paymentFilter)
    );
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    document
      .querySelector(".table-container")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const totalRevenue = order.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );
  const totalOrders = order.length;
  const completedOrders = order.filter(
    (order) => order.status === "COMPLETED" || order.status === "2"
  ).length;

  // Animation classes for cards
  const cardClasses =
    "transform transition-all duration-300 hover:scale-105 hover:shadow-lg";

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <motion.div
      className="bg-gray-50 min-h-screen pb-12 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-6 ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Order Management
            </h2>
            {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              New Order
            </button> */}
          </div>

          {/* Search and filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="relative">
              <CircleDollarSign
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none"
                value={paymentFilter}
                onChange={(e) => {
                  setPaymentFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Payment Methods</option>
                <option value="CASH">Cash</option>
                <option value="PAYOS">PayOS</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount (VND)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                        <span className="text-gray-500">Loading orders...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div>{order.recipientName}</div>
                        <div className="text-xs text-gray-400">
                          {order.recipientPhone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.totalPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{formatDate(order.dateOfReceipt)}</div>
                        <div className="text-xs text-gray-400">
                          to {formatDate(order.dateOfReturn)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.paymentMethod === "CASH" ? "Cash" : "PayOS"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors mr-2">
                          <Eye size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <ShoppingCart className="h-12 w-12 text-gray-300 mb-2" />
                        <p>No orders found</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredOrders.length > ordersPerPage && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() =>
                    paginate(currentPage > 1 ? currentPage - 1 : 1)
                  }
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Prev
                </button>
                {[
                  ...Array(
                    Math.min(
                      5,
                      Math.ceil(filteredOrders.length / ordersPerPage)
                    )
                  ).keys(),
                ].map((number) => {
                  const pageNumber = number + 1;
                  const totalPages = Math.ceil(
                    filteredOrders.length / ordersPerPage
                  );
                  let pagesToShow = [];

                  if (totalPages <= 5) {
                    pagesToShow = Array.from(
                      { length: totalPages },
                      (_, i) => i + 1
                    );
                  } else {
                    if (currentPage <= 3) {
                      pagesToShow = [1, 2, 3, 4, 5];
                    } else if (currentPage >= totalPages - 2) {
                      pagesToShow = [
                        totalPages - 4,
                        totalPages - 3,
                        totalPages - 2,
                        totalPages - 1,
                        totalPages,
                      ];
                    } else {
                      pagesToShow = [
                        currentPage - 2,
                        currentPage - 1,
                        currentPage,
                        currentPage + 1,
                        currentPage + 2,
                      ];
                    }
                  }

                  if (!pagesToShow.includes(pageNumber)) return null;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`px-3 py-1 border border-gray-300 text-sm font-medium transition-colors duration-200 ${
                        currentPage === pageNumber
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    paginate(
                      currentPage <
                        Math.ceil(filteredOrders.length / ordersPerPage)
                        ? currentPage + 1
                        : currentPage
                    )
                  }
                  disabled={
                    currentPage ===
                    Math.ceil(filteredOrders.length / ordersPerPage)
                  }
                  className="flex items-center px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
                >
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
