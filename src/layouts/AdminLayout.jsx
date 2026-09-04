import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Layers,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
  Moon,
  Sun,
  FolderTree,
  User,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, lang, toggleLang, logout, adminUser } = useApp();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <FolderTree size={20} />,
    },
    { name: "Services", path: "/admin/services", icon: <Layers size={20} /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={20} /> },
    { name: "Providers", path: "/admin/providers", icon: <Users size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
    { name: "Profile", path: "/admin/profile", icon: <User size={20} /> },
  ];

  const getInitials = (name) => {
    if (!name) return "AK";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 dark:bg-black text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-blue-400">AK Admin</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 rounded-lg hover:bg-slate-800 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={toggleLang}
              className="group relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all cursor-pointer border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-500/50"
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
              className="relative overflow-hidden flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all cursor-pointer border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-yellow-500/50"
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

            <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800 ml-2">
              {getInitials(adminUser?.name)}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-950 p-6 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
