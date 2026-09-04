import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { useApp } from "../../context/AppContext";

export default function TestimonialSection() {
  const { t, lang } = useApp();

  const duplicatedReviews = [
    ...t.testimonials.reviews,
    ...t.testimonials.reviews,
  ];

  return (
    <section className="relative w-full py-20 md:py-28 bg-gray-50/50 dark:bg-gray-950/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 mb-12 md:mb-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 mb-4"
          >
            <BsStars
              size={16}
              className="text-emerald-600 dark:text-emerald-400"
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={lang}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider"
              >
                {t.testimonials.tag}
              </motion.span>
            </AnimatePresence>
            <BsStars
              size={16}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h2
              key={lang}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight"
            >
              {t.testimonials.title}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col items-center">
        <div className="absolute left-0 top-0 w-20 md:w-40 h-full bg-gradient-to-r from-gray-50 dark:from-gray-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-20 md:w-40 h-full bg-gradient-to-l from-gray-50 dark:from-gray-950 to-transparent z-10 pointer-events-none" />

        <div className="flex w-full group">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            className="flex gap-6 px-3 group-hover:[animation-play-state:paused]"
          >
            {duplicatedReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="relative w-[300px] md:w-[400px] shrink-0 p-6 md:p-8 rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-all duration-300 group/card"
              >
                <div className="absolute top-6 right-6 opacity-10 group-hover/card:opacity-20 transition-opacity duration-300">
                  <FaQuoteLeft size={40} className="text-emerald-500" />
                </div>

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={18}
                      className={
                        i < review.rating
                          ? "text-amber-400"
                          : "text-gray-300 dark:text-gray-700"
                      }
                    />
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-8 font-medium h-24 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={lang}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      "{review.text}"
                    </motion.span>
                  </AnimatePresence>
                </p>

                <div className="flex items-center gap-4 border-t border-gray-100 dark:border-gray-800 pt-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={lang}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {review.name}
                        </motion.span>
                      </AnimatePresence>
                    </h4>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase mt-0.5">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={lang}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {review.role}
                        </motion.span>
                      </AnimatePresence>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
