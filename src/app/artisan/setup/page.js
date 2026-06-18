"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

const API = API_URL;

const categories = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Mechanic",
  "Cleaner",
  "Hair Stylist",
  "Event Center",
  "Workspace",
  "Photographer",
  "Caterer",
];

const locationSuggestions = [
  "Abuja, Nigeria",
  "Lagos, Nigeria",
  "Port Harcourt, Nigeria",
  "Kano, Nigeria",
  "Ibadan, Nigeria",
];

export default function ArtisanSetup() {
  const router = useRouter();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    category: "",
    bio: "",
    location: "",
    profileImage: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationHints, setLocationHints] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) router.push("/login");
    if (user?.role !== "artisan") router.push("/dashboard");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Location autocomplete
    if (name === "location") {
      const filtered = locationSuggestions.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase()),
      );
      setLocationHints(filtered);
    }
  };

  const handleSelectLocation = (loc) => {
    setForm((prev) => ({ ...prev, location: loc }));
    setLocationHints([]);
  };

  const handleImagePick = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // preview locally (optional)
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // upload to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "demandpoint_uploads");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drixqvlox/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        profileImage: data.secure_url, // 🔥 THIS is what you store
      }));
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
    }
  };

  const Spinner = () => (
    <div className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/artisans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/artisan/dashboard");
      } else {
        alert(data.message || "Profile setup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl">
        {/* Header */}
        <h1 className="text-4xl font-semibold mb-2">
          Complete Your Artisan Profile
        </h1>

        <p className="text-white/50 mb-8">
          Help customers discover and trust your services
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black border border-white/10"
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* BIO */}
          <textarea
            name="bio"
            placeholder="Short bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black border border-white/10 h-28"
            required
          />

          {/* LOCATION AUTOCOMPLETE */}
          <div className="relative">
            <input
              name="location"
              placeholder="Location (e.g Abuja, Nigeria)"
              value={form.location}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black border border-white/10"
              required
            />

            {locationHints.length > 0 && (
              <div className="absolute z-10 w-full bg-zinc-900 border border-white/10 mt-1 rounded-xl overflow-hidden">
                {locationHints.map((loc) => (
                  <div
                    key={loc}
                    onClick={() => handleSelectLocation(loc)}
                    className="p-3 hover:bg-white/10 cursor-pointer text-sm"
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* IMAGE UPLOAD */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => fileRef.current.click()}
              className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white/60 text-xs">Upload</span>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImagePick}
              className="hidden"
            />

            <p className="text-white/50 text-sm">
              Click circle to upload profile image
            </p>
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-[#7C3BFF] hover:bg-[#6a2ee6] text-white py-3 rounded-xl font-medium transition flex items-center justify-center"
          >
            {loading ? <Spinner /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
