"use client";

import { useState } from "react";

export default function NotificationsPage() {
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Temporary dummy data
  // Later this will come from GET /notifications/my
  const notifications = [
    {
      _id: "1",
      title: "Booking Accepted",
      message:
        "John Plumbing has accepted your booking request. The artisan will arrive on your selected date and time.",
      type: "accepted",
      time: "2 hours ago",
      read: false,
    },
    {
      _id: "2",
      title: "Booking Pending",
      message:
        "Your booking request has been sent successfully and is awaiting the artisan's response.",
      type: "pending",
      time: "Yesterday",
      read: true,
    },
    {
      _id: "3",
      title: "Artisan On The Way",
      message: "Your artisan is currently on the way to your location.",
      type: "travel",
      time: "3 days ago",
      read: true,
    },
    {
      _id: "4",
      title: "Booking Completed",
      message:
        "Your booking has been completed successfully. Please consider leaving a review.",
      type: "completed",
      time: "Last week",
      read: true,
    },
  ];

  const getBadge = (type) => {
    switch (type) {
      case "accepted":
        return "bg-blue-500/10 text-blue-300 border-blue-500/20";
      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20";
      case "travel":
        return "bg-purple-500/10 text-purple-300 border-purple-500/20";
      default:
        return "bg-white/10 text-white/60 border-white/10";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "accepted":
        return "✅";
      case "completed":
        return "🎉";
      case "pending":
        return "⏳";
      case "travel":
        return "🚗";
      default:
        return "🔔";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,255,.12),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10 pt-12">
          <h1 className="text-4xl md:text-5xl font-semibold">Notifications</h1>

          <p className="text-white/50 mt-3 max-w-xl">
            Stay updated with your bookings, artisan responses, payments and
            important account activities.
          </p>
        </div>

        {/* Notification List */}

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`
              relative
              overflow-hidden
              rounded-2xl
              border
              transition-all
              duration-300
              cursor-pointer
              hover:border-white/20
              ${
                notification.read
                  ? "border-white/10 bg-white/5"
                  : "border-[#6100FF]/30 bg-[#6100FF]/10"
              }
            `}
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-[radial-gradient(circle_at_top_left,rgba(124,58,255,.15),transparent_45%)]" />

              <div className="relative p-6 flex items-center justify-between">
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                    {getIcon(notification.type)}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-semibold text-lg">
                        {notification.title}
                      </h2>

                      {!notification.read && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#6100FF]" />
                      )}
                    </div>

                    <p className="text-white/50 mt-2 line-clamp-2">
                      {notification.message}
                    </p>

                    <button
                      onClick={() => setSelectedNotification(notification)}
                      className="mt-4 text-[#8B5CF6] hover:text-[#B794F4] text-sm cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs px-3 py-1 rounded-full border ${getBadge(
                      notification.type,
                    )}`}
                  >
                    {notification.type}
                  </span>

                  <p className="text-xs text-white/40 mt-3">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}

        {selectedNotification && (
          <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex justify-center items-center p-5">
            <div className="w-full max-w-xl rounded-3xl bg-[#101010] border border-white/10 overflow-hidden">
              {/* Header */}

              <div className="border-b border-white/10 p-6 flex justify-between">
                <div>
                  <p className="text-xs text-white/40 uppercase">
                    Notification
                  </p>

                  <h2 className="text-2xl font-semibold mt-2">
                    {selectedNotification.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedNotification(null)}
                  className="text-xl text-white/40 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Body */}

              <div className="p-6 space-y-6">
                <div>
                  <p className="text-white/40 text-sm">Received</p>

                  <p className="mt-2">{selectedNotification.time}</p>
                </div>

                <div>
                  <p className="text-white/40 text-sm">Details</p>

                  <p className="mt-2 leading-8 text-white/80">
                    {selectedNotification.message}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex justify-between">
                  <span className="text-white/40">Status</span>

                  <span
                    className={`px-3 py-1 rounded-full border ${getBadge(
                      selectedNotification.type,
                    )}`}
                  >
                    {selectedNotification.type}
                  </span>
                </div>
              </div>

              {/* Footer */}

              <div className="border-t border-white/10 p-6 flex gap-4">
                <button
                  onClick={() => setSelectedNotification(null)}
                  className="flex-1 h-12 rounded-xl bg-white/10 hover:bg-white/15 transition cursor-pointer"
                >
                  Close
                </button>

                <button className="flex-1 h-12 rounded-xl bg-[#6100FF] hover:bg-[#5300d6] transition cursor-pointer">
                  Mark as Read
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
