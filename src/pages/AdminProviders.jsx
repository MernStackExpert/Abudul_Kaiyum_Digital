import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  UserCheck,
  UserX,
  UserMinus,
} from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";
import { useApp } from "../context/AppContext";
import ProviderModal from "../components/adminProviders/ProviderModal";
import ProviderDetailsModal from "../components/adminProviders/ProviderDetailsModal";

export default function AdminProviders() {
  const { theme, lang } = useApp();
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        const fetchParams = res.data?.data || res.data || [];
        setCategories(Array.isArray(fetchParams) ? fetchParams : []);
      })
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/providers?status=${activeTab}&category=${selectedCategory}&search=${search}`,
      );
      if (response.data.success) {
        setProviders(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to load providers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProviders();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search, activeTab, selectedCategory]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it!",
      background: theme === "dark" ? "#1f2937" : "#ffffff",
      color: theme === "dark" ? "#ffffff" : "#1f2937",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/providers/delete/${id}`);
          if (response.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Provider has been deleted.",
              icon: "success",
              background: theme === "dark" ? "#1f2937" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#1f2937",
            });
            fetchProviders();
          }
        } catch (error) {
          toast.error("Failed to delete provider");
        }
      }
    });
  };

  const tabs = [
    { id: "", label: "All Providers", icon: Users },
    { id: "active", label: "Active", icon: UserCheck },
    { id: "inactive", label: "Inactive", icon: UserMinus },
    { id: "banned", label: "Banned", icon: UserX },
  ];

  return (
    <div className="text-gray-900 dark:text-gray-100 flex flex-col h-[calc(100vh-6rem)] relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users size={28} className="text-blue-500" /> Providers
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage all your service providers and contacts
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSelectedProvider(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/30 cursor-pointer"
        >
          <Plus size={20} />
          <span>Add Provider</span>
        </motion.button>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeProviderTab"
                  className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                />
              )}
              <Icon size={18} className="relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4">
          <div className="relative max-w-md flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or whatsapp..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all dark:text-white"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-64 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => {
              const catName =
                typeof cat.title === "object"
                  ? cat.title?.[lang] || cat.title?.en
                  : cat.title || cat.name;
              const catValue =
                cat.slug ||
                cat.name ||
                (typeof cat.title === "object" ? cat.title?.en : cat.title) ||
                cat._id;
              return (
                <option key={cat._id || Math.random()} value={catValue}>
                  {catName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : providers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Users size={48} className="mb-4 opacity-20" />
              <p>No providers found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800/80 backdrop-blur-md z-10">
                <tr className="text-sm text-gray-500 dark:text-gray-400">
                  <th className="px-6 py-4 font-medium">Provider Info</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Category / Values</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <AnimatePresence>
                  {providers.map((provider) => (
                    <motion.tr
                      key={provider._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center shrink-0">
                            {provider.image ? (
                              <img
                                src={provider.image}
                                alt={provider.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Users className="text-gray-400" size={20} />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {provider.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {provider.price
                                ? `${provider.price} BDT`
                                : "Negotiable"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                          {provider.whatsapp}
                        </div>
                        <div className="text-xs text-gray-500">
                          {provider.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                          {provider.category || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-[150px]">
                          {provider.value || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${provider.status === "active" ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400" : provider.status === "banned" ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"}`}
                        >
                          {provider.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setSelectedProvider(provider);
                              setIsDetailsOpen(true);
                            }}
                            className="p-2 text-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg cursor-pointer"
                          >
                            <Eye size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setSelectedProvider(provider);
                              setIsModalOpen(true);
                            }}
                            className="p-2 text-green-500 bg-green-50 dark:bg-green-900/20 rounded-lg cursor-pointer"
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(provider._id)}
                            className="p-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ProviderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProviders}
        initialData={selectedProvider}
      />

      <ProviderDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        provider={selectedProvider}
      />
    </div>
  );
}
