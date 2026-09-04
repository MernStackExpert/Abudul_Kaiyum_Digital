import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Layers,
  Clock,
  MonitorSmartphone,
  MonitorPlay,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";
import { useApp } from "../context/AppContext";
import ServiceDetailsModal from "../components/adminServices/ServiceDetailsModal";
import AddServiceModal from "../components/adminServices/AddServiceModal";
import EditServiceModal from "../components/adminServices/EditServiceModal";

export default function AdminServices() {
  const { theme, lang } = useApp();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statsData, setStatsData] = useState([]);

  const [selectedService, setSelectedService] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/services?page=${page}&limit=8&serviceType=${activeTab}&search=${search}`,
      );
      if (response.data.success) {
        const rawData = response.data.data || [];
        const activeServices = rawData.filter(
          (s) =>
            s.status !== "deleted" &&
            (!activeTab || s.serviceType === activeTab),
        );
        setServices(activeServices);
        setTotalPages(response.data.totalPages || 1);

        setStatsData([
          { name: "W1", count: Math.floor(Math.random() * 10) + 5 },
          { name: "W2", count: Math.floor(Math.random() * 20) + 10 },
          { name: "W3", count: activeServices.length },
          { name: "W4", count: Math.floor(Math.random() * 30) + 15 },
        ]);
      }
    } catch (error) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchServices();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search, activeTab, page]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will be moved to the recycle bin and permanently deleted after 24 hours.",
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
          const response = await api.delete(`/services/delete/${id}`);
          if (response.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Service moved to recycle bin.",
              icon: "success",
              background: theme === "dark" ? "#1f2937" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#1f2937",
            });
            fetchServices();
          }
        } catch (error) {
          toast.error("Failed to delete service");
        }
      }
    });
  };

  const tabs = [
    { id: "", label: "All Services", icon: Layers },
    {
      id: "digital-service",
      label: "Digital Services",
      icon: MonitorSmartphone,
    },
    { id: "account-service", label: "Account Buy/Sell", icon: MonitorPlay },
  ];

  return (
    <div className="text-gray-900 dark:text-gray-100 flex flex-col h-[calc(100vh-6rem)] relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Services Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage, update and track all your services
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/30 cursor-pointer"
        >
          <Plus size={20} />
          <span>Add New Service</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setPage(1);
                }}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                  />
                )}
                <Icon size={18} className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Growth
            </p>
            <h4 className="text-xl font-bold">+{services.length}</h4>
          </div>
          <div className="h-10 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={statsData}>
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
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
              placeholder="Search services by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : services.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Layers size={48} className="mb-4 opacity-20" />
              <p>No services found in this type.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800/80 backdrop-blur-md z-10">
                <tr className="text-sm text-gray-500 dark:text-gray-400">
                  <th className="px-6 py-4 font-medium">Service Info</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <AnimatePresence>
                  {services.map((service) => {
                    const titleText =
                      typeof service.title === "object"
                        ? service.title?.[lang] || service.title?.en || ""
                        : service.title;

                    const deliveryText =
                      typeof service.deliveryTime === "object"
                        ? service.deliveryTime?.[lang] ||
                          service.deliveryTime?.en ||
                          "N/A"
                        : service.deliveryTime || "N/A";

                    const categoryText =
                      typeof service.category === "object"
                        ? service.category?.[lang] || service.category?.en || ""
                        : service.category;

                    return (
                      <motion.tr
                        key={service._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
                              {service.img ? (
                                <img
                                  src={service.img}
                                  alt={titleText}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Layers className="text-gray-400" size={24} />
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {titleText}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <Clock size={12} /> {deliveryText}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                            {categoryText}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {service.price} BDT
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setSelectedService(service);
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
                                setSelectedService(service);
                                setIsEditOpen(true);
                              }}
                              className="p-2 text-green-500 bg-green-50 dark:bg-green-900/20 rounded-lg cursor-pointer"
                            >
                              <Edit size={18} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(service._id)}
                              className="p-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg cursor-pointer"
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
            <span className="text-sm text-gray-500">
              Showing page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-white dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {isDetailsOpen && (
        <ServiceDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedService(null);
          }}
          service={selectedService}
        />
      )}

      {isAddOpen && (
        <AddServiceModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onSuccess={fetchServices}
        />
      )}

      {isEditOpen && (
        <EditServiceModal
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedService(null);
          }}
          onSuccess={fetchServices}
          service={selectedService}
        />
      )}
    </div>
  );
}
