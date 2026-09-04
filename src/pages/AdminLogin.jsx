import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Hexagon, Zap, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";
import { useApp } from "../context/AppContext";

export default function AdminLogin() {
  const { t, theme, login } = useApp();
  const loginT = t.adminLogin || {
    title: "Admin Login",
    subtitle: "Sign in to manage your digital empire",
    email: "Email Address",
    password: "Password",
    btnText: "Sign In",
    loading: "Authenticating...",
    success: "Welcome back, Admin!",
    error: "Invalid email or password",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    setLoading(true);
    try {
      const response = await api.post("/auth/login", formData);
      if (response.data.success) {
        login(response.data.user, response.data.token);
        toast.success(loginT.success || "Login successful!");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || loginT.error || "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-500 ${theme}`}
    >
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800 p-8 sm:p-10">
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/30">
              <Hexagon size={40} className="absolute z-10" />
              <Zap size={20} className="absolute z-20 fill-current" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
              {loginT.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {loginT.subtitle}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {loginT.email}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white transition-all placeholder:text-gray-400"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {loginT.password}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    <span>{loginT.loading}</span>
                  </>
                ) : (
                  <span>{loginT.btnText}</span>
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
