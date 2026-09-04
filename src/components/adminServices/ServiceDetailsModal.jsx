import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Layers,
  CheckCircle,
  ExternalLink,
  Users,
  ShieldCheck,
  Video,
} from "lucide-react";

export default function ServiceDetailsModal({ isOpen, onClose, service }) {
  if (!isOpen || !service) return null;

  const getSafeText = (field) => {
    if (!field) return "";
    if (typeof field === "object") return field.en || field.bn || "";
    return String(field);
  };

  const title = getSafeText(service.title);
  const description = getSafeText(service.description);
  const deliveryTime = getSafeText(service.deliveryTime);
  const categoryText = getSafeText(service.category);
  const isDigital = service.serviceType === "digital-service";

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
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 shrink-0 bg-gray-50 dark:bg-gray-900/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Service Details
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-full transition-colors cursor-pointer border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-48 h-48 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700 shadow-sm">
                {service.img ? (
                  <img
                    src={service.img}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Layers size={48} className="text-gray-400" />
                )}
              </div>
              <div className="flex-1 w-full">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {title}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                    {categoryText}
                  </span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-bold">
                    {service.price} BDT
                  </span>
                  {isDigital && deliveryTime && (
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-xs font-bold">
                      Delivery: {deliveryTime}
                    </span>
                  )}
                  {!isDigital && service.isMonetized && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-xs font-bold">
                      <ShieldCheck size={14} /> Monetized
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                  {description}
                </p>
              </div>
            </div>

            {!isDigital && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-purple-50 dark:bg-purple-900/10 p-5 rounded-2xl border border-purple-100 dark:border-purple-900/30">
                {service.chanelName && (
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Channel / Page Name
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {service.chanelName}
                    </span>
                  </div>
                )}
                {service.followers && (
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Followers / Subscribers
                    </span>
                    <span className="flex items-center gap-1 text-gray-900 dark:text-white font-medium">
                      <Users size={16} className="text-purple-500" />{" "}
                      {service.followers}
                    </span>
                  </div>
                )}
                {service.accountLink && (
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Account Link
                    </span>
                    <a
                      href={service.accountLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
                    >
                      <ExternalLink size={14} /> View Account
                    </a>
                  </div>
                )}
              </div>
            )}

            {service.videoLink && (
              <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100 dark:border-red-900/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                    <Video size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      Demo / Review Video
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Watch the detailed video representation
                    </p>
                  </div>
                </div>
                <a
                  href={service.videoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Watch Video
                </a>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.keyFeatures?.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    {service.keyFeatures.map((feature, idx) => {
                      const featureText = getSafeText(feature);
                      return (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <CheckCircle
                            size={18}
                            className="text-green-500 shrink-0"
                          />
                          <span>{featureText}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {service.media?.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Media Gallery
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {service.media.map((url, idx) => (
                      <div
                        key={idx}
                        className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                      >
                        <img
                          src={url}
                          alt={`Media ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div>
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Created At
                </span>
                <span className="text-gray-900 dark:text-gray-300 font-medium">
                  {new Date(service.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Updated At
                </span>
                <span className="text-gray-900 dark:text-gray-300 font-medium">
                  {new Date(service.updatedAt).toLocaleDateString()}
                </span>
              </div>
              {isDigital && service.serialId && (
                <div>
                  <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    Serial ID
                  </span>
                  <span className="text-gray-900 dark:text-gray-300 font-medium">
                    #{service.serialId}
                  </span>
                </div>
              )}
              {isDigital && service.icon && (
                <div>
                  <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    Icon Name
                  </span>
                  <span className="text-gray-900 dark:text-gray-300 font-medium">
                    {service.icon}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
