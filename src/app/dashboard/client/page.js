"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL, getCurrentUser } from "@/lib/api";

const API = API_URL;

export default function ClientDashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getCurrentUser();

        setUser(user);

        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error(err);
      }
    }
    loadUser();
  }, []);

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/bookings/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setBookings(data.slice(0, 5));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-white/10 relative">
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,255,0.12),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 pb-32">
        {/* HEADER */}
        <div className="my-12">
          <h1 className="text-4xl font-semibold">
            Hi, <span className="text-purple-400">{user.name}</span>
          </h1>
          <p className="text-white/50 mt-2">
            Find services, manage bookings, and track your requests.
          </p>
        </div>

        {/* ACTION CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link href="/services">
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-white/20 transition">
              <h2 className="text-lg font-semibold">Browse Services</h2>
              <p className="text-white/40 text-sm mt-2">
                Hire verified professionals
              </p>
            </div>
          </Link>

          <Link href="/bookings">
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-white/20 transition">
              <h2 className="text-lg font-semibold">My Bookings</h2>
              <p className="text-white/40 text-sm mt-2">
                Track your service requests
              </p>
            </div>
          </Link>

          <Link href="/profile">
            <div className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-white/20 transition">
              <h2 className="text-lg font-semibold">Profile</h2>
              <p className="text-white/40 text-sm mt-2">Manage your account</p>
            </div>
          </Link>
        </div>

        {/* RECENT BOOKINGS */}
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>

        {bookings.length === 0 ? (
          <div className="text-white/40 text-sm">No bookings yet</div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="group relative p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition flex items-center justify-between overflow-hidden"
              >
                {/* subtle hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,0.12),transparent_60%)]" />

                {/* LEFT */}
                <div className="relative">
                  <h3 className="font-semibold text-white">{b.service}</h3>

                  <p className="text-white/40 text-sm mt-1">
                    {new Date(b.date).toLocaleDateString("en-NG", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    • <span className="text-white/60">{b.time}</span>
                  </p>
                </div>

                {/* RIGHT (STATUS BADGE) */}
                <span
                  className={`relative inline-flex items-center justify-center text-[11px] h-7 px-3 rounded-full border font-medium capitalize backdrop-blur-md ${
                    b.status === "completed"
                      ? "border-green-500/30 text-green-400 bg-green-500/10"
                      : b.status === "accepted"
                        ? "border-blue-500/30 text-blue-400 bg-blue-500/10"
                        : b.status === "pending"
                          ? "border-yellow-500/30 text-yellow-300 bg-yellow-500/10"
                          : b.status === "declined"
                            ? "border-red-500/30 text-red-400 bg-red-500/10"
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
  );
}
