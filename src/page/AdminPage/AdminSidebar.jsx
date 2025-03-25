import { Home, Users, Store, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { persistor } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menu = [
    { label: "Quản lý", icon: Home, path: "/admin" },
    { label: "Người dùng", icon: Users, path: "/admin/users" },
    { label: "Cửa hàng", icon: Store, path: "/admin/stores" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white border-r shadow-sm flex flex-col">
      <div className="p-4 font-bold text-xl border-b">ADMIN PANEL</div>
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <Link
            to={item.path}
            key={item.label}
            className="flex items-center gap-3 p-2 rounded hover:bg-blue-100 transition text-gray-700"
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="p-4 text-red-600 flex items-center gap-2 border-t hover:bg-red-50"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
