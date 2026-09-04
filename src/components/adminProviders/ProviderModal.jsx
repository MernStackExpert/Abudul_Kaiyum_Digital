import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, Link as LinkIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../../api/axiosInstance";
import { useApp } from "../../context/AppContext";

export default function ProviderModal({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}) {
  const { lang } = useApp();
  const [loading, setLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);

  const [data, setData] = useState({
    name: "",
    whatsapp: "",
    phone: "",
    facebook: "",
    service: "",
    category: "",
    value: "",
    price: "",
    status: "active",
  });

  const [imgType, setImgType] = useState("file");
  const [imgFile, setImgFile] = useState(null);
  const [imgLink, setImgLink] = useState("");

  useEffect(() => {
    if (isOpen) {
      api
        .get("/categories")
        .then((res) => {
          const fetchParams = res.data?.data || res.data || [];
          setCategoriesList(Array.isArray(fetchParams) ? fetchParams : []);
        })
        .catch(() => toast.error("Failed to load categories"));
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setData({
        name: initialData.name || "",
        whatsapp: initialData.whatsapp || "",
        phone: initialData.phone || "",
        facebook: initialData.facebook || "",
        service: initialData.service || "",
        category: initialData.category || "",
        value: initialData.value || "",
        price: initialData.price || "",
        status: initialData.status || "active",
      });
      if (initialData.image) {
        setImgType("link");
        setImgLink(initialData.image);
      }
    } else {
      setData({
        name: "",
        whatsapp: "",
        phone: "",
        facebook: "",
        service: "",
        category: "",
        value: "",
        price: "",
        status: "active",
      });
      setImgType("file");
      setImgFile(null);
      setImgLink("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
    if (!data.name || !data.whatsapp || !data.category) {
      return toast.error("Name, WhatsApp and Category are required!");
    }

    setLoading(true);
    try {
      let finalImgUrl = imgType === "link" ? imgLink : "";
      if (imgType === "file" && imgFile) {
        finalImgUrl = await uploadToImgbb(imgFile);
      }

      const payload = {
        name: data.name,
        whatsapp: data.whatsapp,
        phone: data.phone || data.whatsapp,
        facebook: data.facebook,
        service: data.service,
        category: data.category,
        value: data.value,
        price: data.price,
        status: data.status,
        image: finalImgUrl,
      };

      let response;
      if (initialData) {
        response = await api.put(
          `/providers/update/${initialData._id}`,
          payload,
        );
      } else {
        response = await api.post("/providers/add", payload);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save provider.");
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
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shrink-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {initialData ? "Edit Provider" : "Add New Provider"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto p-6 space-y-6 flex-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  WhatsApp Number *
                </label>
                <input
                  required
                  type="text"
                  name="whatsapp"
                  value={data.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Facebook Profile Link
                </label>
                <input
                  type="text"
                  name="facebook"
                  value={data.facebook}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category *
                </label>
                <select
                  required
                  name="category"
                  value={data.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categoriesList.map((cat) => {
                    const catName =
                      typeof cat.title === "object"
                        ? cat.title?.[lang] || cat.title?.en
                        : cat.title || cat.name;
                    const catValue =
                      cat.slug ||
                      cat.name ||
                      (typeof cat.title === "object"
                        ? cat.title?.en
                        : cat.title) ||
                      cat._id;
                    return (
                      <option key={cat._id || Math.random()} value={catValue}>
                        {catName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Service Name / Type
                </label>
                <input
                  type="text"
                  name="service"
                  value={data.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Values (Comma Separated)
                </label>
                <input
                  type="text"
                  name="value"
                  value={data.value}
                  onChange={handleChange}
                  placeholder="e.g. 500 Coins, 1000 Diamonds"
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Average Price (BDT)
                </label>
                <input
                  type="text"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Account Status
                </label>
                <select
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <label className="block text-sm font-semibold mb-2">
                Provider Image
              </label>
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setImgType("file")}
                  className={`px-4 py-1.5 text-sm rounded-lg flex items-center gap-2 ${imgType === "file" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                >
                  <UploadCloud size={16} /> Upload
                </button>
                <button
                  type="button"
                  onClick={() => setImgType("link")}
                  className={`px-4 py-1.5 text-sm rounded-lg flex items-center gap-2 ${imgType === "link" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
                >
                  <LinkIcon size={16} /> Link
                </button>
              </div>
              {imgType === "file" ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImgFile(e.target.files[0])}
                  className="w-full text-sm"
                />
              ) : (
                <input
                  type="text"
                  value={imgLink}
                  onChange={(e) => setImgLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none"
                />
              )}
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
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
                  "Update Provider"
                ) : (
                  "Save Provider"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
