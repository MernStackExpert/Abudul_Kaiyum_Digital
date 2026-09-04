import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  Layers,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  FolderTree,
  UserCheck,
} from "lucide-react";
import api from "../api/axiosInstance";
import { useApp } from "../context/AppContext";

export default function AdminDashboard() {
  const { t, theme } = useApp();
  const dashT = t.adminDashboard || {};
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const c1 = theme === "dark" ? "#60a5fa" : "#3b82f6";
  const c2 = theme === "dark" ? "#34d399" : "#10b981";
  const c3 = theme === "dark" ? "#f472b6" : "#ec4899";
  const c4 = theme === "dark" ? "#fbbf24" : "#f59e0b";
  const c5 = theme === "dark" ? "#a78bfa" : "#8b5cf6";
  const c6 = theme === "dark" ? "#38bdf8" : "#0ea5e9";
  const c7 = theme === "dark" ? "#fb7185" : "#f43f5e";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/stats/dashboard");
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }

  const revTotal = stats?.revenue?.total || 0;
  const ordTotal = stats?.orders?.total || 0;
  const ordPending = stats?.orders?.pending || 0;
  const ordCompleted = stats?.orders?.completed || 0;
  const ordCanceled = stats?.orders?.canceled || 0;
  const srvTotal = stats?.services?.total || 0;
  const srvDigital = stats?.services?.digitalServices || 0;
  const srvAccount = stats?.services?.accountServices || 0;
  const catTotal = stats?.others?.categories || 0;
  const provTotal = stats?.others?.providers || 0;
  const usrTotal = stats?.others?.users || 0;

  const statCards = [
    {
      title: "Total Revenue",
      value: `${revTotal} ${stats?.revenue?.currency || "BDT"}`,
      icon: DollarSign,
      color: c1,
      chartData: [{ v: revTotal }],
      ChartComponent: AreaChart,
      ChartElement: Area,
    },
    {
      title: "Total Orders",
      value: ordTotal,
      icon: ShoppingCart,
      color: c2,
      chartData: [{ v: ordTotal }],
      ChartComponent: BarChart,
      ChartElement: Bar,
    },
    {
      title: "Pending Orders",
      value: ordPending,
      icon: Clock,
      color: c6,
      chartData: [{ v: ordPending }],
      ChartComponent: LineChart,
      ChartElement: Line,
    },
    {
      title: "Completed Orders",
      value: ordCompleted,
      icon: CheckCircle,
      color: c3,
      chartData: [{ v: ordCompleted }],
      ChartComponent: AreaChart,
      ChartElement: Area,
    },
    {
      title: "Canceled Orders",
      value: ordCanceled,
      icon: XCircle,
      color: c7,
      chartData: [{ v: ordCanceled }],
      ChartComponent: BarChart,
      ChartElement: Bar,
    },
    {
      title: "Total Services",
      value: srvTotal,
      icon: Layers,
      color: c4,
      chartData: [{ v: srvTotal }, { v: srvDigital }, { v: srvAccount }],
      ChartComponent: LineChart,
      ChartElement: Line,
    },
    {
      title: "Categories",
      value: catTotal,
      icon: FolderTree,
      color: c5,
      chartData: [{ v: catTotal }],
      ChartComponent: BarChart,
      ChartElement: Bar,
    },
    {
      title: "Providers & Users",
      value: `P: ${provTotal} / U: ${usrTotal}`,
      icon: Users,
      color: c1,
      chartData: [{ v: provTotal }, { v: usrTotal }],
      ChartComponent: AreaChart,
      ChartElement: Area,
    },
  ];

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        {dashT.title || "Dashboard Overview"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between overflow-hidden relative"
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
                    {card.title}
                  </p>
                  <h3 className="text-xl font-bold">{card.value}</h3>
                </div>
                <div
                  className="p-3 rounded-xl bg-opacity-10 dark:bg-opacity-20"
                  style={{
                    backgroundColor: `${card.color}20`,
                    color: card.color,
                  }}
                >
                  <Icon size={24} />
                </div>
              </div>

              <div className="h-16 w-full -mx-2 -mb-6 mt-4 opacity-80 pointer-events-none">
                <ResponsiveContainer width="100%" height="100%">
                  <card.ChartComponent data={card.chartData}>
                    <card.ChartElement
                      type="monotone"
                      dataKey="v"
                      stroke={card.color}
                      fill={card.color}
                      strokeWidth={2}
                      dot={false}
                      radius={card.ChartElement === Bar ? [4, 4, 0, 0] : 0}
                      fillOpacity={0.2}
                    />
                  </card.ChartComponent>
                </ResponsiveContainer>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold">
            {dashT.recentOrders || "Recent Orders"}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-500 dark:text-gray-400">
                <th className="px-6 py-4 font-medium">
                  {dashT.customer || "Customer"}
                </th>
                <th className="px-6 py-4 font-medium">
                  {dashT.service || "Service"}
                </th>
                <th className="px-6 py-4 font-medium">
                  {dashT.price || "Price"}
                </th>
                <th className="px-6 py-4 font-medium">
                  {dashT.status || "Status"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {stats?.recentOrders?.length > 0 ? (
                stats.recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {order.customerInfo?.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {order.customerInfo?.whatsapp}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{order.serviceTitle}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {order.price} BDT
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : order.status === "canceled"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {dashT[order.status] || order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
