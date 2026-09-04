import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, Compass } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function NotFound() {
  const { t, lang } = useApp();

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-white dark:bg-gray-950 overflow-hidden px-4 md:px-6">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="w-[20rem] md:w-[40rem] h-[20rem] md:h-[40rem] bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-3xl absolute"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.3, 0.1] }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
            delay: 4,
          }}
          className="w-[25rem] md:w-[45rem] h-[25rem] md:h-[45rem] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl absolute"
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="relative flex justify-center items-center mb-8"
        >
          <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 drop-shadow-sm select-none">
            4
          </h1>
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-24 h-24 md:w-40 md:h-40 mx-2 md:mx-6 rounded-full bg-gradient-to-tr from-blue-100 to-purple-50 dark:from-blue-900/40 dark:to-purple-900/40 border border-white/50 dark:border-gray-700/50 shadow-2xl flex items-center justify-center backdrop-blur-md"
          >
            <Compass
              className="w-12 h-12 md:w-20 md:h-20 text-blue-600 dark:text-blue-400"
              strokeWidth={1.5}
            />
          </motion.div>
          <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 drop-shadow-sm select-none">
            4
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={lang}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {t.notFound.title}
            </motion.span>
          </AnimatePresence>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-10 font-medium"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={lang}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {t.notFound.subtitle}
            </motion.span>
          </AnimatePresence>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow"
            >
              <Home size={20} />
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {t.notFound.btnText}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
