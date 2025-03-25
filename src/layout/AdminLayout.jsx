import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../page/AdminPage/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
