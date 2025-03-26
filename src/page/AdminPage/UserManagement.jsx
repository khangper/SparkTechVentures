import axios from "axios";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../../Context/api";
import Lottie from "lottie-react";
import loadingadmin from "../../assets/loadingadmin.json";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const itemsPerPage = 5;
    const filtered = users.filter(user => 
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = [...filtered].slice(startIndex, endIndex);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/admin/account`);
                setUsers(res.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Reset to first page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        
        <div className="space-y-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <User className="w-6 h-6 text-blue-600" />
                User Management
            </h1>

            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search by username or full name"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>

            <div className="overflow-x-auto">
                {loading ? (
                           <div className="flex justify-center items-center">
                           <Lottie
                               animationData={loadingadmin}
                               loop={true}
                               className=" w-40"
                             />
                         </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">No users found.</div>
                ) : (
                    <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
                        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                            <tr>
                                <th className="p-3">ID</th>
                                <th className="p-3">Username</th>
                                <th className="p-3">Full Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Address</th>
                                <th className="p-3">Date of Birth</th>
                                <th className="p-3">Role</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                            {currentUsers.map((user) => (
                                <tr
                                    key={
                                        user.storeId || user.username || user.email || Math.random()
                                    }
                                    className="border-t hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-3 font-medium text-gray-900">
                                        #{user.storeId}
                                    </td>
                                    <td className="p-3">{user.username}</td>
                                    <td className="p-3">{user.fullName}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.phone}</td>
                                    <td className="p-3">{user.address}</td>
                                    <td className="p-3">
                                        {new Date(user.dateOfBirth).toLocaleDateString("vi-VN")}
                                    </td>
                                    <td className="p-3">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

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
        </div>
    );
}
