"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Sparkles,
  Star,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { API_URL } from "@/lib/api";

const API = API_URL;

export default function MarketplaceHome() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [featuredVendors, setFeaturedVendors] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchVendors();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);

      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("API did not return JSON (check backend route)");
      }

      const data = await res.json();

      setProducts(Array.isArray(data) ? data.slice(0, 8) : []);
    } catch (err) {
      console.error("Fetch products error:", err.message);
    }
  };

  const fetchVendors = async () => {
    setFeaturedVendors([
      {
        name: "CraftHub Studio",
        rating: 4.8,
        products: 120,
        image: "/vendor1.jpg",
      },
      {
        name: "Naija Woodworks",
        rating: 4.9,
        products: 84,
        image: "/vendor2.jpg",
      },
      {
        name: "Urban Designs",
        rating: 4.7,
        products: 63,
        image: "/vendor3.jpg",
      },
    ]);
  };

  const categories = [
    {
      name: "Fashion",
      desc: "Clothing & accessories",
    },
    {
      name: "Furniture",
      desc: "Modern & handmade furniture",
    },
    {
      name: "Art",
      desc: "Creative artworks & prints",
    },
    {
      name: "Handmade",
      desc: "Crafted local products",
    },
    {
      name: "Electronics",
      desc: "Devices & accessories",
    },
    {
      name: "More",
      desc: "Explore more categories",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* HERO */}
      <section className="relative pt-28 pb-24 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_45%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#7C3BFF] mb-6">
                PRODUCT MARKETPLACE
              </p>

              <h1 className="text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
                Shop handmade,
                <br />
                ready-made & creative
                <span className="text-[#7C3BFF]"> products</span>
              </h1>

              <p className="text-white/60 text-lg leading-relaxed mt-8 max-w-2xl">
                Discover unique products from trusted vendors, local craftsmen,
                designers, and creators across the Demand Point ecosystem.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={() => router.push("/marketplace/products")}
                  className="group inline-flex items-center gap-3 rounded-full bg-white text-black px-7 py-4 font-medium transition-all duration-300 hover:scale-[1.02]"
                >
                  Explore Marketplace
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => router.push("/vendor/products/new")}
                  className="rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-xl px-7 py-4 font-medium hover:bg-white/[0.06] transition"
                >
                  Become a Vendor
                </button>
              </div>

              {/* STATS */}
              <div className="flex flex-wrap gap-10 mt-14">
                <div>
                  <h3 className="text-3xl font-semibold">5K+</h3>
                  <p className="text-white/50 text-sm mt-1">Products listed</p>
                </div>

                <div>
                  <h3 className="text-3xl font-semibold">1K+</h3>
                  <p className="text-white/50 text-sm mt-1">Trusted vendors</p>
                </div>

                <div>
                  <h3 className="text-3xl font-semibold">20+</h3>
                  <p className="text-white/50 text-sm mt-1">
                    Product categories
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[560px] flex items-center justify-center">
              {/* BACKGROUND GLOW */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[420px] h-[420px] rounded-full bg-[#7C3BFF]/20 blur-3xl" />
              </div>

              {/* MAIN CARD */}
              <div className="relative z-10 w-full max-w-[360px] rounded-[36px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-5 shadow-[0_0_80px_rgba(124,59,255,0.15)]">
                {/* IMAGE */}
                <div className="relative h-[340px] rounded-[28px] overflow-hidden bg-white/10">
                  <img
                    src="/product1.jpg"
                    alt="Premium Chair"
                    className="w-full h-full object-cover"
                  />

                  {/* TOP BADGE */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl px-4 py-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />

                    <span className="text-xs text-white/80">
                      Verified Vendor
                    </span>
                  </div>

                  {/* FLOATING ACTION */}
                  <div className="absolute bottom-4 right-4 w-14 h-14 rounded-2xl bg-[#7C3BFF]/20 border border-[#7C3BFF]/20 backdrop-blur-xl flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-[#A855F7]" />
                  </div>
                </div>

                {/* PRODUCT INFO */}
                <div className="mt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-white/40 mb-2">
                        Furniture Collection
                      </p>

                      <h3 className="text-2xl font-semibold text-white">
                        Premium Chair
                      </h3>

                      <p className="text-white/50 text-sm mt-2 leading-relaxed">
                        Handcrafted modern furniture built for premium interiors
                        and luxury workspaces.
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-white/40 text-sm">Price</p>

                      <h4 className="text-2xl font-semibold text-white mt-1">
                        ₦120K
                      </h4>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Truck className="w-4 h-4" />
                      International Shipping
                    </div>

                    <button className="rounded-full bg-white text-black px-5 py-2 text-sm font-medium hover:scale-[1.02] transition">
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="relative pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
              <ShieldCheck className="w-8 h-8 text-[#7C3BFF] mb-5" />

              <h3 className="text-xl font-semibold mb-3">Secure Marketplace</h3>

              <p className="text-white/50 leading-relaxed">
                Escrow-secured payments, verified vendors, and protected
                transactions.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
              <Truck className="w-8 h-8 text-[#7C3BFF] mb-5" />

              <h3 className="text-xl font-semibold mb-3">
                Nationwide Delivery
              </h3>

              <p className="text-white/50 leading-relaxed">
                Fast shipping and logistics integration for local and
                international orders.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7">
              <Sparkles className="w-8 h-8 text-[#7C3BFF] mb-5" />

              <h3 className="text-xl font-semibold mb-3">
                Curated Marketplace
              </h3>

              <p className="text-white/50 leading-relaxed">
                Discover quality handmade products, creative works, and premium
                items.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm uppercase tracking-[0.25em] text-white/40 mb-5">
              MARKETPLACE CATEGORIES
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Explore products across every category
            </h2>

            <p className="text-white/60 text-lg">
              Browse curated collections from local creators, vendors, and
              artisans.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <div
                key={cat.name}
                onClick={() =>
                  router.push(
                    `/marketplace/products?category=${cat.name.toLowerCase()}`,
                  )
                }
                className="group relative rounded-[28px] border border-white/10 bg-white/[0.03] p-6 cursor-pointer hover:border-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-5">{cat.icon}</div>

                <h3 className="font-semibold text-lg">{cat.name}</h3>

                <p className="text-white/40 text-sm mt-2 leading-relaxed">
                  {cat.desc}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-[#A855F7]">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED VENDORS */}
      <section className="relative py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/40 mb-4">
                FEATURED VENDORS
              </p>

              <h2 className="text-4xl font-semibold">
                Trusted sellers & creators
              </h2>
            </div>

            <button className="hidden md:flex items-center gap-2 text-white/60 hover:text-white transition">
              View all vendors
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredVendors.map((vendor, i) => (
              <div
                key={i}
                className="relative rounded-[32px] border border-white/10 bg-white/[0.03] overflow-hidden"
              >
                {/* IMAGE (NEW) */}
                <div className="h-44 bg-white/5 overflow-hidden">
                  {vendor.image ? (
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5" />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{vendor.name}</h3>

                      <p className="text-white/40 text-sm mt-1">
                        {vendor.products} listed products
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <span className="text-sm">{vendor.rating}</span>
                    </div>
                  </div>

                  <button className="mt-4 inline-flex items-center gap-2 text-[#A855F7]">
                    Visit store
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/40 mb-4">
                TRENDING PRODUCTS
              </p>

              <h2 className="text-4xl font-semibold">
                Most popular products this week
              </h2>
            </div>

            <button
              onClick={() => router.push("/marketplace/products")}
              className="hidden md:flex items-center gap-2 text-white/60 hover:text-white transition"
            >
              Browse marketplace
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() =>
                  router.push(`/marketplace/product/${product._id}`)
                }
                className="group cursor-pointer rounded-[28px] border border-white/10 bg-white/[0.03] overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                <div className="h-64 bg-white/5 overflow-hidden">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5" />
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                      {product.category}
                    </span>

                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      {product.rating || 4.5}
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-white/40 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-6">
                    <p className="text-xl font-semibold">₦{product.price}</p>

                    <button className="rounded-full bg-white text-black px-4 py-2 text-sm font-medium">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
