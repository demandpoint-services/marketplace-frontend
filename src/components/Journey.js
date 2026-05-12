import { ArrowRight, Sparkles } from "lucide-react";

export default function Journey() {
  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_40%)]" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Top Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-20">
          {/* Left */}
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#7C3BFF] mb-5">
              DEMAND POINT ECOSYSTEM
            </p>

            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.05] mb-6">
              Explore services, products & premium spaces in one platform
            </h2>

            <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
              Demand Point connects trusted professionals, verified vendors, and
              venue owners into one intelligent marketplace designed for
              seamless bookings, secure transactions, and real-time discovery.
            </p>
          </div>

          {/* Right CTA Card */}
          <div className="relative rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-[#7C3BFF]/15 border border-[#7C3BFF]/20 flex items-center justify-center mb-8">
                <Sparkles className="w-7 h-7 text-[#A855F7]" />
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight mb-5">
                Discover trusted professionals instantly
              </h3>

              <p className="text-white/60 leading-relaxed mb-10 text-lg">
                Hire artisans, shop handmade products, and book premium venues
                with one seamless digital experience built for trust and
                convenience.
              </p>

              <button className="group inline-flex items-center gap-3 rounded-full bg-white text-black px-7 py-4 font-medium transition-all duration-300 hover:scale-[1.02]">
                Explore services
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Glow */}
            <div className="absolute -bottom-20 -right-10 w-56 h-56 bg-[#7C3BFF]/20 blur-3xl rounded-full" />
          </div>
        </div>

        {/* Customer Story Card */}
        <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0A0A0A]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/customer2.jpg"
              alt="Demand Point Customer Story"
              className="w-full h-full object-cover opacity-70"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/100 md:via-black/20 to-black/100 md:to-black/20" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-end min-h-[620px] p-8 md:p-14">
            {/* Left Content */}
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70 mb-6">
                CUSTOMER STORY
              </p>

              <h3 className="text-4xl md:text-5xl font-semibold text-white leading-[1.1] mb-6">
                See how Demand Point powers modern bookings & commerce
              </h3>

              <p className="text-white/70 text-lg leading-relaxed mb-10">
                From artisan services to venue reservations and product sales,
                Demand Point helps users discover opportunities faster while
                enabling vendors and professionals to grow their businesses in
                one connected ecosystem.
              </p>

              <button className="group inline-flex items-center gap-3 text-white text-lg font-medium">
                Read story
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-10 lg:justify-end">
              <div>
                <h4 className="text-5xl font-semibold text-white mb-2">10K+</h4>

                <p className="text-white text-sm">
                  Active users across services & bookings
                </p>
              </div>

              <div>
                <h4 className="text-5xl font-semibold text-white mb-2">3+</h4>

                <p className="text-white text-sm">
                  Integrated marketplaces in one platform
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Logos */}
        {/* <div className="mt-14 flex flex-wrap items-center justify-center gap-10 opacity-40">
          <span className="text-2xl font-semibold text-white">ARTISANS</span>

          <span className="text-2xl font-semibold text-white">VENDORS</span>

          <span className="text-2xl font-semibold text-white">VENUES</span>

          <span className="text-2xl font-semibold text-white">BOOKINGS</span>

          <span className="text-2xl font-semibold text-white">MARKETPLACE</span>
        </div> */}
      </div>
    </section>
  );
}
