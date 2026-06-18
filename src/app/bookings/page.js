"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

const API = API_URL;

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

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

      <div className="relative max-w-6xl mx-auto px-6 py-16">
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
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,0.15),transparent_50%)]" />

                <div className="relative flex items-center justify-between">
                  {/* LEFT */}
                  <div>
                    <h2 className="text-lg font-semibold">
                      {booking.artisan?.businessName ||
                        booking.artisan?.user?.name ||
                        "Artisan"}
                    </h2>

                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="cursor-pointer text-sm text-[#8B5CF6] hover:text-[#A78BFA] mt-1"
                    >
                      View Details
                    </button>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full border capitalize ${
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
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedBooking && (
          <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            {/* MODAL CARD */}
            <div className="w-full max-w-xl rounded-3xl bg-[#0f0f0f] border border-white/10 shadow-2xl overflow-hidden">
              {/* HEADER */}
              <div className="p-6 border-b border-white/10 flex justify-between items-start">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wide">
                    Booking Details
                  </p>

                  <h2 className="text-2xl font-semibold mt-1">
                    {selectedBooking.artisan?.businessName ||
                      selectedBooking.artisan?.user?.name ||
                      "Artisan"}
                  </h2>

                  <p className="text-sm text-white/50 mt-1">
                    {selectedBooking.service}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-white/40 hover:text-white text-lg"
                >
                  ✕
                </button>
              </div>

              {/* BODY */}
              <div className="p-6 space-y-5 text-sm">
                {/* DATE + TIME */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white/40 text-xs">Date</p>
                    <p className="text-white/90">
                      {new Date(selectedBooking.date).toLocaleDateString(
                        "en-NG",
                        {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-white/40 text-xs">Service Time</p>
                    <p className="text-white/90">{selectedBooking.time}</p>
                  </div>
                </div>

                {/* ADDRESS */}
                <div>
                  <p className="text-white/40 text-xs">Address</p>
                  <p className="text-white/80 mt-1 leading-relaxed">
                    {selectedBooking.address}
                  </p>
                </div>

                {/* NOTES */}
                <div>
                  <p className="text-white/40 text-xs">Notes</p>
                  <p className="text-white/70 mt-1 leading-relaxed">
                    {selectedBooking.notes || "No additional notes provided."}
                  </p>
                </div>

                {/* STATUS */}
                <div className="pt-2">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <p className="text-white/40 text-xs uppercase tracking-wide">
                      Status
                    </p>

                    <span
                      className={`text-xs px-3 py-1 rounded-full border capitalize font-medium ${
                        selectedBooking.status === "completed"
                          ? "border-green-500/30 text-green-400 bg-green-500/10"
                          : selectedBooking.status === "pending"
                            ? "border-yellow-500/30 text-yellow-300 bg-yellow-500/10"
                            : selectedBooking.status === "cancelled"
                              ? "border-red-500/30 text-red-400 bg-red-500/10"
                              : selectedBooking.status === "accepted"
                                ? "border-blue-500/30 text-blue-300 bg-blue-500/10"
                                : "border-white/10 text-white/60 bg-white/5"
                      }`}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="p-6 border-t border-white/10 flex gap-3">
                <button className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition text-white">
                  Close
                </button>

                {/* optional future actions */}
                <button className="flex-1 py-3 rounded-xl bg-[#6100FF] hover:bg-[#5000CC] transition text-white font-medium">
                  Message Artisan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
