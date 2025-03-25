import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../../Context/api";
import { useNavigate } from "react-router-dom";

const LessorStore = () => {
  const { accountId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const [hasStore, setHasStore] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkStoreExist = async () => {
      try {
        const res = await api.get("/store");
        const stores = res.data.data || [];
  
        const existingStore = stores.find(
          (store) => store.accountId === accountId
        );
    
        
  
        if (existingStore) {
      
          
          setHasStore(true);
          setStoreData(existingStore);
        }
      } catch (err) {
        console.error("Error checking store existence:", err);
      } finally {
        setLoading(false);
      }
    };
  
    if (accountId) checkStoreExist();
  }, [accountId]);
  

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
  
      
      Object.keys(values).forEach(key => {
        if (key === 'storeImage' && values[key]) {
          formData.append('file', values[key]); 
        } else if (key === 'openingHours' || key === 'closingHours') {
          formData.append(key, values[key] + ":00");
        } else if (key !== 'storeImage') {
          formData.append(key, values[key]);
        }
      });
  
      const response = await api.post("store", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success("Store registration successful!");
      resetForm();
      setImagePreview(null);
      setTimeout(() => {
        navigate(`/lessor`);
      }, 1800);
    } catch (error) {
      toast.error("Failed to register store. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("storeImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      openingDay: "",
      openingHours: "",
      closingHours: "",
      // businessLicense: "",
      storeImage: null,
      accountId: accountId,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Store name is required"),
      address: Yup.string().required("Address is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number is not valid")
        .required("Phone number is required"),
      openingDay: Yup.date().required("Opening day is required"),
      openingHours: Yup.string().required("Opening hours are required"),
      closingHours: Yup.string().required("Closing hours are required"),
      // businessLicense: Yup.string().required("Business license is required"),
      storeImage: Yup.mixed().nullable()
    }),
    onSubmit: handleSubmit,
  });

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Checking your store status...</div>;
  }
  console.log(hasStore);
  
  if (hasStore) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-100"
        >
          <div className="text-center">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cửa Hàng Đã Đăng Ký</h2>
            <p className="text-gray-600 mb-6">
              Bạn đã đăng ký một cửa hàng với tài khoản này.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="mb-3">
                <span className="block text-sm font-medium text-gray-500">TÊN CỬA HÀNG</span>
                <span className="block text-lg font-semibold text-gray-800">{storeData.name}</span>
              </div>
              <div className="mb-3">
                <span className="block text-sm font-medium text-gray-500">TRẠNG THÁI</span>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  storeData.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                  storeData.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {storeData.status === 'ACTIVE' ? 'HOẠT ĐỘNG' : 
                   storeData.status === 'PENDING' ? 'ĐANG XỬ LÝ' : 'BỊ TỪ CHỐI'}
                </span>
              </div>
              {storeData.address && (
                <div>
                  <span className="block text-sm font-medium text-gray-500">ĐỊA CHỈ</span>
                  <span className="block text-gray-800">{storeData.address}</span>
                </div>
              )}
            </div>
            
            <button
              onClick={() => navigate("/lessor")}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Đến Trang Chủ
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
  

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 "
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-4 sm:p-6 shadow-lg rounded-xl w-full max-w-3xl border border-gray-100"
      >
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Store Registration
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Fill in the details to register your store
          </p>
        </div>

        <motion.form
          onSubmit={formik.handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter store name"
                {...formik.getFieldProps("name")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500 text-xs">{formik.errors.name}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                {...formik.getFieldProps("phone")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-500 text-xs">{formik.errors.phone}</p>
              ) : null}
            </div>
          </div>

          <div className="">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Enter store address"
                {...formik.getFieldProps("address")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {formik.touched.address && formik.errors.address ? (
                <p className="text-red-500 text-xs">{formik.errors.address}</p>
              ) : null}
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business License Code
              </label>
              <input
                type="text"
                name="businessLicense"
                placeholder="Enter business license code"
                {...formik.getFieldProps("businessLicense")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {formik.touched.businessLicense && formik.errors.businessLicense ? (
                <p className="text-red-500 text-xs">
                  {formik.errors.businessLicense}
                </p>
              ) : null}
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Day
              </label>
              <input
                type="date"
                name="openingDay"
                {...formik.getFieldProps("openingDay")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {formik.touched.openingDay && formik.errors.openingDay ? (
                <p className="text-red-500 text-xs">
                  {formik.errors.openingDay}
                </p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Hours
              </label>
              <input
                type="time"
                name="openingHours"
                {...formik.getFieldProps("openingHours")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {formik.touched.openingHours && formik.errors.openingHours ? (
                <p className="text-red-500 text-xs">
                  {formik.errors.openingHours}
                </p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Closing Hours
              </label>
              <input
                type="time"
                name="closingHours"
                {...formik.getFieldProps("closingHours")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {formik.touched.closingHours && formik.errors.closingHours ? (
                <p className="text-red-500 text-xs">
                  {formik.errors.closingHours}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Image
            </label>
            <div className="flex items-center">
              <input
                id="storeImage"
                name="storeImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="storeImage"
                className="cursor-pointer px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Select Image
              </label>
              <span className="ml-2 text-xs text-gray-500 truncate max-w-[150px]">
                {formik.values.storeImage ? formik.values.storeImage.name : "No file selected"}
              </span>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-10 w-10 object-cover rounded-md ml-2"
                />
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Registering..." : "Register Store"}
            </button>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default LessorStore;
