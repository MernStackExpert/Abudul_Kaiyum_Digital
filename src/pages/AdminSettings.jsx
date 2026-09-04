import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Loader2,
  Globe,
  Settings,
  Share2,
  Search,
  ShieldAlert,
  UploadCloud,
  Link as LinkIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../api/axiosInstance";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const [imgType, setImgType] = useState("link");
  const [imgFile, setImgFile] = useState(null);

  const [formData, setFormData] = useState({
    websiteName: { en: "", bn: "" },
    logoUrl: "",
    themeColor: "#0F172A",
    currency: "BDT",
    topNavMessage: { active: false, message: { en: "", bn: "" } },
    contactInformation: {
      whatsapp: "",
      phone: "",
      email: "",
      address: { en: "", bn: "" },
      facebook: "",
      telegram: "",
      tiktok: "",
      instagram: "",
      youtube: "",
    },
    footerText: { en: "", bn: "" },
    seoMetaTitle: { en: "", bn: "" },
    seoMetaDescription: { en: "", bn: "" },
    websiteLock: { isLocked: false, message: { en: "", bn: "" } },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get("/settings");
      if (response.data?.success && response.data?.data) {
        setFormData((prev) => ({ ...prev, ...response.data.data }));
      }
    } catch (error) {
      toast.error("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  const handleBasicChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLangChange = (field, lang, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
  };

  const handleNestedLangChange = (parent, field, lang, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: { ...prev[parent][field], [lang]: value },
      },
    }));
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

  const handleSave = async () => {
    setSaving(true);
    try {
      let finalLogoUrl = formData.logoUrl;
      if (imgType === "file" && imgFile) {
        finalLogoUrl = await uploadToImgbb(imgFile);
      }

      const payload = { ...formData, logoUrl: finalLogoUrl };
      const response = await api.put("/settings/update", payload);

      if (response.data.success) {
        toast.success("Settings updated successfully!");
        fetchSettings();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "contact", label: "Contact & Social", icon: Share2 },
    { id: "seo", label: "SEO & Footer", icon: Search },
    { id: "maintenance", label: "Maintenance", icon: ShieldAlert },
  ];

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
            <Globe size={28} className="text-blue-500" /> Website Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage global configurations and preferences
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70"
        >
          {saving ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Save size={20} />
          )}
          <span>Save Changes</span>
        </motion.button>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSettingsTab"
                  className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                />
              )}
              <Icon size={18} className="relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {activeTab === "general" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Website Name (English)
                    </label>
                    <input
                      type="text"
                      value={formData.websiteName?.en || ""}
                      onChange={(e) =>
                        handleLangChange("websiteName", "en", e.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Website Name (Bengali)
                    </label>
                    <input
                      type="text"
                      value={formData.websiteName?.bn || ""}
                      onChange={(e) =>
                        handleLangChange("websiteName", "bn", e.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Currency
                    </label>
                    <input
                      type="text"
                      value={formData.currency}
                      onChange={(e) =>
                        handleBasicChange("currency", e.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Theme Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.themeColor}
                        onChange={(e) =>
                          handleBasicChange("themeColor", e.target.value)
                        }
                        className="h-11 w-11 rounded-xl cursor-pointer border-0 p-0"
                      />
                      <input
                        type="text"
                        value={formData.themeColor}
                        onChange={(e) =>
                          handleBasicChange("themeColor", e.target.value)
                        }
                        className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <label className="block text-sm font-semibold mb-3">
                    Website Logo
                  </label>
                  <div className="flex gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setImgType("file")}
                      className={`px-4 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                        imgType === "file"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      <UploadCloud size={16} /> Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setImgType("link")}
                      className={`px-4 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                        imgType === "link"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      <LinkIcon size={16} /> URL Link
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
                      value={formData.logoUrl}
                      onChange={(e) =>
                        handleBasicChange("logoUrl", e.target.value)
                      }
                      placeholder="https://..."
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  {formData.logoUrl && imgType === "link" && (
                    <div className="mt-4 p-2 bg-white dark:bg-gray-900 rounded-xl inline-block border border-gray-200 dark:border-gray-700">
                      <img
                        src={formData.logoUrl}
                        alt="Logo Preview"
                        className="h-12 object-contain"
                      />
                    </div>
                  )}
                </div>

                <div className="bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-bold text-blue-900 dark:text-blue-300">
                      Top Navigation Banner
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={formData.topNavMessage?.active}
                        onChange={(e) =>
                          handleNestedChange(
                            "topNavMessage",
                            "active",
                            e.target.checked,
                          )
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  {formData.topNavMessage?.active && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <input
                        type="text"
                        placeholder="Banner Message (English)"
                        value={formData.topNavMessage?.message?.en || ""}
                        onChange={(e) =>
                          handleNestedLangChange(
                            "topNavMessage",
                            "message",
                            "en",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Banner Message (Bengali)"
                        value={formData.topNavMessage?.message?.bn || ""}
                        onChange={(e) =>
                          handleNestedLangChange(
                            "topNavMessage",
                            "message",
                            "bn",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === "contact" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={formData.contactInformation?.whatsapp || ""}
                      onChange={(e) =>
                        handleNestedChange(
                          "contactInformation",
                          "whatsapp",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.contactInformation?.phone || ""}
                      onChange={(e) =>
                        handleNestedChange(
                          "contactInformation",
                          "phone",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.contactInformation?.email || ""}
                      onChange={(e) =>
                        handleNestedChange(
                          "contactInformation",
                          "email",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Office Address (English)
                    </label>
                    <input
                      type="text"
                      value={formData.contactInformation?.address?.en || ""}
                      onChange={(e) =>
                        handleNestedLangChange(
                          "contactInformation",
                          "address",
                          "en",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Office Address (Bengali)
                    </label>
                    <input
                      type="text"
                      value={formData.contactInformation?.address?.bn || ""}
                      onChange={(e) =>
                        handleNestedLangChange(
                          "contactInformation",
                          "address",
                          "bn",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                    Social Media Links
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "facebook",
                      "telegram",
                      "tiktok",
                      "instagram",
                      "youtube",
                    ].map((social) => (
                      <div key={social}>
                        <label className="block text-xs font-semibold mb-1 capitalize text-gray-500">
                          {social}
                        </label>
                        <input
                          type="text"
                          placeholder={`https://${social}.com/...`}
                          value={formData.contactInformation?.[social] || ""}
                          onChange={(e) =>
                            handleNestedChange(
                              "contactInformation",
                              social,
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "seo" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      SEO Title (English)
                    </label>
                    <input
                      type="text"
                      value={formData.seoMetaTitle?.en || ""}
                      onChange={(e) =>
                        handleLangChange("seoMetaTitle", "en", e.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      SEO Title (Bengali)
                    </label>
                    <input
                      type="text"
                      value={formData.seoMetaTitle?.bn || ""}
                      onChange={(e) =>
                        handleLangChange("seoMetaTitle", "bn", e.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      SEO Description (English)
                    </label>
                    <textarea
                      rows="3"
                      value={formData.seoMetaDescription?.en || ""}
                      onChange={(e) =>
                        handleLangChange(
                          "seoMetaDescription",
                          "en",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      SEO Description (Bengali)
                    </label>
                    <textarea
                      rows="3"
                      value={formData.seoMetaDescription?.bn || ""}
                      onChange={(e) =>
                        handleLangChange(
                          "seoMetaDescription",
                          "bn",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 mt-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                    Footer Copyright Text
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="e.g. © 2026 AK Digital. All rights reserved."
                      value={formData.footerText?.en || ""}
                      onChange={(e) =>
                        handleLangChange("footerText", "en", e.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="e.g. © ২০২৬ আব্দুল কাইয়ুম ডিজিটাল। সর্বস্বত্ব সংরক্ষিত।"
                      value={formData.footerText?.bn || ""}
                      onChange={(e) =>
                        handleLangChange("footerText", "bn", e.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "maintenance" && (
              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-red-200 dark:border-red-900/50">
                  <div>
                    <h3 className="text-lg font-bold text-red-700 dark:text-red-400">
                      Maintenance Mode
                    </h3>
                    <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">
                      Lock the website for users when updating or fixing issues.
                      Only admins can access.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.websiteLock?.isLocked}
                      onChange={(e) =>
                        handleNestedChange(
                          "websiteLock",
                          "isLocked",
                          e.target.checked,
                        )
                      }
                    />
                    <div className="w-14 h-7 bg-red-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-red-900 dark:text-red-200">
                      Lock Screen Message (English)
                    </label>
                    <textarea
                      rows="3"
                      value={formData.websiteLock?.message?.en || ""}
                      onChange={(e) =>
                        handleNestedLangChange(
                          "websiteLock",
                          "message",
                          "en",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500 resize-none text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-red-900 dark:text-red-200">
                      Lock Screen Message (Bengali)
                    </label>
                    <textarea
                      rows="3"
                      value={formData.websiteLock?.message?.bn || ""}
                      onChange={(e) =>
                        handleNestedLangChange(
                          "websiteLock",
                          "message",
                          "bn",
                          e.target.value,
                        )
                      }
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900/50 rounded-xl outline-none focus:ring-2 focus:ring-red-500 resize-none text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
