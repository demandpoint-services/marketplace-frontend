"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API = "http://localhost:5000/api";

export default function ArtisanProfile() {
  const { id } = useParams();
  const router = useRouter();

  const [artisan, setArtisan] = useState(null);

  const [form, setForm] = useState({
    date: "",
    time: "",
    address: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArtisan();
  }, []);

  const fetchArtisan = async () => {
    const res = await fetch(`${API}/artisans/${id}`);
    const data = await res.json();
    setArtisan(data);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        artisan: artisan.user._id,
        service: artisan.category,
        ...form,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (data._id) {
      router.push("/bookings");
    } else {
      alert("Booking failed");
    }
  };

  if (!artisan) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{artisan.user.name}</h1>

      <p className="text-gray-600 mt-2">{artisan.category}</p>

      <p className="mt-1">{artisan.location}</p>

      <p className="mt-4">{artisan.bio}</p>

      <p className="mt-2 text-yellow-600">⭐ {artisan.rating}</p>

      {/* Booking Form */}
      <form
        onSubmit={handleBooking}
        className="mt-8 space-y-4 border p-6 rounded"
      >
        <h2 className="text-xl font-semibold">Book This Artisan</h2>

        <input
          type="date"
          required
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="time"
          required
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <input
          type="text"
          placeholder="Service Address"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <textarea
          placeholder="Additional notes"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
}
