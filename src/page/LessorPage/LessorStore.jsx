import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const LessorStore = () => {
  const { accountId } = useSelector((state) => state.auth);
  console.log(accountId);
  
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    openingDay: "",
    openingHours: "",
    closingHours: "",
    businessLicense: "",
    accountId: accountId,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const formattedData = {
      ...formData,
      openingHours: `${formData.openingHours}:00`, 
      closingHours: `${formData.closingHours}:00`, 
    };

    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        "http://localhost:5083/api/store",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage("Store registered successfully!");
        setFormData({
          name: "",
          address: "",
          phone: "",
          openingDay: "",
          openingHours: "",
          closingHours: "",
          businessLicense: "",
          accountId: accountId,
        });
      } else {
        setMessage("Failed to register store.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred while registering the store."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Register Store</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Store Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            name="openingDay"
            value={formData.openingDay}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="time"
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="time"
            name="closingHours"
            value={formData.closingHours}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="businessLicense"
            placeholder="Business License"
            value={formData.businessLicense}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LessorStore;
