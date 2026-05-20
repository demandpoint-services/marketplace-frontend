"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

const API = API_URL;

export default function ClientDashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
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
      <div className="min-h-screen flex items-center justify-center text-white/50 bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,255,0.12),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
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
          <div className="text-white/40">No bookings yet</div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="p-5 rounded-xl bg-white/5 border border-white/10 flex justify-between"
              >
                <div>
                  <h3 className="font-medium">{b.service}</h3>
                  <p className="text-white/40 text-sm">
                    {b.date} • {b.time}
                  </p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-white/10">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
