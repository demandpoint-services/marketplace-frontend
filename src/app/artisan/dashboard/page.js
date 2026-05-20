"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

const API = API_URL;

export default function ArtisanDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/bookings/artisan`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setBookings(data);
  };

  const pending = bookings.filter((b) => b.status === "pending");
  const completed = bookings.filter((b) => b.status === "completed");

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,255,0.15),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* HEADER */}
        <div className="my-12">
          <h1 className="text-4xl font-semibold">Artisan Dashboard</h1>
          <p className="text-white/50 mt-2">
            Manage incoming client requests and track performance.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-white/40">Total Requests</p>
            <h2 className="text-2xl font-bold">{bookings.length}</h2>
          </div>

          <div className="p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-yellow-300">Pending</p>
            <h2 className="text-2xl font-bold">{pending.length}</h2>
          </div>

          <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
            <p className="text-green-300">Completed</p>
            <h2 className="text-2xl font-bold">{completed.length}</h2>
          </div>
        </div>

        {/* BOOKINGS LIST */}
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{b.service}</h3>
                <p className="text-white/40 text-sm">
                  {b.date} • {b.time}
                </p>
                <p className="text-white/30 text-xs">{b.address}</p>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs bg-green-500/20 text-green-300 rounded-lg">
                  Accept
                </button>
                <button className="px-3 py-1 text-xs bg-red-500/20 text-red-300 rounded-lg">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
