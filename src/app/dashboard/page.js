"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRouter() {
  const router = useRouter();

  useEffect(() => {
    let user = null;

    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        user = JSON.parse(storedUser);
      }
    } catch {
      localStorage.removeItem("user");
    }

    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role === "artisan") {
      router.push("/artisan/dashboard");
    } else {
      router.push("/dashboard/client");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white/50 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,255,0.15),transparent_45%)]" />
    </div>
  );
}
