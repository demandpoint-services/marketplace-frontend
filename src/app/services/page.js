"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { Search } from "lucide-react";

const API = API_URL;

export default function ServicesPage() {
  const [artisans, setArtisans] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

    let results = artisans;

    if (cat !== "all") {
      results = results.filter((a) => a.category === cat);
    }

    if (search.trim()) {
      const keyword = search.toLowerCase();

      results = results.filter(
        (a) =>
          a.user?.name?.toLowerCase().includes(keyword) ||
          a.category?.toLowerCase().includes(keyword) ||
          a.location?.toLowerCase().includes(keyword),
      );
    }

    setFiltered(results);
  };

  const handleSearch = (value) => {
    setSearch(value);

    let results = artisans;

    if (category !== "all") {
      results = results.filter((a) => a.category === category);
    }

    if (value.trim()) {
      const keyword = value.toLowerCase();

      results = results.filter(
        (a) =>
          a.user?.name?.toLowerCase().includes(keyword) ||
          a.category?.toLowerCase().includes(keyword) ||
          a.location?.toLowerCase().includes(keyword),
      );
    }

    setFiltered(results);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,255,0.12),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 md:pt-32">
        <div className="mb-2">
          {/* Search */}
          <div className="relative mb-4">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-10 text-gray-400 pointer-events-none"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Find skilled artisans around you"
              className="
      w-full
      h-14
      rounded-2xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      pl-14
      pr-5
      text-white
      placeholder:text-gray-500
      outline-none
      transition
      focus:border-[#7C3BFF]
      focus:ring-2
      focus:ring-[#7C3BFF]/20
    "
            />
          </div>
        </div>
        {/* FILTERS */}
        {/* Desktop */}
        <div className="hidden md:flex flex-wrap gap-3 mb-10 ">
          {["all", "Plumber", "Electrician", "Carpenter"].map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`cursor-pointer px-5 py-2 rounded-full border text-sm transition-all duration-200 ${
                category === cat
                  ? "bg-white text-black border-white"
                  : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden mb-6">
          <div
            className="
            cursor-pointer
      flex
      items-center
      gap-3
      overflow-x-auto
      overflow-y-hidden
      whitespace-nowrap
      px-6
      pb-2
      scrollbar-hide
      [-ms-overflow-style:none]
      [scrollbar-width:none]
    "
          >
            {[
              "all",
              "Plumber",
              "Electrician",
              "Carpenter",
              "Painter",
              "Welder",
              "Mechanic",
              "Cleaner",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`
            shrink-0
            px-5
            py-2.5
            rounded-full
            border
            text-sm
            transition-all
            duration-200
            ${
              category === cat
                ? "bg-white text-black border-white"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"
            }
          `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-white/40">Loading artisans...</p>
        ) : filtered.length === 0 ? (
          <div className="text-white/40 border border-white/10 bg-white/5 rounded-2xl p-10 text-center">
            No professionals found in this category.
          </div>
        ) : (
          <>
            {/* ================= MOBILE ================= */}
            <div className="md:hidden space-y-4">
              {filtered.map((artisan) => (
                <div
                  key={artisan._id}
                  onClick={() => router.push(`/services/${artisan._id}`)}
                  className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-4
          active:scale-[0.98]
          transition-all
          duration-200
          cursor-pointer
        "
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,255,.15),transparent_45%)]" />

                  <div className="relative">
                    {/* Top */}
                    <div className="flex items-start gap-4">
                      {/* Image */}
                      <div className="relative flex-shrink-0">
                        {artisan.profileImage ? (
                          <img
                            src={artisan.profileImage}
                            alt={artisan.user?.name}
                            className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-2xl bg-white/10" />
                        )}

                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-black" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h2 className="font-semibold text-lg truncate">
                              {artisan.user?.name}
                            </h2>

                            <span className="inline-flex mt-2 rounded-full bg-[#7C3BFF]/15 text-[#B794F4] px-3 py-1 text-xs">
                              {artisan.category}
                            </span>
                          </div>

                          <div className="text-right">
                            <p className="text-yellow-400 text-sm font-medium">
                              ⭐ {artisan.rating || "4.5"}
                            </p>

                            <p className="text-[11px] text-gray-500">
                              120+ jobs
                            </p>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center justify-between mt-4">
                          <p className="text-sm text-gray-400 truncate">
                            📍 {artisan.location || "Nigeria"}
                          </p>

                          <span className="text-xs text-green-400 font-medium">
                            Available
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Starting from</p>

                        <p className="font-semibold text-white">₦5,000</p>
                      </div>

                      <div className="px-4 py-2 rounded-full bg-[#6100FF] text-sm font-medium">
                        View Profile →
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= DESKTOP ================= */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {filtered.map((artisan) => (
                <div
                  key={artisan._id}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition-all duration-300 overflow-hidden"
                >
                  {/* hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,0.15),transparent_50%)]" />

                  <div className="relative">
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

                    <p className="text-white/30 text-xs mt-1">
                      {artisan.location}
                    </p>

                    <div className="mt-4 text-yellow-400 text-sm">
                      ⭐ {artisan.rating || "4.5"}
                    </div>

                    <button
                      onClick={() => router.push(`/services/${artisan._id}`)}
                      className="mt-5 w-full bg-white text-black py-2 rounded-xl font-medium hover:scale-[1.02] transition cursor-pointer"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
