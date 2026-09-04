import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/Home";
import AdminDashboard from "../pages/AdminDashboard";
import AdminServices from "../pages/AdminServices";
import AdminLogin from "../pages/AdminLogin";
import NotFound from "../pages/NotFound";
import AdminCategories from "../pages/AdminCategories";
import AdminProviders from "../pages/AdminProviders";
import AdminOrders from "../pages/AdminOrders";
import AdminSettings from "../pages/AdminSettings";
import AdminProfile from "../pages/AdminProfile";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="providers" element={<AdminProviders />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
