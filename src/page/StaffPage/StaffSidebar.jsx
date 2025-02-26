import React, { useState } from "react";
import {
  Home,
  Users,
  Settings,
  HelpCircle,
  Menu,
  ChevronRight,
  Package,
  Store,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";

const StaffSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const { username, email, picture } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();

    navigate("/login");
  };

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const menuItems = [
    { id: "home", icon: Home, label: "Home", path: "/lessor" },
    {
      id: "products",
      icon: Package,
      label: "Products",
      submenu: [
        { id: "product-list", label: "Product List", path: "/products" },
        { id: "product-categories", label: "Categories", path: "/categories" },
        { id: "product-inventory", label: "Inventory", path: "/inventory" },
      ],
    },
    // {
    //   id: "stores",
    //   icon: Store,
    //   label: "Stores",
    //   submenu: [
    //     // { id: "store-list", label: "Store List", path: "/stores" },
    //     // { id: "store-analytics", label: "Analytics", path: "/store-analytics" },
    //     { id: "add-store", label: "Add Store", path: "/lessor/add-by-store" },
    //   ],
    // },
    { id: "users", icon: Users, label: "Users", path: "/users" },
    { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
    { id: "help", icon: HelpCircle, label: "Help", path: "/help" },
  ];

  return (
    <div
      className={`relative min-h-screen bg-gray-900 text-white transition-[width] duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-gray-800 rounded-full p-1 hover:bg-gray-700 transition-colors duration-200 z-50"
      >
        <ChevronRight
          size={20}
          className={`transform transition-transform duration-300 ${
            isCollapsed ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>
      <div className="flex flex-col h-screen">
        <div className="flex items-center p-4 border-b border-gray-800">
          <Menu size={24} className="flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-2 font-semibold text-xl whitespace-nowrap">
              Logo
            </span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <nav className="mt-6">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.submenu ? (
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className={`flex items-center w-full p-4 hover:bg-gray-800 transition-colors duration-200  ${
                      openDropdowns.includes(item.id) ? "bg-gray-800" : ""
                    } ${isCollapsed ? "justify-center" : ""}`}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {!isCollapsed && (
                      <div className="flex items-center justify-between flex-1 ml-4">
                        <span className="whitespace-nowrap">{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transform transition-transform duration-200 ${
                            openDropdowns.includes(item.id)
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                        />
                      </div>
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center w-full p-4 hover:bg-gray-800 transition-colors duration-200 no-underline text-white ${
                      activeItem === item.id ? "bg-gray-800" : ""
                    } ${isCollapsed ? "justify-center" : ""}`}
                    onClick={() => setActiveItem(item.id)}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-4 whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                  </Link>
                )}

                {/* Submenu */}
                {item.submenu &&
                  !isCollapsed &&
                  openDropdowns.includes(item.id) && (
                    <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-48">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className={`w-full pl-12 pr-4 py-2 text-sm hover:bg-gray-800 transition-colors duration-200 flex items-center text-gray-300 hover:text-white no-underline ${
                            activeItem === subItem.id ? "bg-gray-800" : ""
                          }`}
                          onClick={() => setActiveItem(subItem.id)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </nav>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <div className="mt-auto w-full border-t border-gray-800">
            <div className="p-4 flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <img
                  src={picture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              <div className="ml-3">
                <p className="text-sm font-medium">{username}</p>
                <p className="text-xs text-gray-400">{email}</p>
              </div>
              {isOpen && (
                <div className="absolute -bottom-2 left-16 mb-2 w-36 bg-white rounded-md shadow-xl py-1 ring-1 ring-black/5 backdrop-blur-sm">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-1 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-3 h-3 mr-2" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffSidebar;
