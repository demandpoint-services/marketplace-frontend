"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://localhost:5000/api";

export default function ServicesPage() {
  const [artisans, setArtisans] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    try {
      const res = await fetch(`${API}/artisans`);
      const data = await res.json();

      setArtisans(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (cat) => {
    setCategory(cat);

    if (cat === "all") {
      setFiltered(artisans);
    } else {
      setFiltered(artisans.filter((a) => a.category === cat));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,255,0.12),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold pt-12">
            Hire Trusted Professionals
          </h1>

          <p className="text-white/50 mt-3 max-w-xl">
            Connect with verified artisans for repairs, installations, and
            services in your area.
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-10">
          {["all", "Plumber", "Electrician", "Carpenter"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-5 py-2 rounded-full border text-sm transition-all duration-200 ${
                category === cat
                  ? "bg-white text-black border-white"
                  : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-white/40">Loading artisans...</p>
        ) : filtered.length === 0 ? (
          <div className="text-white/40 border border-white/10 bg-white/5 rounded-2xl p-10 text-center">
            No professionals found in this category.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map((artisan) => (
              <div
                key={artisan._id}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                {/* hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,0.15),transparent_50%)]" />

                <div className="relative">
                  {/* PROFILE IMAGE */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 border border-white/10">
                      {artisan.profileImage ? (
                        <img
                          src={artisan.profileImage}
                          alt={artisan.user?.name}
                          className="w-12 h-12 rounded-full object-cover border border-white/10"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white/10" />
                      )}
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold leading-tight">
                        {artisan.user?.name}
                      </h2>

                      <p className="text-white/50 text-sm">
                        {artisan.category}
                      </p>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <p className="text-white/30 text-xs mt-1">
                    {artisan.location}
                  </p>

                  {/* RATING */}
                  <div className="mt-4 text-yellow-400 text-sm">
                    ⭐ {artisan.rating || "4.5"}
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() => router.push(`/services/${artisan._id}`)}
                    className="mt-5 w-full bg-white text-black py-2 rounded-xl font-medium hover:scale-[1.02] transition"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
