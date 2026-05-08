"use client";

import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    const heroBg = document.getElementById("hero-bg");

    let current = 0;

    const animate = () => {
      const target = window.scrollY * 0.05;

      current += (target - current) * 0.08;

      if (heroBg) {
        heroBg.style.transform = `translate3d(0, ${current}px, 0) scale(1.1)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <main className="min-h-dvh text-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-dvh pt-28 md:pt-32 px-5 sm:px-6 overflow-hidden">
        {/* ===== BACKGROUND ===== */}
        <div
          id="hero-bg"
          className="absolute inset-0 z-0 w-full h-full overflow-hidden will-change-transform"
        >
          <img
            src="/hero-bg.jpg"
            alt="Hero background"
            className="w-full h-full object-cover object-top opacity-70"
          />
        </div>

        {/* ===== CONTENT ===== */}
        <div className="relative z-30 text-center">
          {/* Badge */}
          <div className="inline-flex items-center mb-6 px-2 py-1 rounded-full bg-white/10 border border-white/20 text-sm backdrop-blur-md cursor-pointer">
            {" "}
            <button className="bg-[#6100FF] text-white px-2 rounded-full mr-2 cursor-pointer">
              New
            </button>
            <span>Multi-service marketplace is now live</span>
            <button className="text-white pl-2 flex items-center cursor-pointer">
              <img src="/nexticon.svg" alt="Next icon" className="w-4 h-4" />
            </button>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-semibold leading-tight md:leading-[1.05]">
            The Marketplace
            <span className="block">For Skills & Services</span>
          </h1>

          {/* Subtext */}
          <p className="mt-5 text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed px-2">
            Hire professionals, shop products
            <span className="block">
              and book spaces all in one trusted ecosystem.
            </span>
          </p>

          {/* CTA */}
          <div className="mt-8 flex justify-center text-sm">
            <div className="flex items-center w-full max-w-md bg-white/10 border border-white/20 rounded-full overflow-hidden backdrop-blur-md">
              <input
                placeholder="Email address"
                className="bg-transparent px-4 sm:px-5 py-3 outline-none flex-1 min-w-0 text-sm"
              />

              <button className="bg-[#6100FF] text-white px-4 py-2 sm:px-6 m-1 rounded-full font-semibold whitespace-nowrap cursor-pointer">
                Start now
              </button>
            </div>
          </div>
        </div>

        {/* ===== PREVIEW SECTION ===== */}
        <div className="relative z-10 mt-16 sm:mt-24 md:mt-32 lg:mt-40 flex justify-center px-2">
          <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden border-[2px] border-white/30 shadow-2xl bg-white/30">
            <img
              src="/hero.jpg"
              alt="Marketplace preview"
              className="w-full h-auto object-cover"
            />

            {/* internal fade */}
            <div className="absolute inset-x-0 bottom-0 h-[25%] bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-white/10" />
          </div>
        </div>

        {/* ===== GLOBAL OVERLAY ===== */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {/* main fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />

          {/* strong bottom */}
          <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* vignette */}
          <div className="absolute inset-0 bg-black/30 [mask-image:radial-gradient(ellipse_at_center,transparent_45%,black)]" />
        </div>
      </section>
    </main>
  );
}
