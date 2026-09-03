import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  Home,
  Briefcase,
  Phone,
  Globe,
  Moon,
  Sun,
  Hexagon,
  Zap,
  X,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang } = useApp();
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hiddenBottomNav, setHiddenBottomNav] = useState(false);
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 50) {
      setHiddenBottomNav(true);
    } else {
      setHiddenBottomNav(false);
    }
  });

  const navLinks = [
    { id: 1, path: "/", en: "Home", bn: "হোম", icon: Home },
    {
      id: 2,
      path: "/services",
      en: "Services",
      bn: "সার্ভিস",
      icon: Briefcase,
    },
    { id: 3, path: "/contact", en: "Contact", bn: "যোগাযোগ", icon: Phone },
  ];

  const announcementMsg =
    lang === "en"
      ? "🔥 Special Offer! 20% off on Facebook & YouTube Ads! Order Now! 🔥"
      : "🔥 স্পেশাল অফার! ফেসবুক এবং ইউটিউব অ্যাডস সার্ভিসে ২০% ছাড়! আজই অর্ডার করুন! 🔥";

  return (
    <>
      <AnimatePresence>
        {isAnnouncementActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full bg-slate-900 dark:bg-black text-amber-400 overflow-hidden flex items-center relative border-b border-amber-400/20"
          >
            <div className="w-full py-2.5 flex items-center">
              <motion.div
                className="whitespace-nowrap font-semibold text-sm px-4 tracking-wide"
                animate={{ x: ["100%", "-100%"] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={lang}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                  >
                    {announcementMsg}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>
            <button
              onClick={() => setIsAnnouncementActive(false)}
              className="absolute right-4 text-amber-400 hover:text-white bg-white/10 hover:bg-white/20 transition-colors rounded-full p-1.5 z-10 cursor-pointer"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
              <Hexagon size={28} className="absolute z-10" />
              <Zap size={14} className="absolute z-20 fill-current" />
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={lang}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white"
              >
                AK{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Digital
                </span>
              </motion.span>
            </AnimatePresence>
          </Link>

          <nav className="hidden md:flex items-center gap-2 p-1.5 bg-gray-100/80 dark:bg-gray-900/80 rounded-full border border-gray-200 dark:border-gray-800 shadow-inner">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 z-10 ${
                    isActive
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktopNavBubble"
                      className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full shadow-md z-[-1]"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={lang}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      {lang === "en" ? link.en : link.bn}
                    </motion.span>
                  </AnimatePresence>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="group relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-all cursor-pointer border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-blue-500/50"
            >
              <Globe
                size={18}
                className="group-hover:rotate-180 transition-transform duration-500"
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-bold block w-5 text-center"
                >
                  {lang === "en" ? "BN" : "EN"}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              onClick={toggleTheme}
              className="relative overflow-hidden flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-all cursor-pointer border border-gray-200 dark:border-gray-800 hover:shadow-md hover:border-yellow-500/50"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  {theme === "light" ? (
                    <Moon size={20} />
                  ) : (
                    <Sun size={20} className="text-yellow-400" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <motion.div
        variants={{
          visible: { y: 0, opacity: 1, scale: 1 },
          hidden: { y: 100, opacity: 0, scale: 0.9 },
        }}
        animate={hiddenBottomNav ? "hidden" : "visible"}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        className="md:hidden fixed bottom-5 left-5 right-5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-gray-200/50 dark:border-gray-800/50 flex justify-around items-center p-2 z-50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          return (
            <Link
              key={link.id}
              to={link.path}
              className="relative flex flex-col items-center justify-center p-2.5 w-16 h-16 rounded-2xl transition-colors z-10"
            >
              {isActive && (
                <motion.div
                  layoutId="mobileNavBubble"
                  className="absolute inset-0 bg-blue-100 dark:bg-blue-900/40 rounded-2xl z-[-1]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon
                size={24}
                className={`mb-1 transition-colors duration-300 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  className={`text-[10px] font-bold ${
                    isActive
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {lang === "en" ? link.en : link.bn}
                </motion.span>
              </AnimatePresence>
            </Link>
          );
        })}
      </motion.div>
    </>
  );
}
