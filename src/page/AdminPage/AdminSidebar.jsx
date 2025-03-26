import { Home, Users, Store, LogOut, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { persistor } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); 

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
            className={`flex items-center gap-3 p-2 rounded hover:bg-blue-100 transition text-gray-700 ${
              location.pathname === item.path
                ? "text-yellow-500"
                : "text-gray-700"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center justify-between w-full border-t">
        <button
          onClick={handleLogout}
          className="flex-1 p-4 text-red-600 flex items-center gap-2 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>

        <Link to={`/admin/profile`}>
          <div className="p-4 text-blue-300 hover:bg-blue-50 hover:text-blue-500 transition-colors border-l border-gray-300 cursor-pointer">
            <User className="w-6 h-6" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
