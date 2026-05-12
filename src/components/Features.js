import {
  BriefcaseBusiness,
  ShoppingBag,
  Building2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function Features() {
  return (
    <section className="relative bg-black py-12 md:py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40 mb-5">
            PLATFORM FEATURES
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-5xl font-semibold tracking-tight text-white leading-[1.1] mb-8">
            Built for the future of services, products & spaces
          </h2>

          <p className="text-lg text-white/60 leading-relaxed max-w-3xl mx-auto">
            Demand Point connects skilled professionals, vendors, venues, and
            clients in one trusted ecosystem designed for seamless transactions
            and real-time discovery.
          </p>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Services */}
          <div className="group relative rounded-[32px] border border-white/10 p-10 overflow-hidden">
            <div className="mb-10">
              <p className="text-[#7C3BFF] text-sm tracking-[0.2em] uppercase mb-4">
                SERVICES MARKETPLACE
              </p>

              <h3 className="text-3xl font-semibold text-white mb-5">
                Hire trusted professionals instantly
              </h3>

              <p className="text-white/60 text-sm leading-relaxed max-w-xl">
                Connect with verified artisans and skilled professionals for
                repairs, installations, beauty services, construction,
                maintenance, and more.
              </p>
            </div>

            {/* Visual */}
            <div className="relative h-[220px] rounded-3xl bg-black/40 overflow-hidden">
              {/* Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" />

              {/* Floating Cards */}
              <div className="absolute top-8 left-8 w-40 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
                <div className="w-10 h-10 rounded-xl bg-[#6100FF]/20 mb-4" />

                <div className="h-3 bg-white/10 rounded-full w-24 mb-2" />
                <div className="h-3 bg-white/10 rounded-full w-16" />
              </div>

              <div className="absolute bottom-8 right-10 w-44 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/20" />

                  <div>
                    <div className="h-3 w-20 bg-white/10 rounded-full mb-2" />
                    <div className="h-3 w-14 bg-white/10 rounded-full" />
                  </div>
                </div>

                <div className="h-2 bg-white/10 rounded-full w-full mb-2" />
                <div className="h-2 bg-white/10 rounded-full w-4/5" />
              </div>

              {/* Accent Glow */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#6100FF]/20 blur-3xl rounded-full" />
            </div>
          </div>

          {/* Products */}
          <div className="group relative rounded-[32px] border border-white/10 p-10 overflow-hidden">
            <div className="mb-10">
              <p className="text-[#7C3BFF] text-sm tracking-[0.2em] uppercase mb-4">
                PRODUCT MARKETPLACE
              </p>

              <h3 className="text-3xl font-semibold text-white mb-5">
                Discover handmade & ready-made products
              </h3>

              <p className="text-white/60 text-sm leading-relaxed max-w-xl">
                Shop local crafts, fashion, furniture, art, cultural products,
                and custom-made items from trusted vendors.
              </p>
            </div>

            {/* Visual */}
            <div className="relative h-[220px] rounded-3xl bg-black/40 overflow-hidden">
              {/* Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" />

              {/* Product Mockups */}
              <div className="absolute top-8 left-10 w-24 h-32 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl" />

              <div className="absolute top-16 left-40 w-28 h-36 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl" />

              <div className="absolute bottom-8 right-10 w-48 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-4">
                <div className="h-24 rounded-xl bg-white/5 mb-4" />

                <div className="h-3 bg-white/10 rounded-full w-28 mb-2" />
                <div className="h-3 bg-white/10 rounded-full w-20 mb-4" />

                <div className="flex items-center justify-between">
                  <div className="h-8 w-20 rounded-full bg-[#6100FF]/20 border border-[#6100FF]/20" />

                  <div className="w-8 h-8 rounded-full bg-white/10" />
                </div>
              </div>

              {/* Accent Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#6100FF]/20 blur-3xl rounded-full" />
            </div>
          </div>
        </div>

        {/* Bottom Card */}
        <div className="mt-6">
          <div className="relative rounded-[32px] border border-white/10 bg-white/[0.03] p-10 md:p-12 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 animate-grid bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              {/* Left Content */}
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#7C3BFF] mb-5">
                  TRUSTED ECOSYSTEM
                </p>

                <h3 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-6">
                  Secure transactions, smart discovery, and seamless bookings
                </h3>

                <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
                  Demand Point combines intelligent matching, escrow-secured
                  payments, real-time bookings, reviews, ratings, and vendor
                  verification into one unified marketplace experience designed
                  for trust and growth.
                </p>
              </div>

              {/* Right Visual */}
              <div className="relative h-[260px] rounded-3xl bg-black/40 overflow-hidden">
                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Floating Elements */}
                <div className="absolute top-10 left-10 w-24 h-24 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl" />

                <div className="absolute bottom-10 left-32 w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/20" />

                <div className="absolute top-16 right-16 w-28 h-28 rounded-full bg-blue-500/10 border border-blue-500/20" />

                <div className="absolute bottom-14 right-20 w-32 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
