import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Edit } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import DigitalServiceForm from "./DigitalServiceForm";
import AccountServiceForm from "./AccountServiceForm";

export default function EditServiceModal({
  isOpen,
  onClose,
  onSuccess,
  service,
}) {
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

  if (!isOpen || !service) return null;

  const isDigital = service.serviceType === "digital-service";

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
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                <Edit size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Edit Service
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {isDigital ? (
              <DigitalServiceForm
                onSubmit={handleApiSubmit}
                onCancel={onClose}
                categories={categories}
                initialData={service}
              />
            ) : (
              <AccountServiceForm
                onSubmit={handleApiSubmit}
                onCancel={onClose}
                categories={categories}
                initialData={service}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
