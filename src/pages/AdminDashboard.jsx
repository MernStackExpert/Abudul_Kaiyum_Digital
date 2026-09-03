import { useApp } from "../context/AppContext";

export default function AdminDashboard() {
  const { t } = useApp();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white p-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">এখানে অর্ডার লিস্ট এবং ম্যানেজমেন্ট শো করবে।</p>
    </div>
  );
}
