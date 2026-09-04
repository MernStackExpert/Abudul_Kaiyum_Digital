import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  MessageCircle,
  Globe,
  Briefcase,
  Tag,
  DollarSign,
  Calendar,
  List,
} from "lucide-react";

export default function ProviderDetailsModal({ isOpen, onClose, provider }) {
  if (!isOpen || !provider) return null;

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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Provider Profile
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0 border-4 border-white dark:border-gray-700 shadow-lg">
                {provider.image ? (
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={48} className="text-gray-400" />
                )}
              </div>

              <div className="flex-1 text-center sm:text-left w-full pt-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {provider.name}
                </h2>
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${provider.status === "active" ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400" : provider.status === "banned" ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"}`}
                >
                  {provider.status.toUpperCase()}
                </span>

                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
                  {provider.whatsapp && (
                    <a
                      href={`https://wa.me/${provider.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      <MessageCircle size={16} /> WhatsApp
                    </a>
                  )}
                  {provider.phone && (
                    <a
                      href={`tel:${provider.phone}`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      <Phone size={16} /> Call
                    </a>
                  )}
                  {provider.facebook && (
                    <a
                      href={provider.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-sm font-medium transition-colors"
                    >
                      <Globe size={16} /> Profile
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 mt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Tag size={18} />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    Category
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {provider.category || "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                  <List size={18} />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    Values
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {provider.value || "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                  <Briefcase size={18} />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    Service Area
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {provider.service || "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                  <DollarSign size={18} />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    Avg. Pricing
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {provider.price ? `${provider.price} BDT` : "Negotiable"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    Joined At
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {new Date(provider.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
