import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, Link as LinkIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../../api/axiosInstance";

export default function CategoryModal({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}) {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    slug: "",
    serviceType: "digital-service",
    status: "active",
  });

  const [imgType, setImgType] = useState("file");
  const [imgFile, setImgFile] = useState(null);
  const [imgLink, setImgLink] = useState("");

  useEffect(() => {
    if (initialData) {
      setData({
        name: initialData.name || "",
        slug: initialData.slug || "",
        serviceType: initialData.serviceType || "digital-service",
        status: initialData.status || "active",
      });
      if (initialData.image) {
        setImgType("link");
        setImgLink(initialData.image);
      }
    } else {
      setData({
        name: "",
        slug: "",
        serviceType: "digital-service",
        status: "active",
      });
      setImgType("file");
      setImgFile(null);
      setImgLink("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && !initialData) {
   
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setData({ ...data, name: value, slug });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const uploadToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const key =
      import.meta.env.VITE_IMGBB_API_KEY || import.meta.env.VITE_imgbbApiKey;
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${key}`,
      formData,
    );
    return res.data.data.display_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.slug) {
      return toast.error("Name and Slug are required!");
    }

    setLoading(true);
    try {
      let finalImgUrl = imgType === "link" ? imgLink : "";
      if (imgType === "file" && imgFile) {
        finalImgUrl = await uploadToImgbb(imgFile);
      }

      const payload = {
        name: data.name,
        slug: data.slug,
        serviceType: data.serviceType,
        status: data.status,
        image: finalImgUrl,
      };

      let response;
      if (initialData) {
        response = await api.put(
          `/categories/update/${initialData._id}`,
          payload,
        );
      } else {
        response = await api.post("/categories/add", payload);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {initialData ? "Edit Category" : "Add New Category"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Category Name *
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  placeholder="e.g. YouTube Channel Sell"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Slug (URL) *
                </label>
                <input
                  required
                  type="text"
                  name="slug"
                  value={data.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  placeholder="youtube-channel-sell"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Parent Service Type
                </label>
                <select
                  name="serviceType"
                  value={data.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                >
                  <option value="digital-service">Digital Service</option>
                  <option value="account-service">Account Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Category Icon/Image
              </label>
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setImgType("file")}
                  className={`px-4 py-1.5 text-sm rounded-lg flex items-center gap-2 ${imgType === "file" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
                >
                  <UploadCloud size={16} /> Upload
                </button>
                <button
                  type="button"
                  onClick={() => setImgType("link")}
                  className={`px-4 py-1.5 text-sm rounded-lg flex items-center gap-2 ${imgType === "link" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"}`}
                >
                  <LinkIcon size={16} /> Link
                </button>
              </div>
              {imgType === "file" ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImgFile(e.target.files[0])}
                  className="w-full text-sm text-gray-600 dark:text-gray-300"
                />
              ) : (
                <input
                  type="text"
                  value={imgLink}
                  onChange={(e) => setImgLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none dark:text-white"
                />
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-2.5 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-xl shadow-lg shadow-blue-500/30 disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : initialData ? (
                  "Update Category"
                ) : (
                  "Save Category"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
