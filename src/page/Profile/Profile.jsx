import React from "react";
import { User, Mail, Phone, MapPin, Cake, Store, Star } from "lucide-react";

const Profile = () => {
  const userData = {
    storeId: 6,
    username: "duylessor",
    fullName: "Phương Duy",
    gender: 0,
    email: "tonyluong1910@gmail.com",
    phone: "0399191045",
    address: "B95, Đường 50",
    dateOfBirth: "2003-10-19",
    picture:
      "https://firebasestorage.googleapis.com/v0/b/marinepath-56521.appspot.com/o/male.png?alt=media&token=6f3a8425-e611-4f17-b690-08fd7b465219",
    role: "LESSOR",
    storeName: null,
  };

  // Format date of birth
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row gap-6 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Avatar and basic info section */}
        <div className="flex flex-col items-center space-y-4 p-6 bg-blue-50 rounded-lg">
          <div className="relative">
            <img
              src={userData.picture}
              alt={userData.fullName}
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full">
              <Star size={20} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {userData.fullName}
          </h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <User size={16} />
            <span>{userData.username}</span>
          </div>
          <div className="px-4 py-2 bg-blue-500 text-white rounded-full font-medium">
            {userData.role}
          </div>
        </div>

        {/* Detailed information section */}
        <div className="flex-1 p-6 space-y-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Personal Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Mail size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-700">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Phone size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-700">{userData.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <MapPin size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-700">{userData.address}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Cake size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-gray-700">
                  {formatDate(userData.dateOfBirth)}
                </p>
              </div>
            </div>
          </div>

          {userData.storeId && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Store Information
              </h2>
              <div className="mt-4 flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Store size={20} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Store ID</p>
                  <p className="text-gray-700">{userData.storeId}</p>
                </div>
              </div>
              {userData.storeName && (
                <div className="mt-4 flex items-center space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">Store Name</p>
                    <p className="text-gray-700">
                      {userData.storeName || "Not updated yet"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex space-x-4 mt-6">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Edit Profile
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
