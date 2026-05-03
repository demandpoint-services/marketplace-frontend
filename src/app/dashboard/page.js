"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) {
    return <div className="p-10 text-gray-400">Loading dashboard...</div>;
  }

  return (
    <div className="p-10 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>

      <p className="text-gray-400 mt-2">Manage your bookings and activity</p>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {/* My Bookings */}
        <Link href="/bookings">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-600 cursor-pointer">
            <h2 className="text-xl font-semibold">My Bookings</h2>
            <p className="text-gray-400 mt-2">View your service bookings</p>
          </div>
        </Link>

        {/* Browse Services */}
        <Link href="/services">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-600 cursor-pointer">
            <h2 className="text-xl font-semibold">Hire a Professional</h2>
            <p className="text-gray-400 mt-2">Browse available artisans</p>
          </div>
        </Link>

        {/* Artisan Dashboard */}
        {user.role === "artisan" && (
          <Link href="/artisan/dashboard">
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-600 cursor-pointer">
              <h2 className="text-xl font-semibold">Artisan Dashboard</h2>
              <p className="text-gray-400 mt-2">Manage incoming bookings</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
