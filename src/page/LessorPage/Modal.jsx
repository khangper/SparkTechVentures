import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter product name"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter price"
          />
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
