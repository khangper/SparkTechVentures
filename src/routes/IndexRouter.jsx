import React, { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router-dom";

import Main from "../page/index";
import HomePage from "../page/HomePage/HomePage.jsx";
import AboutUS from "../page/AboutUS/AboutUS";
import ContactUS from "../page/ContactUS/ContactUS.jsx";
import Login from "../page/Log/Login/Login.jsx";
import Signup from "../page/Log/Signup/Signup.jsx";
import Question from "../page/Question/Question.jsx";
import Blog from "../page/Blog/Blog.jsx";
import Admin from "../page/AdminPage/Admin.jsx";
import StoreManagement from "../page/AdminPage/StoreManagement.jsx";
import Member from "../page/Member/Member.jsx";
import ShoppingCart from "../page/ShoppingCart/ShoppingCart.jsx";
import CheckoutPage from "../page/CheckoutPage/CheckoutPage.jsx";
import AllProduct from "../page/AllProduct/AllProduct.jsx";
import ViewDetail from "../page/ViewDetail/ViewDetail.jsx";
import StaffPage from "../page/StaffPage/StaffPage.jsx";
import LessorPage from "../page/LessorPage/LessorPage.jsx";
import TransactionHistory from "../page/TransactionHistoryPage/TransactionHistory.jsx";
import OrderDetailsPage from "../page/OrderDetailsPage/OrderDetailsPage.jsx";
import OrderListPage from "../page/OrderListPage/OrderListPage.jsx";
import ThanksPage from "../page/ThanksPage/ThanksPage.jsx";
import PaymentPage from "../page/PaymentPage/PaymentPage.jsx";
import PaymentPageSuccess from "../page/Payemnet/PaymentPageSuccess/PaymentPageSuccess.jsx";
import PaymentPageCancel from "../page/Payemnet/PaymentPageCancel/PaymentPageCancel.jsx";
import Compare from "../page/Compare.jsx";
import RequireAuth from "../Auth/RequireAuth.jsx";
import RootLayout from "../layout/MainLayout.jsx";
import LessorLayout from "../layout/LessorLayout.jsx";
import LessorStore from "../page/LessorPage/LessorStore.jsx";
import LessorProduct from "../page/LessorPage/LessorProduct.jsx";
import LessorProductDetail from "../page/LessorPage/LessorProductDetail.jsx";
import LessorEdit from "../page/LessorPage/LessorEdit.jsx";
import StaffLayout from "../layout/StaffLayout.jsx";
import SuccessVerify from "../page/Log/SuccessVerify/SuccessVerify.jsx";
import LessorHome from "../page/LessorPage/LessorHome.jsx";
import LessorOrder from "../page/LessorPage/LessorOrder.jsx";
import Profile from "../page/Profile/Profile.jsx";
import FailVerify from "../page/Log/FailVerify/FailVerify.jsx";
import LessorCategory from "../page/LessorPage/LessorCategory.jsx";
import HomeAll from "../page/HomePage/HomeAll.jsx";
import ProductByCategory from "../page/HomePage/ProductByCategory.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import UserManagement from "../page/AdminPage/UserManagement.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export const indexRouter = createBrowserRouter([
  //   { path: "/login", element: <Login /> },
  //   { path: "/sign-up", element: <Signup /> },
  //   { path: "/", element: <HomePage /> },
  //   { path: "/all-product", element: <AllProduct /> },
  //   { path: "/main", element: <Main /> },
  //   { path: "/about", element: <AboutUS /> },
  //   { path: "/contact", element: <ContactUS /> },
  //   { path: "/login", element: <Login onLogin={handleLogin} /> },
  //   { path: "/signup", element: <Signup /> },
  //   { path: "/question", element: <Question /> },
  //   { path: "/blog", element: <Blog /> },
  //   { path: "/thanks", element: <ThanksPage /> },
  //   { path: "/paysuccess", element: <PaymentPageSuccess /> },
  //   { path: "/paycancel", element: <PaymentPageCancel /> },
  //   { path: "/compare/:id", element: <Compare /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },

      { path: "/main", element: <Main /> },
      { path: "/verify-success", element: <SuccessVerify /> },
      { path: "/verify-fail", element: <FailVerify /> },
      { path: "/all-product", element: <AllProduct /> },
      { path: "/about", element: <AboutUS /> },
      { path: "/contact", element: <ContactUS /> },
      { path: "/question", element: <Question /> },
      { path: "/blog", element: <Blog /> },
      { path: "/thanks", element: <ThanksPage /> },
      { path: "/paysuccess", element: <PaymentPageSuccess /> },
      { path: "/paycancel", element: <PaymentPageCancel /> },
      { path: "/compare/:id", element: <Compare /> },
      { path: "/all", element: <HomeAll /> },
      { path: "/category/:id", element: <ProductByCategory /> },
    
    ],
  },

  {
    path: "/",
    element: (
      <RequireAuth allowedRoles={["CUSTOMER"]}>
        <RootLayout />
      </RequireAuth>
    ),
    errorElement: <Error />,
    children: [
      { index: "ViewDetail", element: <ViewDetail /> },
      { path: "CheckoutPage", element: <CheckoutPage /> },
      { path: "transaction", element: <TransactionHistory /> },
      { path: "order/:orderId", element: <OrderDetailsPage /> },
      { path: "orders", element: <OrderListPage /> },
      { path: "PaymentPage", element: <PaymentPage /> },
      { path: "member", element: <Member /> },
      { path: "ShoppingCart", element: <ShoppingCart /> },
      { path: "/profile", element: <Profile /> },
    ],
  },

  {
    path: "/lessor",
    element: (
      <RequireAuth allowedRoles={["LESSOR"]}>
        <LessorLayout />
      </RequireAuth>
    ),
    errorElement: <Error />,
    children: [
      { index: true, element: <LessorHome /> },

      { path: "products", element: <LessorProduct /> },
      { path: "product/:id", element: <LessorProductDetail /> },
      { path: "product/:id/edit", element: <LessorEdit /> },
      // { path: "by-store", element: <LessorStore /> },
      { path: "add-product", element: <LessorPage /> },
      { path: "add-by-store", element: <LessorStore /> },
      { path: "all-orders", element: <LessorOrder /> },
      { path: "profile", element: <Profile /> },
      { path: "categories", element: <LessorCategory /> },
    ],
  },

  {
    path: "/staff",
    element: (
      <RequireAuth allowedRoles={["STAFF"]}>
        <StaffLayout />
      </RequireAuth>
    ),
    errorElement: <Error />,
    children: [{ index: true, element: <StaffPage /> }],
  },

  {
    path: "/admin",
    element: (
      <RequireAuth allowedRoles={["ADMIN"]}>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element:  <Admin/> },
      { path: "users", element: <UserManagement /> },
      { path: "stores", element: <StoreManagement /> },
    ],
  }
  
]);
