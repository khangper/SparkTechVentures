import React, { useState } from "react";
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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formattedValues = {
        ...values,
        openingHours: values.openingHours + ":00",
        closingHours: values.closingHours + ":00",
      };
      const response = await api.post("store", formattedValues);
      toast.success("Store registration successful!");

      resetForm();

      setTimeout(() => {
        navigate(`/lessor`);
      }, 1800);
    } catch (error) {
      toast("Failed to register store. Please try again.");
    } finally {
      setSubmitting(false);
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
      businessLicense: "",
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
      businessLicense: Yup.string().required("Business license is required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 shadow-lg rounded-xl w-full max-w-3xl border border-gray-100"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Store Registration
          </h2>
          <p className="text-gray-600 mt-2">
            Fill in the details to register your store
          </p>
        </div>

        <motion.form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter store name"
                {...formik.getFieldProps("name")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter store address"
              {...formik.getFieldProps("address")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {formik.touched.address && formik.errors.address ? (
              <p className="text-red-500 text-sm">{formik.errors.address}</p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business License Code
            </label>
            <input
              type="text"
              name="businessLicense"
              placeholder="Enter business license code"
              {...formik.getFieldProps("businessLicense")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {formik.touched.businessLicense && formik.errors.businessLicense ? (
              <p className="text-red-500 text-sm">
                {formik.errors.businessLicense}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opening Day
              </label>
              <input
                type="date"
                name="openingDay"
                {...formik.getFieldProps("openingDay")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {formik.touched.openingDay && formik.errors.openingDay ? (
                <p className="text-red-500 text-sm">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {formik.touched.openingHours && formik.errors.openingHours ? (
                <p className="text-red-500 text-sm">
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
                name="openingHours"
                {...formik.getFieldProps("closingHours")}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {formik.touched.closingHours && formik.errors.closingHours ? (
                <p className="text-red-500 text-sm">
                  {formik.errors.closingHours}
                </p>
              ) : null}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
