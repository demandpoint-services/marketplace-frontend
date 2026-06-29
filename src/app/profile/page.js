"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getCurrentUser();
        console.log(user);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-white/10 border-t-[#7C3BFF] animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 pt-24 md:pt-32">
        {/* HEADER */}

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10 md:py-16">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full overflow-hidden border border-white/10 bg-white/5">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-semibold text-white/40">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-semibold">{user.name}</h1>

              <p className="text-white/50 mt-2">{user.email}</p>

              <span className="inline-block mt-4 px-3 py-1 rounded-full bg-[#7C3BFF]/20 border border-[#7C3BFF]/40 text-sm capitalize">
                {user.role}
              </span>
            </div>
          </div>

          <button
            onClick={() => router.push("/setup-account")}
            className="cursor-pointer px-6 py-3 rounded-xl bg-[#7C3BFF] hover:bg-[#6931d7] transition"
          >
            Edit Profile
          </button>
        </div>

        {/* INFO GRID */}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <p className="text-white/40 text-sm mb-2">Phone Number</p>

            <p className="text-lg">{user.phone || "Not provided"}</p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <p className="text-white/40 text-sm mb-2">Location</p>

            <p className="text-lg">{user.location || "Not provided"}</p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:col-span-2">
            <p className="text-white/40 text-sm mb-2">Bio</p>

            <p className="leading-7 text-white/80">
              {user.bio || "No bio added yet."}
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <p className="text-white/40 text-sm mb-2">Member Since</p>

            <p>
              {new Date(user.createdAt).toLocaleDateString("en-NG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <p className="text-white/40 text-sm mb-2">Account Status</p>

            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                user.profileCompleted
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {user.profileCompleted ? "Profile Completed" : "Setup Required"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
