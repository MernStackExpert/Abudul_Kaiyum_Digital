import { motion, AnimatePresence } from "framer-motion";
import {
  FaYoutube,
  FaFacebook,
  FaThumbsUp,
  FaCheckCircle,
  FaEnvelope,
  FaGoogle,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";

export default function TopServicesSection() {
  const { t, lang } = useApp();

  const getIcon = (iconName) => {
    switch (iconName) {
      case "youtube":
        return (
          <FaYoutube
            size={24}
            className="text-red-500 group-hover:scale-110 transition-transform duration-500"
          />
        );
      case "facebook":
        return (
          <FaFacebook
            size={24}
            className="text-blue-600 group-hover:scale-110 transition-transform duration-500"
          />
        );
      case "engagement":
        return (
          <FaThumbsUp
            size={22}
            className="text-pink-500 group-hover:scale-110 transition-transform duration-500"
          />
        );
      case "verify":
        return (
          <FaCheckCircle
            size={22}
            className="text-blue-500 group-hover:scale-110 transition-transform duration-500"
          />
        );
      case "gmail":
        return (
          <FaEnvelope
            size={22}
            className="text-red-400 group-hover:scale-110 transition-transform duration-500"
          />
        );
      case "adsense":
        return (
          <FaGoogle
            size={22}
            className="text-yellow-500 group-hover:scale-110 transition-transform duration-500"
          />
        );
      default:
        return (
          <BsLightningChargeFill
            size={22}
            className="text-amber-500 group-hover:scale-110 transition-transform duration-500"
          />
        );
    }
  };

  return (
    <section className="relative w-full pt-16 pb-16 md:pt-24 md:pb-20 bg-gray-50/50 dark:bg-gray-950/50 overflow-hidden">
      <div className="absolute inset-0 z-0 flex items-start justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="w-[20rem] md:w-[40rem] h-[20rem] md:h-[40rem] bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-3xl absolute -top-20"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-6">
          <div className="text-center md:text-left w-full md:w-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 mb-6 shadow-sm"
            >
              <BsLightningChargeFill
                size={16}
                className="text-blue-600 dark:text-blue-400 animate-pulse"
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-sm font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider"
                >
                  {t.topServices.tag}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.h1
                key={lang}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight"
              >
                {t.topServices.title}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              delay: 0.2,
            }}
            className="shrink-0"
          >
            <Link
              to="/services"
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaPlus
                size={16}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {lang === "en" ? "View All Services" : "সব সার্ভিস দেখুন"}
                </motion.span>
              </AnimatePresence>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-xl mx-auto md:mx-0 mb-12"
        >
          <div className="relative w-full group">
            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder={
                lang === "en"
                  ? "Search for services..."
                  : "আপনার প্রয়োজনীয় সার্ভিস খুঁজুন..."
              }
              className="w-full pl-12 pr-4 py-3.5 md:py-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md focus:shadow-md transition-all text-sm md:text-base font-medium"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {t.topServices.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
            >
              <Link
                to={`/service/${item.id}`}
                className="block outline-none group relative z-0"
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative rounded-2xl md:rounded-[1.25rem] overflow-hidden p-[2px] shadow-sm hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <div className="absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(transparent_0deg,transparent_90deg,#3b82f6_180deg,#8b5cf6_270deg,transparent_360deg)] animate-[spin_3s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                  <div className="relative z-10 flex items-center justify-between p-4 md:p-6 rounded-[14px] md:rounded-[18px] bg-white dark:bg-gray-900 h-full w-full">
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-inner">
                        <div className="absolute -top-2 -left-2 w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-black flex items-center justify-center text-[10px] md:text-xs font-black shadow-lg border-2 border-white dark:border-gray-900 z-10">
                          {item.serial}
                        </div>
                        {getIcon(item.icon)}
                      </div>

                      <h3 className="text-sm md:text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={lang}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 5 }}
                            className="block"
                          >
                            {item.title}
                          </motion.span>
                        </AnimatePresence>
                      </h3>
                    </div>

                    <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-[11px] md:text-sm font-bold text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={lang}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          {item.price}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
