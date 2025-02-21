import { Outlet } from "react-router-dom";
import LessorSidebar from "./LessorSidebar";

const LessorLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <LessorSidebar />

      {/* Nội dung chính */}
      <div className="flex-1 p-6 bg-gray-100 ">
        <Outlet />
      </div>
    </div>
  );
};

export default LessorLayout;
