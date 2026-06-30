"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

const API = API_URL;

export default function ArtisanDashboard() {
  const [bookings, setBookings] = useState([]);

  const [selectedBooking, setSelectedBooking] = useState(null);

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

      <div className="relative max-w-6xl mx-auto px-6 py-16 pb-32">
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
                <h3 className="font-semibold">{b.client?.name || "Client"}</h3>

                <button
                  onClick={() => setSelectedBooking(b)}
                  className="cursor-pointer text-sm text-[#8B5CF6] hover:text-[#A78BFA] mt-1"
                >
                  View Details
                </button>
              </div>

              <div>
                <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 capitalize">
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedBooking && (
          <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-3xl bg-[#111] border border-white/10 p-6">
              {/* HEADER */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {selectedBooking.client?.name}
                  </h2>

                  <p className="text-white/40 text-sm mt-1">
                    {selectedBooking.service}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-white/40 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* DETAILS */}
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-white/40">Date</p>
                  <p>
                    {new Date(selectedBooking.date).toLocaleDateString(
                      "en-NG",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}{" "}
                    • {selectedBooking.time}
                  </p>
                </div>

                <div>
                  <p className="text-white/40">Address</p>
                  <p>{selectedBooking.address}</p>
                </div>

                <div>
                  <p className="text-white/40">De</p>
                  <p>{selectedBooking.notes || "No additional notes"}</p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-8">
                <button className="cursor-pointer flex-1 py-3 rounded-xl bg-green-500/20 text-green-300 border border-green-500/20">
                  Accept Job
                </button>

                <button className="cursor-pointer flex-1 py-3 rounded-xl bg-red-500/20 text-red-300 border border-red-500/20">
                  Decline
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
