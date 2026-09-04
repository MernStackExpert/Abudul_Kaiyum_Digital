import { motion, AnimatePresence } from "framer-motion";
import { FaYoutube, FaFacebook, FaTiktok, FaArrowRight } from "react-icons/fa";
import { BsFillGridFill, BsStars } from "react-icons/bs";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";

export default function ServicesSection() {
  const { t, lang } = useApp();

  const getIcon = (iconName) => {
    switch (iconName) {
      case "youtube":
        return <FaYoutube size={32} className="text-red-500" />;
      case "facebook":
        return <FaFacebook size={32} className="text-blue-600" />;
      case "tiktok":
        return <FaTiktok size={28} className="text-gray-900 dark:text-white" />;
      case "all":
        return <BsFillGridFill size={28} className="text-purple-500" />;
      default:
        return <BsStars size={28} className="text-amber-500" />;
    }
  };

  return (
    <section className="relative w-full py-20 md:py-28 bg-gray-50 dark:bg-gray-950/50 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-800 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50 mb-6"
          >
            <BsStars size={16} className="text-amber-600 dark:text-amber-400" />
            <AnimatePresence mode="wait">
              <motion.span
                key={lang}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider"
              >
                {t.services.tag}
              </motion.span>
            </AnimatePresence>
            <BsStars size={16} className="text-amber-600 dark:text-amber-400" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h2
              key={lang}
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight"
            >
              {t.services.title}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {t.services.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/category/${item.id}`}
                className="block h-full outline-none"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative h-full p-6 md:p-8 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/10 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-300 group overflow-hidden flex flex-col"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent dark:from-blue-900/20 rounded-bl-[4rem] opacity-50 group-hover:opacity-100 transition-opacity" />

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                    className="absolute top-5 right-5 md:top-6 md:right-6 px-3 py-1.5 rounded-xl bg-amber-400 dark:bg-amber-500 text-black font-black text-xs md:text-sm shadow-lg shadow-amber-500/30 border border-amber-300 dark:border-amber-400 z-10"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={lang}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {item.badge}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>

                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                    {getIcon(item.icon)}
                  </div>

                  <div className="relative z-10 flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={lang}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 5 }}
                        >
                          {item.title}
                        </motion.div>
                      </AnimatePresence>
                    </h3>
                    <p className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={lang}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {item.desc}
                        </motion.div>
                      </AnimatePresence>
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 mt-auto group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={lang}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {t.services.exploreBtn}
                      </motion.span>
                    </AnimatePresence>
                    <FaArrowRight
                      size={14}
                      className="group-hover:translate-x-2 transition-transform duration-300"
                    />
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
