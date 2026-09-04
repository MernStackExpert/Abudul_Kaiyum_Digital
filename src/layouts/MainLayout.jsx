import { Outlet } from "react-router-dom";
import Navbar from "../components/HOME/Navbar";
import Footer from "../components/HOME/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
