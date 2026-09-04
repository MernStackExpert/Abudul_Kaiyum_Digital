import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Loader2,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../api/axiosInstance";
import { useApp } from "../context/AppContext";

export default function AdminProfile() {
  const { adminUser, login } = useApp();

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    avatar: "",
  });

  useEffect(() => {
    let id = adminUser?._id || adminUser?.id;
    if (!id) {
      try {
        const storedUser = JSON.parse(
          localStorage.getItem("adminData") || "{}",
        );
        id = storedUser?._id || storedUser?.id;
      } catch (error) {
        id = null;
      }
    }

    if (id) {
      setUserId(id);
    } else {
      setLoading(false);
      toast.error("User ID not found! Please login again.");
    }
  }, [adminUser]);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/auth/profile/${userId}`);
        if (response.data.success) {
          const userData = response.data.data;
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            role: userData.role || "",
            phone: userData.phone || "",
            address: userData.address || "",
            avatar: userData.avatar || "",
          });
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Failed to fetch profile details");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imgData = new FormData();
      imgData.append("image", file);
      const key =
        import.meta.env.VITE_IMGBB_API_KEY || import.meta.env.VITE_imgbbApiKey;
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${key}`,
        imgData,
      );

      const imageUrl = res.data.data.display_url;
      setFormData((prev) => ({ ...prev, avatar: imageUrl }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      return toast.error("Name and Email are required");
    }

    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        avatar: formData.avatar,
      };

      const response = await api.put(`/auth/profile/${userId}`, payload);

      if (response.data.success) {
        toast.success("Profile updated successfully");

        try {
          const storedUser = JSON.parse(
            localStorage.getItem("adminData") || "{}",
          );
          const updatedUser = { ...storedUser, ...payload };
          const token = localStorage.getItem("token");

          if (login) login(updatedUser, token);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="text-gray-900 dark:text-gray-100 flex flex-col h-[calc(100vh-6rem)] relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck size={28} className="text-blue-500" /> My Profile
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your account settings and personal information
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col items-center text-center">
            <div className="relative group mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-gray-50 dark:border-gray-800 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-lg relative">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt={formData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={48} className="text-gray-400" />
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 size={24} className="text-white animate-spin" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer shadow-lg transition-transform hover:scale-105 border-2 border-white dark:border-gray-900">
                <Camera size={18} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
              {formData.name}
              {formData.role === "admin" && (
                <BadgeCheck size={18} className="text-blue-500" />
              )}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {formData.email}
            </p>

            <span className="mt-4 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-100 dark:border-blue-900/30">
              {formData.role}
            </span>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Account Role{" "}
                  <span className="text-red-500 font-normal text-xs">
                    (Cannot be changed)
                  </span>
                </label>
                <div className="relative">
                  <ShieldCheck
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={formData.role}
                    disabled
                    readOnly
                    className="w-full pl-11 pr-4 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-70 uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={saving || uploading}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70"
              >
                {saving ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Save size={20} />
                )}
                Update Profile
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
