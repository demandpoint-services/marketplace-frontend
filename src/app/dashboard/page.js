"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";

const API = API_URL;

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/bookings/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBookings(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBookings(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white/60">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* soft background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,255,0.12),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight pt-12">
            Welcome back, <span className="text-[#7C3BFF]">{user.name}</span>
          </h1>

          <p className="text-white/50 mt-3 max-w-xl">
            Manage bookings, discover services, and track your activity across
            the marketplace.
          </p>
        </div>

        {/* QUICK ACTION GRID */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {/* Card */}
          <Link href="/bookings">
            <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,0.15),transparent_50%)]" />

              <h2 className="text-xl font-semibold mb-2">My Bookings</h2>
              <p className="text-white/50 text-sm">
                View and manage all your service bookings
              </p>
            </div>
          </Link>

          <Link href="/services">
            <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,0.15),transparent_50%)]" />

              <h2 className="text-xl font-semibold mb-2">Hire Professionals</h2>
              <p className="text-white/50 text-sm">
                Browse trusted artisans and service providers
              </p>
            </div>
          </Link>

          {user.role === "artisan" && (
            <Link href="/artisan/dashboard">
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,0.15),transparent_50%)]" />

                <h2 className="text-xl font-semibold mb-2">Artisan Panel</h2>
                <p className="text-white/50 text-sm">
                  Manage incoming client requests
                </p>
              </div>
            </Link>
          )}
        </div>

        {/* BOOKINGS SECTION */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Activity</h2>

            <Link
              href="/bookings"
              className="text-sm text-white/50 hover:text-white transition"
            >
              View all →
            </Link>
          </div>

          {loadingBookings ? (
            <p className="text-white/40">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white/40">
              No bookings yet. Start exploring professionals.
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="group flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition"
                >
                  <div>
                    <h3 className="font-medium text-lg">{b.service}</h3>

                    <p className="text-sm text-white/40 mt-1">
                      {b.date} • {b.time}
                    </p>

                    <p className="text-xs text-white/30 mt-1">{b.address}</p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full border ${
                      b.status === "completed"
                        ? "border-green-500/30 text-green-400 bg-green-500/10"
                        : b.status === "pending"
                          ? "border-yellow-500/30 text-yellow-300 bg-yellow-500/10"
                          : "border-white/10 text-white/40 bg-white/5"
                    }`}
                  >
                    {b.status || "pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
