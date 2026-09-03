import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950 text-black dark:text-white">
      {/* অ্যাডমিন সাইডবার */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6 text-blue-600">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/admin" className="hover:text-blue-500 font-medium">
            ড্যাশবোর্ড (Dashboard)
          </Link>
          <Link to="/admin/orders" className="hover:text-blue-500 font-medium">
            অর্ডার লিস্ট (Orders)
          </Link>
        </nav>
      </aside>

      {/* মূল অ্যাডমিন কন্টেন্ট এরিয়া */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 shadow-sm">
          <h1 className="font-semibold">অ্যাডমিন কন্ট্রোল প্যানেল</h1>
          <Link
            to="/"
            className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md"
          >
            ওয়েবসাইট ভিজিট করুন
          </Link>
        </header>

        <main className="p-6 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
