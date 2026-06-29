"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-6">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#6100FF]/20 rounded-full blur-3xl animate-pulse" />

        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-bounce" />

        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-white/30 rounded-full animate-ping" />
        <div className="absolute top-[60%] right-[20%] w-2 h-2 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute bottom-[25%] left-[30%] w-1.5 h-1.5 bg-white/30 rounded-full animate-ping" />
      </div>

      {/* Content */}
      <div className="relative text-center max-w-2xl">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-[float_4s_ease-in-out_infinite]">
          <Sparkles size={36} className="text-[#8B5CF6]" />
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-purple-200 to-[#8B5CF6] bg-clip-text text-transparent">
          Coming Soon
        </h1>

        {/* Feature Card */}
        <div className="mt-12 p-6 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <p className="text-white/70">
            New features are rolling out regularly across bookings, marketplace,
            payments, messaging, spaces, and artisan tools.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-[#6100FF] hover:bg-[#5000CC] transition-all duration-300 hover:scale-105 font-medium"
        >
          <ArrowLeft size={18} />
          Back Home
        </Link>
      </div>
    </div>
  );
}
