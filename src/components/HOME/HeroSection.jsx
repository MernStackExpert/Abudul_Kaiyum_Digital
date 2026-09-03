import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Activity,
  Play,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";
import profileImg from "../../assets/profile.jpg";

export default function HeroSection() {
  const { t, lang } = useApp();

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -left-40 w-[30rem] h-[30rem] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50"
            >
              <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs md:text-sm font-bold text-blue-700 dark:text-blue-300"
                >
                  {t.hero.badge}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {t.hero.title1} <br className="hidden md:block" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    {t.hero.title2}
                  </span>
                </motion.div>
              </AnimatePresence>
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={lang}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed font-medium"
              >
                {t.hero.subtitle}
              </motion.p>
            </AnimatePresence>

            <div className="flex flex-row items-center justify-center lg:justify-start gap-3 md:gap-4 mt-4 w-full">
              <Link to="/services" className="w-1/2 sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-1.5 md:gap-2 px-2 py-3.5 md:px-8 md:py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs md:text-base shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
                >
                  <ShoppingBag
                    size={18}
                    className="hidden sm:block md:w-5 md:h-5"
                  />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={lang}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t.hero.cta1}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </Link>
              <Link to="/contact" className="w-1/2 sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-1.5 md:gap-2 px-2 py-3.5 md:px-8 md:py-4 rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-xs md:text-base border border-gray-200 dark:border-gray-800 shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={lang}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t.hero.cta2}
                    </motion.span>
                  </AnimatePresence>
                  <ArrowRight
                    size={18}
                    className="hidden sm:block md:w-5 md:h-5"
                  />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[320px] md:h-[500px] flex items-center justify-center w-full mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-[280px] md:max-w-md aspect-square bg-gradient-to-tr from-blue-100 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-[2.5rem] md:rounded-[3rem] border border-white/50 dark:border-gray-800/50 shadow-2xl flex items-center justify-center overflow-visible">
              <motion.div
                animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -left-4 md:top-10 md:-left-10 p-3 md:p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 z-20"
              >
                <Play className="text-red-500 fill-red-500 w-6 h-6 md:w-8 md:h-8" />
              </motion.div>

              <motion.div
                animate={{ y: [15, -15, 15], rotate: [5, -5, 5] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -right-4 md:bottom-20 md:-right-10 p-3 md:p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 z-20"
              >
                <TrendingUp className="text-blue-500 w-6 h-6 md:w-8 md:h-8" />
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="z-10 text-center p-6 md:p-8 bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] border border-white/60 dark:border-gray-700/50 shadow-2xl w-[85%] md:w-2/3"
              >
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-3 md:mb-4 border-4 border-white dark:border-gray-800 shadow-xl object-cover"
                />
                <h3 className="text-lg md:text-2xl font-black text-gray-900 dark:text-white">
                  Abdul Kaiyum
                </h3>
                <p className="text-[10px] md:text-sm font-bold text-blue-600 dark:text-blue-400 mt-1 md:mt-2 tracking-wide uppercase">
                  Digital Expert
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 md:mt-24 grid grid-cols-3 gap-2 md:gap-6"
        >
          {[
            { icon: Users, text: t.hero.stat1, desc: t.hero.stat1Desc },
            { icon: Activity, text: t.hero.stat2, desc: t.hero.stat2Desc },
            { icon: ShieldCheck, text: t.hero.stat3, desc: t.hero.stat3Desc },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="flex flex-col xl:flex-row items-center text-center xl:text-left gap-2 xl:gap-5 p-3 md:p-8 rounded-2xl md:rounded-3xl bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0">
                <stat.icon className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <div className="overflow-hidden w-full">
                <h4 className="text-[13px] md:text-3xl font-black text-gray-900 dark:text-white tracking-tight truncate">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lang}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {stat.text}
                    </motion.div>
                  </AnimatePresence>
                </h4>
                <p className="text-[9px] md:text-sm font-semibold text-gray-500 dark:text-gray-400 mt-0.5 md:mt-1 truncate">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lang}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {stat.desc}
                    </motion.div>
                  </AnimatePresence>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
