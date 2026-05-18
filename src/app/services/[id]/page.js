"use client";

import { createBooking } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { API_URL } from "@/lib/config";

const API = API_URL;

export default function ArtisanProfile() {
  const { id } = useParams();
  const router = useRouter();

  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [form, setForm] = useState({
    address: "",
    notes: "",
  });

  useEffect(() => {
    fetchArtisan();
  }, []);

  const fetchArtisan = async () => {
    try {
      const res = await fetch(`${API}/artisans/${id}`);
      const data = await res.json();
      setArtisan(data);
    } catch (err) {
      console.error("Failed to fetch artisan:", err);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!artisan) return;

    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    const data = await createBooking(
      {
        artisan: artisan._id,
        service: artisan.category,
        ...form,
        date: selectedDate,
        time: selectedTime?.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      token,
    );

    setLoading(false);

    if (data._id) {
      router.push("/bookings");
    } else {
      alert(data.message || "Booking failed");
    }
  };

  if (!artisan) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/40">Loading artisan profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,255,0.12),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* HERO */}
        <div className="grid  gap-10 items-start pt-12">
          {/* LEFT */}
          <div>
            {/* PROFILE CARD */}
            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden p-8">
              {/* glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,0.15),transparent_45%)]" />

              <div className="relative">
                {/* PROFILE */}
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-28 h-28 rounded-full overflow-hidden border border-white/10 bg-white/10 shrink-0">
                    {artisan.profileImage ? (
                      <img
                        src={artisan.profileImage}
                        alt={artisan.user?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-4xl font-semibold">
                        {artisan.user?.name}
                      </h1>

                      <span className="px-3 py-1 rounded-full text-xs border border-yellow-500/20 bg-yellow-500/10 text-yellow-300">
                        ⭐ {artisan.rating || "4.5"}
                      </span>
                    </div>

                    <p className="text-[#7C3BFF] mt-3 text-lg font-medium">
                      {artisan.category}
                    </p>

                    <p className="text-white/40 mt-2 text-sm">
                      📍 {artisan.location || "Location not specified"}
                    </p>
                  </div>
                </div>

                {/* BIO */}
                <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-4">
                    About Professional
                  </h2>

                  <p className="text-white/60 leading-relaxed">
                    {artisan.bio || "This artisan has not added a bio yet."}
                  </p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-4 mt-10">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="text-white/40 text-sm">Category</p>
                    <p className="mt-2 font-medium">{artisan.category}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="text-white/40 text-sm">Rating</p>
                    <p className="mt-2 font-medium">
                      ⭐ {artisan.rating || "4.5"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="text-white/40 text-sm">Location</p>
                    <p className="mt-2 font-medium truncate">
                      {artisan.location || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="sticky top-28">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden p-8">
              {/* glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,0.15),transparent_45%)]" />

              <div className="relative">
                <div className="mb-8">
                  <h2 className="text-3xl font-semibold">Book This Artisan</h2>

                  <p className="text-white/40 mt-3">
                    Fill in your preferred schedule and service details.
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleBooking} className="space-y-5">
                  {/* Date and Time pickers adapted from react-datepicker library, 
                  styled to match the app's theme. The form collects the preferred date, 
                  time, service address, and additional notes for the booking request. 
                  On submission, it triggers the handleBooking function to 
                  create a new booking with the provided details. */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* DATE */}
                    <div>
                      <label className="text-sm text-white/50 mb-2 block">
                        Preferred Date
                      </label>

                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                        placeholderText="Select date"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-[#7C3BFF] transition"
                        calendarClassName="!bg-zinc-900 !border !border-white/10 !text-white"
                      />
                    </div>

                    {/* TIME */}
                    <div>
                      <label className="text-sm text-white/50 mb-2 block">
                        Preferred Time
                      </label>

                      <DatePicker
                        selected={selectedTime}
                        onChange={(time) => setSelectedTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Select time"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-[#7C3BFF] transition"
                        calendarClassName="!bg-zinc-900 !border !border-white/10 !text-white"
                      />
                    </div>
                  </div>

                  {/* ADDRESS */}
                  <div>
                    <label className="text-sm text-white/50 mb-2 block">
                      Service Address
                    </label>

                    <input
                      type="text"
                      placeholder="Enter service address"
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-[#7C3BFF] transition"
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                    />
                  </div>

                  {/* NOTES */}
                  <div>
                    <label className="text-sm text-white/50 mb-2 block">
                      Additional Notes
                    </label>

                    <textarea
                      placeholder="Describe the service request..."
                      rows={5}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-[#7C3BFF] transition resize-none"
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                    />
                  </div>

                  {/* BUTTON */}
                  <button
                    disabled={loading}
                    className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? "Booking..." : "Book Now"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
