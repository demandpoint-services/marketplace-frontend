"use client";

import { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/bookings/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setBookings(data);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="border p-4 rounded">
            <h2 className="font-semibold">{booking.service}</h2>

            <p>Date: {booking.date?.slice(0, 10)}</p>
            <p>Time: {booking.time}</p>

            <p>Status: {booking.status}</p>

            <p className="text-sm text-gray-500">
              Payment: {booking.paymentStatus}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
