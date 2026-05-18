"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

const API = API_URL;

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/bookings/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,255,0.12),transparent_45%)]" />

      <div className="relative max-w-5xl mx-auto px-6 py-16">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold pt-12">
            My Bookings
          </h1>

          <p className="text-white/50 mt-3 max-w-xl">
            Track your service requests, manage appointments, and monitor status
            updates in real time.
          </p>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="text-white/40">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/40">
            You have no bookings yet. Start by hiring a professional.
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition overflow-hidden"
              >
                {/* hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,0.15),transparent_50%)]" />

                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* LEFT */}
                  <div>
                    <h2 className="text-xl font-semibold mb-1">
                      {booking.service}
                    </h2>

                    <p className="text-white/40 text-sm">
                      {booking.date?.slice(0, 10)} • {booking.time}
                    </p>

                    <p className="text-white/30 text-xs mt-1">
                      {booking.address}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col md:items-end gap-2">
                    {/* Status */}
                    <span
                      className={`text-xs px-3 py-1 rounded-full border w-fit ${
                        booking.status === "completed"
                          ? "border-green-500/30 text-green-400 bg-green-500/10"
                          : booking.status === "pending"
                            ? "border-yellow-500/30 text-yellow-300 bg-yellow-500/10"
                            : booking.status === "cancelled"
                              ? "border-red-500/30 text-red-400 bg-red-500/10"
                              : "border-white/10 text-white/40 bg-white/5"
                      }`}
                    >
                      {booking.status || "pending"}
                    </span>

                    {/* Payment */}
                    <span className="text-xs text-white/40">
                      Payment:{" "}
                      <span className="text-white/60">
                        {booking.paymentStatus || "unpaid"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
