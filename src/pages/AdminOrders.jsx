import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";
import { useApp } from "../context/AppContext";
import OrderDetailsModal from "../components/adminOrders/OrderDetailsModal";
import OrderStatusModal from "../components/adminOrders/OrderStatusModal";

export default function AdminOrders() {
  const { theme, lang } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/orders?page=${page}&limit=10&status=${activeTab}&search=${search}`,
      );
      if (response.data.success) {
        setOrders(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchOrders();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search, activeTab, page]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the order.",
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
          const response = await api.delete(`/orders/delete/${id}`);
          if (response.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Order has been deleted.",
              icon: "success",
              background: theme === "dark" ? "#1f2937" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#1f2937",
            });
            fetchOrders();
          }
        } catch (error) {
          toast.error("Failed to delete order");
        }
      }
    });
  };

  const getSafeText = (field) => {
    if (!field) return "";
    if (typeof field === "object")
      return field[lang] || field.en || field.bn || "";
    return String(field);
  };

  const tabs = [
    { id: "", label: "All Orders", icon: ShoppingBag },
    { id: "pending", label: "Pending", icon: Clock },
    { id: "completed", label: "Completed", icon: CheckCircle },
    { id: "cancelled", label: "Cancelled", icon: XCircle },
  ];

  return (
    <div className="text-gray-900 dark:text-gray-100 flex flex-col h-[calc(100vh-6rem)] relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag size={28} className="text-blue-500" /> Order Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track and manage customer orders and payments
          </p>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 shrink-0">
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
                  layoutId="activeOrderTab"
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
              placeholder="Search by customer name, email or whatsapp..."
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
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag size={48} className="mb-4 opacity-20" />
              <p>No orders found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800/80 backdrop-blur-md z-10">
                <tr className="text-sm text-gray-500 dark:text-gray-400">
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Service Info</th>
                  <th className="px-6 py-4 font-medium">Date & Price</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <AnimatePresence>
                  {orders.map((order) => (
                    <motion.tr
                      key={order._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {order.customerInfo?.name || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.customerInfo?.whatsapp || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate max-w-[200px]">
                          {getSafeText(order.serviceTitle)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {getSafeText(order.serviceCategory)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-green-600 dark:text-green-400">
                          {order.price} BDT
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 items-start">
                          <span
                            className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                : order.status === "cancelled"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                            }`}
                          >
                            {order.status}
                          </span>
                          <span
                            className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${
                              order.paymentStatus === "paid"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsStatusOpen(true);
                            }}
                            className="p-2 text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg cursor-pointer"
                            title="Update Status"
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsDetailsOpen(true);
                            }}
                            className="p-2 text-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg cursor-pointer"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(order._id)}
                            className="p-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg cursor-pointer"
                            title="Delete Order"
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

      <OrderDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        order={selectedOrder}
      />

      <OrderStatusModal
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        onSuccess={fetchOrders}
        order={selectedOrder}
      />
    </div>
  );
}
