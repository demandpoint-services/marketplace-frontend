"use client";

import { createBooking } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { API_URL } from "@/lib/api";

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
        <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-10 items-start pt-12">
          {/* LEFT */}
          <div>
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-10">
              {/* Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,.15),transparent_45%)]" />

              <div className="relative">
                {/* Profile */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    {artisan.profileImage ? (
                      <img
                        src={artisan.profileImage}
                        alt={artisan.user?.name}
                        className="
                w-28 h-28
                md:w-36 md:h-36
                rounded-full
                object-cover
                border-2
                border-[#6100FF]
                shadow-[0_0_30px_rgba(97,0,255,.35)]
              "
                      />
                    ) : (
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white/10" />
                    )}

                    {/* Online */}
                    <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-500 border-[3px] border-black" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                      {artisan.user?.name}
                    </h1>

                    <p className="mt-2 text-lg text-[#8B5CF6] font-medium">
                      {artisan.category}
                    </p>

                    <p className="mt-2 text-gray-400">
                      📍 {artisan.location || "Nigeria"}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
                      <div className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm">
                        ⭐ {artisan.rating || "4.5"} Rating
                      </div>

                      <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                        Available
                      </div>

                      <div className="px-4 py-2 rounded-full bg-[#6100FF]/15 border border-[#6100FF]/20 text-[#B794F4] text-sm">
                        Verified
                      </div>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-3">
                    About Professional
                  </h2>

                  <p className="text-gray-400 leading-8">
                    {artisan.bio || "This artisan has not added a bio yet."}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 md:gap-5 mt-10">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-6 text-center">
                    <p className="text-gray-500 text-xs uppercase">Category</p>

                    <p className="mt-2 font-semibold text-sm md:text-base">
                      {artisan.category}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-6 text-center">
                    <p className="text-gray-500 text-xs uppercase">Rating</p>

                    <p className="mt-2 font-semibold text-sm md:text-base">
                      ⭐ {artisan.rating || "4.5"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-6 text-center">
                    <p className="text-gray-500 text-xs uppercase">Status</p>

                    <p className="mt-2 font-semibold text-green-400 text-sm md:text-base">
                      Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:sticky lg:top-28">
            <div
              className="
      relative
      overflow-hidden
      rounded-[30px]
      border
      border-white/10
      bg-white/[0.04]
      backdrop-blur-2xl
      p-5
      md:p-8
    "
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,.15),transparent_45%)]" />

              <div className="relative">
                {/* Heading */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#6100FF]/10 border border-[#6100FF]/20 px-4 py-2 text-sm text-[#B794F4]">
                    ⚡ Fast Booking
                  </div>

                  <h2 className="mt-5 text-2xl md:text-3xl font-bold">
                    Book This Artisan
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Pick your preferred date and time to schedule this service.
                  </p>
                </div>

                <form onSubmit={handleBooking} className="space-y-6">
                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Preferred Date
                      </label>

                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                        placeholderText="Choose a date"
                        className="
                w-full
                h-14
                rounded-2xl
                bg-black/40
                border
                border-white/10
                px-5
                outline-none
                transition
                focus:border-[#6100FF]
              "
                      />
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Preferred Time
                      </label>

                      <DatePicker
                        selected={selectedTime}
                        onChange={(time) => setSelectedTime(time)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        dateFormat="h:mm aa"
                        placeholderText="Choose time"
                        className="
                w-full
                h-14
                rounded-2xl
                bg-black/40
                border
                border-white/10
                px-5
                outline-none
                transition
                focus:border-[#6100FF]
              "
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Service Address
                    </label>

                    <input
                      type="text"
                      placeholder="Where should the artisan come?"
                      required
                      onChange={(e) =>
                        setForm({
                          ...form,
                          address: e.target.value,
                        })
                      }
                      className="
              w-full
              h-14
              rounded-2xl
              bg-black/40
              border
              border-white/10
              px-5
              outline-none
              transition
              focus:border-[#6100FF]
            "
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Additional Notes
                    </label>

                    <textarea
                      rows={4}
                      placeholder="Describe the work to be done..."
                      onChange={(e) =>
                        setForm({
                          ...form,
                          notes: e.target.value,
                        })
                      }
                      className="
              w-full
              rounded-2xl
              bg-black/40
              border
              border-white/10
              p-5
              resize-none
              outline-none
              transition
              focus:border-[#6100FF]
            "
                    />
                  </div>

                  {/* Booking Summary */}
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Service</span>

                      <span className="font-medium">{artisan.category}</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-gray-400">Artisan</span>

                      <span className="font-medium">{artisan.user?.name}</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-gray-400">Status</span>

                      <span className="text-green-400 font-medium">
                        Available
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    disabled={loading}
                    className="
                    cursor-pointer
            w-full
            h-14
            rounded-2xl
            bg-[#6100FF]
            font-semibold
            text-white
            transition-all
            hover:bg-[#5500ff]
            active:scale-[0.98]
            disabled:opacity-50
          "
                  >
                    {loading ? "Booking..." : "Book Appointment"}
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
