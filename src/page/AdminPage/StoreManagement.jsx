import React, { useEffect, useState } from "react";
import { Eye, CheckCircle, XCircle, Store } from "lucide-react";
import api from "../../Context/api";
import toast from "react-hot-toast";

export default function StoreManagement() {
  const [stores, setStores] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showStoreDetails, setShowStoreDetails] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 5;
  const filtered = stores.filter((store) =>
    store.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStores = filtered.slice(startIndex, endIndex);

  const handleUpdateStoreStatus = async (storeId, status) => {
    try {
      setIsLoading(true);

      const response = await api.patch(`/store/${storeId}/status`, status, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Store status updated successfully ✅");
        fetchStores();
      }
    } catch (error) {
      console.error("Error updating store status:", error);
      toast.error("Failed to update store status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewStore = (store) => {
    setSelectedStore(store);
    setShowStoreDetails(true);
  };

  const fetchStores = async () => {
    setLoading(true);
    try {
      let url = "/store";
      if (statusFilter !== "") {
        url = `/store/status?status=${statusFilter}`;
      }
      const res = await api.get(url);
      setStores(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch stores:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [statusFilter]);

  const formatDateToVN = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Store className="w-6 h-6 text-blue-600" />
        Quản lý cửa hàng
      </h1>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by store name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring"
        >
          <option value="">All Statuses</option>
          <option value="0">ACTIVE</option>
          <option value="1">CANCELLED</option>
          <option value="2">PENDING</option>
          <option value="3">INACTIVE</option>
          <option value="4">DELETED</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Loading stores...
          </div>
        ) : currentStores.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No stores found.
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Tên cửa hàng</th>
                <th className="p-3">Tên tài khoản</th>

                <th className="p-3">Số điện thoại</th>
                <th className="p-3">Địa chỉ</th>
                <th className="p-3">Chứng chỉ</th>

                <th className="p-3">Trạng thái</th>
                <th className="p-3">Chức năng</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {currentStores.map((store) => (
                <tr
                  key={store.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium text-gray-900">#{store.id}</td>
                  <td className="p-3">{store.name}</td>
                  <td className="p-3">{store.accountName}</td>

                  <td className="p-3">{store.phone}</td>
                  <td className="p-3">{store.address}</td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setSelectedImage(store.businessLicense);
                        setShowImage(true);
                      }}
                      className="text-blue-600 underline text-sm hover:text-blue-800"
                    >
                      View Image
                    </button>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        store.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : store.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {store.status}
                    </span>
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <button
                      onClick={() => handleViewStore(store)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {store.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleUpdateStoreStatus(store.id, 0)}
                          className="p-2 text-green-600 hover:text-green-800 disabled:opacity-50"
                          disabled={isLoading}
                          title="Accept"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleUpdateStoreStatus(store.id, 1)}
                          className="p-2 text-red-600 hover:text-red-800 disabled:opacity-50"
                          disabled={isLoading}
                          title="Reject"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && filtered.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors duration-200 text-blue-600 font-medium flex items-center gap-1 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </button>

          <div className="flex items-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center mx-1 rounded-full transition-colors duration-200 
                  ${
                    currentPage === page
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors duration-200 text-blue-600 font-medium flex items-center gap-1 shadow-sm"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {showImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowImage(false)}
          ></div>
          <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 transform transition-all">
            <div className="relative">
              <button
                onClick={() => setShowImage(false)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-600" />
              </button>
              <img
                src={selectedImage}
                alt="Store Image"
                className="w-full h-auto rounded-lg object-contain max-h-[80vh]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Store Details Modal */}
      {showStoreDetails && selectedStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowStoreDetails(false)}
          ></div>
          <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 transform transition-all animate-fade-in-up">
            <div className="p-6">
              <div className="flex justify-between items-center mb-3 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Store className="w-6 h-6 text-blue-600 mr-2" />
                  Chi tiết cửa hàng
                </h2>
                <button
                  onClick={() => setShowStoreDetails(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <XCircle className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">ID</h3>
                    <p className="text-base font-semibold">
                      #{selectedStore.id}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                    Tên cửa hàng
                    </h3>
                    <p className="text-base font-semibold">
                      {selectedStore.name}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                    Số điện thoại
                    </h3>
                    <p className="text-base">{selectedStore.phone}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Địa chỉ
                    </h3>
                    <p className="text-base">{selectedStore.address}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                     Ngày mở cửa
                    </h3>
                    <p className="text-base">
                      {new Date(selectedStore.openingDay).toLocaleDateString(
                        "vi-VN"
                      )}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Giờ mở cửa 
                    </h3>
                    <p className="text-base">
                      {new Date(
                        `2000-01-01T${selectedStore.openingHours}`
                      ).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                     Giờ đóng cửa
                    </h3>
                    <p className="text-base">
                      {new Date(
                        `2000-01-01T${selectedStore.closingHours}`
                      ).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Trạng thái
                    </h3>
                    <span
                      className={`inline-block mt-1 px-3 py-1 text-sm font-semibold rounded-full ${
                        selectedStore.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedStore.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedStore.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Chứng chỉ
                    </h3>
                    <div className="mt-2 bg-gray-100 rounded-lg p-1 h-40 flex items-center justify-center">
                      <img
                        src={selectedStore.businessLicense}
                        alt="Business License"
                        className="max-h-full object-contain rounded cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => {
                          setSelectedImage(selectedStore.businessLicense);
                          setShowImage(true);
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      Bấm vào để phóng to
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t-2 pt-2 mt-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                     Ngày tạo
                    </h3>
                    <p className="text-base">
                      {formatDateToVN(selectedStore.createdAt)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                     Ngày cập nhật
                    </h3>
                    <p className="text-base">
                      {formatDateToVN(selectedStore.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

    
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
