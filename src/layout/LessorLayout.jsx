import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import LessorSidebar from "../page/LessorPage/LessorSidebar";
export default function LessorLayout() {
  return (
    <div className="flex h-screen">
      <LessorSidebar className="" />
      <main className="w-full h-full overflow-auto bg-slate-100">
        <Outlet />
      </main>
    </div>
  );
}
