import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  FolderTree,
  Image as ImageIcon,
  Search,
  MonitorSmartphone,
  MonitorPlay,
  Eye,
} from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";
import { useApp } from "../context/AppContext";
import CategoryModal from "../components/adminCategories/CategoryModal";
import CategoryDetailsModal from "../components/adminCategories/CategoryDetailsModal";

export default function AdminCategories() {
  const { theme } = useApp();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get("/categories");
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
          const response = await api.delete(`/categories/delete/${id}`);
          if (response.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Category has been deleted.",
              icon: "success",
              background: theme === "dark" ? "#1f2937" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#1f2937",
            });
            fetchCategories();
          }
        } catch (error) {
          toast.error("Failed to delete category");
        }
      }
    });
  };

  const openAddModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const openDetailsModal = (category) => {
    setSelectedCategory(category);
    setIsDetailsOpen(true);
  };

  const tabs = [
    { id: "", label: "All Categories", icon: FolderTree },
    {
      id: "digital-service",
      label: "Digital Services",
      icon: MonitorSmartphone,
    },
    { id: "account-service", label: "Account Services", icon: MonitorPlay },
  ];

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.slug.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "" || cat.serviceType === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="text-gray-900 dark:text-gray-100 flex flex-col h-[calc(100vh-6rem)] relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FolderTree size={28} className="text-blue-500" /> Categories
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your service categories and hierarchy
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/30 cursor-pointer"
        >
          <Plus size={20} />
          <span>Add Category</span>
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
                  layoutId="activeCategoryTab"
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
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all dark:text-white"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FolderTree size={48} className="mb-4 opacity-20" />
              <p>No categories found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800/80 backdrop-blur-md z-10">
                <tr className="text-sm text-gray-500 dark:text-gray-400">
                  <th className="px-6 py-4 font-medium">Category Info</th>
                  <th className="px-6 py-4 font-medium">Parent Type</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <AnimatePresence>
                  {filteredCategories.map((cat) => (
                    <motion.tr
                      key={cat._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
                            {cat.image ? (
                              <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="text-gray-400" size={24} />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {cat.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              /{cat.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${cat.serviceType === "digital-service" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"}`}
                        >
                          {cat.serviceType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${cat.status === "active" ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}
                        >
                          {cat.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openDetailsModal(cat)}
                            className="p-2 text-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg cursor-pointer"
                          >
                            <Eye size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openEditModal(cat)}
                            className="p-2 text-green-500 bg-green-50 dark:bg-green-900/20 rounded-lg cursor-pointer"
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(cat._id)}
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

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCategories}
        initialData={selectedCategory}
      />

      <CategoryDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        category={selectedCategory}
      />
    </div>
  );
}
