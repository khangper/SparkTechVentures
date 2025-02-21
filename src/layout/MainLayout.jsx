import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
