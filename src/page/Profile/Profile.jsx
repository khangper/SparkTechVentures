import React from "react";
import { User, Mail, Phone, MapPin, Cake, Store, Star } from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const user = useSelector((state) => state.auth);
  console.log(user);

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50">
      <div className="flex flex-col md:flex-row gap-6 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Avatar and basic info section */}
        <div className="flex flex-col items-center space-y-4 p-6 bg-amber-100 rounded-lg">
          <div className="relative">
            <img
              src={user.picture}
              alt={user.fullName}
              className="w-40 h-40 rounded-full object-cover border-4 border-amber-500"
            />
            <div className="absolute bottom-0 right-0 bg-amber-500 text-white p-2 rounded-full">
              <Star size={20} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{user.fullName}</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <User size={16} />
            <span>{user.username}</span>
          </div>
          <div className="px-4 py-2 bg-amber-500 text-white rounded-full font-medium">
            {user.role}
          </div>
        </div>

        {/* Detailed information section */}
        <div className="flex-1 p-6 space-y-6 bg-amber-50 rounded-lg">
          <h2 className="text-xl font-semibold text-amber-800 border-b border-amber-200 pb-2">
            Personal Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-200 rounded-full">
                <Mail size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-amber-600">Email</p>
                <p className="text-gray-700">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-200 rounded-full">
                <Phone size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-amber-600">Phone</p>
                <p className="text-gray-700">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-200 rounded-full">
                <MapPin size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-amber-600">Address</p>
                <p className="text-gray-700">{user.address}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-200 rounded-full">
                <Cake size={20} className="text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-amber-600">Date of Birth</p>
                <p className="text-gray-700">{formatDate(user.dateOfBirth)}</p>
              </div>
            </div>
          </div>

          {user.storeId && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-amber-800 border-b border-amber-200 pb-2">
                Store Information
              </h2>
              <div className="mt-4 flex items-center space-x-4">
                <div className="p-3 bg-amber-200 rounded-full">
                  <Store size={20} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-amber-600">Store ID</p>
                  <p className="text-gray-700">{user.storeId}</p>
                </div>
              </div>
              {user.storeName && (
                <div className="mt-4 flex items-center space-x-4 pl-12">
                  <div>
                    <p className="text-sm text-amber-600">Store Name</p>
                    <p className="text-gray-700">
                      {user.storeName || "Not updated yet"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex space-x-4 mt-6">
            <button className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
              Edit Profile
            </button>
            <button className="px-6 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-100 transition">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
