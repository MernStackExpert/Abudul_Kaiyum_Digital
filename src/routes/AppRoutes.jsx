import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/Home";
// import Contact from "../pages/Contact"; 
import AdminDashboard from "../pages/AdminDashboard";
// import AdminOrders from "../pages/AdminOrders"; 

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Route>

     
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* <Route path="orders" element={<AdminOrders />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
