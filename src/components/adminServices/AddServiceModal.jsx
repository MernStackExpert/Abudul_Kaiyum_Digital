import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MonitorSmartphone, MonitorPlay } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import DigitalServiceForm from "./DigitalServiceForm";
import AccountServiceForm from "./AccountServiceForm";

export default function AddServiceModal({ isOpen, onClose, onSuccess }) {
  const [type, setType] = useState("digital");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const res = await api.get("/categories");
          if (res.data?.data) {
            setCategories(res.data.data);
          }
        } catch (error) {
          console.error("Categories load failed");
        }
      };
      fetchCategories();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApiSubmit = async (payload, method, endpoint) => {
    try {
      const response = await api[method](endpoint, payload);
      if (response.data.success) {
        toast.success(response.data.message || "Success!");
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col h-[90vh] border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shrink-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Add New Service
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex p-4 gap-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 justify-center shrink-0">
            <button
              onClick={() => setType("digital")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all ${type === "digital" ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
            >
              <MonitorSmartphone size={18} /> Digital Service
            </button>
            <button
              onClick={() => setType("account")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all ${type === "account" ? "bg-purple-600 text-white shadow-md" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
            >
              <MonitorPlay size={18} /> Account Buy/Sell
            </button>
          </div>

          <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {type === "digital" ? (
              <DigitalServiceForm
                onSubmit={handleApiSubmit}
                onCancel={onClose}
                categories={categories}
              />
            ) : (
              <AccountServiceForm
                onSubmit={handleApiSubmit}
                onCancel={onClose}
                categories={categories}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
