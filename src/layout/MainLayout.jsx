// import React from "react";
// import { Outlet } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer/Footer";

// export default function RootLayout() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />

//       <main className="">
//         <Outlet />
//       </main>

//       <Footer />
//     </div>
//   );
// }
// import React, { useEffect } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer/Footer";

// export default function RootLayout() {
//   const location = useLocation();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [location.pathname]);
//   return (
//     <div className="bg-yellow-100">
//       <div className="container mx-auto ">
//         <Header />
//       </div>

//       <div className="flex flex-col min-h-screen container mx-auto ">
//         <main className="pt-16 ">
//           <Outlet />
//         </main>

//         <Footer />
//       </div>
//     </div>
//   );
// }
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

export default function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="mx-auto container mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
