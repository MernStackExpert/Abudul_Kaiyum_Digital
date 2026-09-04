import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Hexagon, Zap, ArrowUp } from "lucide-react";
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaApple,
  FaGooglePlay,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { useApp } from "../../context/AppContext";

export default function Footer() {
  const { t, lang } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#E5E7EB] dark:bg-[#111827] pt-20 mt-20 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[99%]">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-[60px] md:h-[100px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C480,0 960,0 1440,120 L1440,120 L0,120 Z"
            className="fill-[#E5E7EB] dark:fill-[#111827] transition-colors duration-300"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/"
              className="flex items-center gap-2 group mb-6 inline-flex"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
                <Hexagon size={26} className="absolute z-10" />
                <Zap size={12} className="absolute z-20 fill-current" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                AK{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Digital
                </span>
              </span>
            </Link>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {t.footer.description}
                </motion.span>
              </AnimatePresence>
            </p>

            <div className="flex items-center gap-3">
              {[FaInstagram, FaFacebookF, FaYoutube, FaTiktok].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-300"
                  >
                    <Icon size={14} />
                  </a>
                ),
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {t.footer.importantLinks}
                </motion.span>
              </AnimatePresence>
            </h3>
            <ul className="grid grid-cols-1 gap-3">
              {t.footer.links.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={lang}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {link.title}
                      </motion.span>
                    </AnimatePresence>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {t.footer.contactUs}
                </motion.span>
              </AnimatePresence>
            </h3>
            <ul className="flex flex-col gap-4">
              {[
                { icon: FaPhoneAlt, text: t.footer.contact.phone1 },
                { icon: FaPhoneAlt, text: t.footer.contact.phone2 },
                { icon: FaEnvelope, text: t.footer.contact.email },
                { icon: FaMapMarkerAlt, text: t.footer.contact.address },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0">
                    <item.icon
                      size={12}
                      className="text-gray-600 dark:text-gray-400"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1.5">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={lang}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {item.text}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {t.footer.downloadApp}
                </motion.span>
              </AnimatePresence>
            </h3>

            <div className="flex gap-3 mb-8">
              <button className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <FaApple size={24} />
                <div className="text-left">
                  <p className="text-[9px] uppercase leading-none mb-0.5">
                    Download on the
                  </p>
                  <p className="text-sm font-bold leading-none">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                <FaGooglePlay size={20} />
                <div className="text-left">
                  <p className="text-[9px] uppercase leading-none mb-0.5">
                    Get it on
                  </p>
                  <p className="text-sm font-bold leading-none">Google Play</p>
                </div>
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#006A4E] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaCheckCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={lang}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {t.footer.trustBadge1}
                      </motion.span>
                    </AnimatePresence>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={lang}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {t.footer.trustBadge2}
                      </motion.span>
                    </AnimatePresence>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaShieldAlt size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={lang}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {t.footer.taxBadge}
                      </motion.span>
                    </AnimatePresence>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={lang}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {t.footer.taxNum}
                      </motion.span>
                    </AnimatePresence>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["bKash", "Nagad", "Visa", "MasterCard"].map((method, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-xs font-bold text-gray-700 dark:text-gray-300 shadow-sm"
                >
                  {method}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-800 relative">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={lang}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {t.footer.rights}
              </motion.span>
            </AnimatePresence>
          </p>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-400">
              {lang === "en" ? "English" : "বাংলা"}
            </span>
            <span className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-400">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {t.footer.currency}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </div>

        <button
          onClick={scrollToTop}
          className="absolute right-4 md:right-8 -top-6 w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 hover:border-blue-500 transition-all duration-300 shadow-lg cursor-pointer"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
}
