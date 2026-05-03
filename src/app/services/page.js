"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://localhost:5000/api";

export default function ServicesPage() {
  const [artisans, setArtisans] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");
  const router = useRouter();

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    const res = await fetch(`${API}/artisans`);
    const data = await res.json();
    setArtisans(data);
    setFiltered(data);
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
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Hire a Professional</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {["all", "Plumber", "Electrician", "Carpenter"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 border rounded ${
              category === cat ? "bg-black text-white" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Artisan List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((artisan) => (
          <div key={artisan._id} className="border p-4 rounded shadow">
            <h2 className="font-bold text-lg">{artisan.user.name}</h2>

            <p className="text-gray-600">{artisan.category}</p>

            <p className="text-sm text-gray-500">{artisan.location}</p>

            <p className="mt-2 text-yellow-600">⭐ {artisan.rating}</p>

            <button
              onClick={() => router.push(`/artisan/${artisan._id}`)}
              className="mt-3 bg-black text-white px-3 py-1 rounded"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
