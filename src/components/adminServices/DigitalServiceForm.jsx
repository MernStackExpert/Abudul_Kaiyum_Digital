import { useState, useEffect } from "react";
import { UploadCloud, Link as LinkIcon, Plus, X, Loader2, Users } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../../api/axiosInstance";

export default function DigitalServiceForm({
  onSubmit,
  onCancel,
  categories,
  initialData,
}) {
  const [loading, setLoading] = useState(false);
  const [providersList, setProvidersList] = useState([]);

  const [data, setData] = useState({
    titleEn: initialData?.title?.en || initialData?.title || "",
    titleBn: initialData?.title?.bn || "",
    price: initialData?.price || "",
    descEn: initialData?.description?.en || initialData?.description || "",
    descBn: initialData?.description?.bn || "",
    category: initialData?.category || "",
    icon: initialData?.icon || "",
    videoLink: initialData?.videoLink || "",
    serialId: initialData?.serialId || "",
    deliveryEn:
      initialData?.deliveryTime?.en || initialData?.deliveryTime || "",
    deliveryBn: initialData?.deliveryTime?.bn || "",
    keyFeatures: initialData?.keyFeatures
      ? initialData.keyFeatures.map((f) => f.en || f).join(", ")
      : "",
    providers: initialData?.providers || [],
  });

  const [imgType, setImgType] = useState(initialData?.img ? "link" : "file");
  const [imgFile, setImgFile] = useState(null);
  const [imgLink, setImgLink] = useState(initialData?.img || "");

  const [mediaType, setMediaType] = useState("file");
  const [mediaList, setMediaList] = useState(
    initialData?.media
      ? initialData.media.map((url) => ({ type: "link", url, file: null }))
      : [],
  );
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaLink, setMediaLink] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await api.get("/providers");
        if (response.data?.success) {
          setProvidersList(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to fetch providers");
      }
    };
    fetchProviders();
  }, []);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleProviderToggle = (id) => {
    setData((prev) => {
      const isSelected = prev.providers.includes(id);
      if (isSelected) {
        return { ...prev, providers: prev.providers.filter((p) => p !== id) };
      }
      return { ...prev, providers: [...prev.providers, id] };
    });
  };

  const handleAddMedia = () => {
    if (mediaType === "link" && mediaLink) {
      setMediaList([
        ...mediaList,
        { type: "link", url: mediaLink, file: null },
      ]);
      setMediaLink("");
    } else if (mediaType === "file" && mediaFile) {
      setMediaList([
        ...mediaList,
        { type: "file", url: URL.createObjectURL(mediaFile), file: mediaFile },
      ]);
      setMediaFile(null);
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

    if (!data.category) {
      return toast.error("Please select a category");
    }

    setLoading(true);
    try {
      let finalImgUrl = imgType === "link" ? imgLink : "";
      if (imgType === "file" && imgFile) {
        finalImgUrl = await uploadToImgbb(imgFile);
      }

      const finalMediaUrls = await Promise.all(
        mediaList.map(async (m) => {
          if (m.type === "link") return m.url;
          return await uploadToImgbb(m.file);
        }),
      );

      const payload = {
        title: { en: data.titleEn, bn: data.titleBn },
        category: data.category,
        serviceType: "digital-service",
        price: Number(data.price) || 0,
        description: { en: data.descEn, bn: data.descBn },
        icon: data.icon,
        videoLink: data.videoLink,
        serialId: data.serialId,
        img: finalImgUrl,
        media: finalMediaUrls,
        keyFeatures: data.keyFeatures
          ? data.keyFeatures
              .split(",")
              .map((f) => f.trim())
              .filter(Boolean)
          : [],
        providers: data.providers,
        deliveryTime: { en: data.deliveryEn, bn: data.deliveryBn },
      };

      await onSubmit(
        payload,
        initialData ? "put" : "post",
        initialData
          ? `/services/update/${initialData._id}`
          : "/services/add/digital",
      );
    } catch (error) {
      toast.error("Failed to upload images or submit form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="overflow-y-auto p-6 space-y-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Title (English)
            </label>
            <input
              type="text"
              name="titleEn"
              value={data.titleEn}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Title (Bengali)
            </label>
            <input
              type="text"
              name="titleBn"
              value={data.titleBn}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Price (BDT)
            </label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Digital Category</option>
              {categories
                ?.filter((cat) => cat.serviceType === "digital-service")
                .map((cat, i) => (
                  <option key={i} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Serial ID
            </label>
            <input
              type="text"
              name="serialId"
              value={data.serialId}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Description (English)
            </label>
            <textarea
              name="descEn"
              value={data.descEn}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Description (Bengali)
            </label>
            <textarea
              name="descBn"
              value={data.descBn}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Delivery Time (English)
            </label>
            <input
              type="text"
              name="deliveryEn"
              value={data.deliveryEn}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Delivery Time (Bengali)
            </label>
            <input
              type="text"
              name="deliveryBn"
              value={data.deliveryBn}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Icon Name
            </label>
            <input
              type="text"
              name="icon"
              value={data.icon}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Video Link
            </label>
            <input
              type="text"
              name="videoLink"
              value={data.videoLink}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/30">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Main Image (Optional)
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

          <div>
            <label className="block text-sm font-semibold mb-2">
              Media Gallery
            </label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setMediaType("file")}
                className={`px-4 py-1.5 text-sm rounded-lg flex items-center gap-2 ${mediaType === "file" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                <UploadCloud size={16} /> Upload
              </button>
              <button
                type="button"
                onClick={() => setMediaType("link")}
                className={`px-4 py-1.5 text-sm rounded-lg flex items-center gap-2 ${mediaType === "link" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                <LinkIcon size={16} /> Link
              </button>
            </div>
            <div className="flex gap-2">
              {mediaType === "file" ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setMediaFile(e.target.files[0])}
                  className="flex-1 text-sm"
                />
              ) : (
                <input
                  type="text"
                  value={mediaLink}
                  onChange={(e) => setMediaLink(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none"
                />
              )}
              <button
                type="button"
                onClick={handleAddMedia}
                className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
              >
                <Plus size={20} />
              </button>
            </div>
            {mediaList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {mediaList.map((m, idx) => (
                  <div
                    key={idx}
                    className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-300"
                  >
                    <img
                      src={m.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setMediaList(mediaList.filter((_, i) => i !== idx))
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-lg"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Key Features (Comma separated)
            </label>
            <textarea
              name="keyFeatures"
              value={data.keyFeatures}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Users size={16} /> Select Providers
            </label>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 h-32 overflow-y-auto space-y-2">
              {providersList.length > 0 ? (
                providersList.map((provider) => (
                  <label
                    key={provider._id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={data.providers.includes(provider._id)}
                      onChange={() => handleProviderToggle(provider._id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium">{provider.name}</span>
                  </label>
                ))
              ) : (
                <div className="text-sm text-gray-500 text-center mt-4">
                  No providers found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4 bg-gray-50 dark:bg-gray-900">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-2.5 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-xl disabled:opacity-70"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : initialData ? (
            "Update Digital Service"
          ) : (
            "Save Digital Service"
          )}
        </button>
      </div>
    </form>
  );
}