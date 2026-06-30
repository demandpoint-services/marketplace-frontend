"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, getCurrentUser } from "@/lib/api";

const API = API_URL;

const locationSuggestions = [
  "Abuja, Nigeria",
  "Lagos, Nigeria",
  "Port Harcourt, Nigeria",
  "Kano, Nigeria",
  "Ibadan, Nigeria",
];

export default function SetupAccount() {
  const router = useRouter();
  const fileRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [preview, setPreview] = useState("");
  const [locationHints, setLocationHints] = useState([]);

  const [form, setForm] = useState({
    phone: "",
    location: "",
    bio: "",
    profileImage: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getCurrentUser();

        if (!user) {
          router.push("/login");
          return;
        }

        setForm({
          phone: user.phone || "",
          location: user.location || "",
          bio: user.bio || "",
          profileImage: user.profileImage || "",
        });

        setPreview(user.profileImage || "");

        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    }

    loadProfile();
  }, [router]);

  const Spinner = () => (
    <div className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "location") {
      const filtered = locationSuggestions.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase()),
      );

      setLocationHints(filtered);
    }
  };

  const handleSelectLocation = (loc) => {
    setForm((prev) => ({
      ...prev,
      location: loc,
    }));

    setLocationHints([]);
  };

  // Upload Image
  const handleImagePick = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Preview immediately
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "demandpoint_uploads");

    setUploadingImage(true);

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
        profileImage: data.secure_url,
      }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadingImage) {
      alert("Please wait until your profile image finishes uploading.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/users/setup-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "artisan") {
        router.push("/artisan/setup");
      } else {
        router.push("/dashboard/client");
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
      <div className="w-full max-w-xl pb-32 pt-24 md:pt-32">
        <h1 className="text-4xl font-semibold mb-2">Complete Your Account</h1>

        <p className="text-white/50 mb-8">
          Add a few details to personalize your Demand Point account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          {/* PHONE */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black border border-white/10"
            required
          />

          {/* BIO */}
          <textarea
            name="bio"
            placeholder="Tell us a little about yourself"
            value={form.bio}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black border border-white/10 h-28"
          />

          {/* LOCATION */}
          <div className="relative">
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black border border-white/10"
              required
            />

            {locationHints.length > 0 && (
              <div className="absolute z-20 mt-1 w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                {locationHints.map((loc) => (
                  <div
                    key={loc}
                    onClick={() => handleSelectLocation(loc)}
                    className="p-3 text-sm cursor-pointer hover:bg-white/10"
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PROFILE IMAGE */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => !uploadingImage && fileRef.current.click()}
              className="w-20 h-20 rounded-full bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center cursor-pointer"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-white/60">
                  {uploadingImage ? "Uploading..." : "Upload"}
                </span>
              )}
            </div>

            <div>
              <p className="font-medium">Profile Picture</p>

              <p className="text-sm text-white/40">JPG, PNG or WEBP</p>

              {uploadingImage && (
                <p className="text-xs text-purple-400 mt-1">
                  Uploading image...
                </p>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImagePick}
              className="hidden"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className={`w-full py-3 rounded-xl font-medium flex justify-center items-center transition ${
              loading || uploadingImage
                ? "bg-zinc-700 cursor-not-allowed"
                : "bg-[#7C3BFF] hover:bg-[#6931d7] cursor-pointer"
            }`}
          >
            {loading ? (
              <Spinner />
            ) : uploadingImage ? (
              "Uploading Image..."
            ) : (
              "Complete Setup"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
