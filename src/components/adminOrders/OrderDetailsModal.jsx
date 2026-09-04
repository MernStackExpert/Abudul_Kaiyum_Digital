import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Mail,
  MessageSquare,
  Layers,
  DollarSign,
  Calendar,
  Tag,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function OrderDetailsModal({ isOpen, onClose, order }) {
  const { lang } = useApp();

  if (!isOpen || !order) return null;

  const getSafeText = (field) => {
    if (!field) return "N/A";
    if (typeof field === "object")
      return field[lang] || field.en || field.bn || "N/A";
    return String(field);
  };

  const serviceTitle = getSafeText(order.serviceTitle);
  const serviceCategory = getSafeText(order.serviceCategory);

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
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shrink-0">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Order Details
              </h3>
              <p className="text-xs text-gray-500 mt-1">ID: {order._id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <User size={16} className="text-blue-500" /> Customer
                  Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-semibold">
                      {order.customerInfo?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">WhatsApp:</span>
                    <span className="font-semibold">
                      {order.customerInfo?.whatsapp || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-semibold">
                      {order.customerInfo?.phone || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-semibold">
                      {order.customerInfo?.email || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <Layers size={16} className="text-purple-500" /> Service
                  Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service:</span>
                    <span className="font-semibold text-right max-w-[150px] truncate">
                      {serviceTitle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-semibold">{serviceCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-bold text-green-600">
                      {order.price} BDT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-semibold">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
                <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                  Order Status
                </span>
                <span className="px-3 py-1 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase shadow-sm">
                  {order.status}
                </span>
              </div>
              <div className="flex-1 bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/30 flex items-center justify-between">
                <span className="text-sm font-semibold text-green-800 dark:text-green-300">
                  Payment Status
                </span>
                <span className="px-3 py-1 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 rounded-full text-xs font-bold uppercase shadow-sm">
                  {order.paymentStatus}
                </span>
              </div>
            </div>

            {order.customerInfo?.message && (
              <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                  <MessageSquare size={16} className="text-orange-500" />{" "}
                  Customer Message
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                  {order.customerInfo.message}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
