import React from "react";
import { Outlet } from "react-router-dom";
import StaffSidebar from "../page/StaffPage/StaffSidebar";

export default function StaffLayout() {
  return (
    <div className="flex h-screen">
      <StaffSidebar className="" />
      <main className="w-full h-full overflow-auto bg-slate-50 p-5">
        <Outlet />
      </main>
    </div>
  );
}
