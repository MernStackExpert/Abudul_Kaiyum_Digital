import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, FolderTree } from "lucide-react";

export default function CategoryDetailsModal({ isOpen, onClose, category }) {
  if (!isOpen || !category) return null;

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
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                <FolderTree size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Category Details
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-32 h-32 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700 shadow-sm">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={40} className="text-gray-400" />
                )}
              </div>

              <div className="flex-1 text-center sm:text-left w-full">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h2>
                <div className="text-gray-500 dark:text-gray-400 font-medium mb-4 bg-gray-100 dark:bg-gray-800 inline-block px-3 py-1 rounded-lg">
                  /{category.slug}
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                  <span
                    className={`px-4 py-1.5 text-sm font-semibold rounded-full ${
                      category.serviceType === "digital-service"
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                    }`}
                  >
                    Type:{" "}
                    {category.serviceType === "digital-service"
                      ? "Digital Service"
                      : "Account Service"}
                  </span>

                  <span
                    className={`px-4 py-1.5 text-sm font-semibold rounded-full ${
                      category.status === "active"
                        ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    Status:{" "}
                    {category.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div>
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Created Date
                </span>
                <span className="text-gray-900 dark:text-gray-200 font-medium">
                  {new Date(category.createdAt).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Last Updated
                </span>
                <span className="text-gray-900 dark:text-gray-200 font-medium">
                  {new Date(category.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
