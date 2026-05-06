"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [scrollState, setScrollState] = useState("top");
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  // ✅ MOBILE STATE
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const timeoutRef = useRef(null);

  const handleEnter = (menu) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(menu);
    }, 120);
  };

  const handleLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (y < 20) setScrollState("top");
      else if (y < 80) setScrollState("mid");
      else setScrollState("scrolled");
    };

    window.addEventListener("scroll", handleScroll);

    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; Max-Age=0; path=/";
    window.location.href = "/";
  };

  const styles = {
    top: "bg-transparent border-transparent",
    mid: "bg-white/5 backdrop-blur-md border-b border-white/10",
    scrolled: "bg-black/80 backdrop-blur-lg border-b border-zinc-800",
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${styles[scrollState]}`}
    >
      <div className="max-w-7xl mx-auto px-14 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Demand Point Logo"
            className="h-5 w-auto object-contain"
          />
        </Link>

        {/* ================= DESKTOP (UNCHANGED) ================= */}
        <div
          className="relative hidden md:flex"
          onMouseEnter={() => clearTimeout(timeoutRef.current)}
          onMouseLeave={handleLeave}
        >
          <nav className="flex gap-8 text-sm font-medium text-white">
            <div
              onMouseEnter={() => handleEnter("services")}
              className="cursor-pointer hover:text-white/80"
            >
              Hire a Professional
            </div>

            <div
              onMouseEnter={() => handleEnter("products")}
              className="cursor-pointer hover:text-white/80"
            >
              Shop Products
            </div>

            <div
              onMouseEnter={() => handleEnter("spaces")}
              className="cursor-pointer hover:text-white/80"
            >
              Book a Space
            </div>

            <div
              onMouseEnter={() => handleEnter("explore")}
              className="cursor-pointer hover:text-white/80"
            >
              Explore
            </div>
          </nav>

          {/* ===== MEGA MENU (UNCHANGED) ===== */}
          <div
            className={`absolute left-0 top-full mt-2 w-[700px] transition-all duration-300 ${
              activeMenu
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <div className="rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 p-6 shadow-2xl">
              {activeMenu === "services" && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-3">Categories</p>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="#">Plumbing</Link>
                      </li>
                      <li>
                        <Link href="#">Electrical</Link>
                      </li>
                      <li>
                        <Link href="#">Cleaning</Link>
                      </li>
                      <li>
                        <Link href="#">Repairs</Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-3">Top Artisans</p>
                    <ul className="space-y-2 text-sm">
                      <li>Elite Repairs ⭐</li>
                      <li>FixPro Services ⭐</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeMenu === "products" && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-3">Shop</p>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="#">Handmade</Link>
                      </li>
                      <li>
                        <Link href="#">Fashion</Link>
                      </li>
                      <li>
                        <Link href="#">Furniture</Link>
                      </li>
                      <li>
                        <Link href="#">Gifts</Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-3">Trending</p>
                    <ul className="space-y-2 text-sm">
                      <li>Custom Bags</li>
                      <li>Wooden Decor</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeMenu === "spaces" && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-3">Spaces</p>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="#">Event Centers</Link>
                      </li>
                      <li>
                        <Link href="#">Studios</Link>
                      </li>
                      <li>
                        <Link href="#">Co-working</Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-3">Popular</p>
                    <ul className="space-y-2 text-sm">
                      <li>Grand Hall Abuja</li>
                      <li>Tech Hub Lagos</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeMenu === "explore" && (
                <div className="grid gap-3 text-sm">
                  <Link href="#">How it works</Link>
                  <Link href="#">Pricing</Link>
                  <Link href="#">Top Vendors</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (UNCHANGED) */}
        <div className="flex items-center gap-3">
          {/* 👇 hide ONLY these on mobile */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-white/80"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="bg-[#6100FF] hover:bg-[#5000CC] text-white px-4 py-1.5 rounded-2xl text-sm font-semibold"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <button onClick={logout}>Logout</button>
              </>
            )}
          </div>

          {/* ✅ MOBILE MENU BUTTON (always visible on mobile) */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden ml-2"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 bg-black z-[100] md:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <img src="/logo.png" className="h-6" />
            <button onClick={() => setMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {/* MENU */}
          <div className="flex-1 space-y-6 text-lg">
            {/* SERVICES */}
            <div className="border-b border-white/10 pb-4">
              <button
                onClick={() =>
                  setMobileDropdown(
                    mobileDropdown === "services" ? null : "services",
                  )
                }
                className="w-full flex justify-between items-center"
              >
                Hire a Professional
                <ChevronDown size={18} />
              </button>

              {mobileDropdown === "services" && (
                <div className="mt-3 pl-4 space-y-2 text-sm text-gray-400">
                  <p>Plumbing</p>
                  <p>Electrical</p>
                  <p>Cleaning</p>
                  <p>Repairs</p>
                </div>
              )}
            </div>

            {/* PRODUCTS */}
            <div className="border-b border-white/10 pb-4">
              <button
                onClick={() =>
                  setMobileDropdown(
                    mobileDropdown === "products" ? null : "products",
                  )
                }
                className="w-full flex justify-between items-center"
              >
                Shop Products
                <ChevronDown size={18} />
              </button>

              {mobileDropdown === "products" && (
                <div className="mt-3 pl-4 space-y-2 text-sm text-gray-400">
                  <p>Handmade</p>
                  <p>Fashion</p>
                  <p>Furniture</p>
                  <p>Gifts</p>
                </div>
              )}
            </div>

            {/* SPACES */}
            <div className="border-b border-white/10 pb-4">
              <button
                onClick={() =>
                  setMobileDropdown(
                    mobileDropdown === "spaces" ? null : "spaces",
                  )
                }
                className="w-full flex justify-between items-center"
              >
                Book a Space
                <ChevronDown size={18} />
              </button>

              {mobileDropdown === "spaces" && (
                <div className="mt-3 pl-4 space-y-2 text-sm text-gray-400">
                  <p>Event Centers</p>
                  <p>Studios</p>
                  <p>Co-working</p>
                </div>
              )}
            </div>

            {/* STATIC LINKS */}
            <div className="border-b border-white/10 pb-4">Pricing</div>
            <div className="border-b border-white/10 pb-4">Blog</div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="block w-full text-center bg-white/10 py-3 rounded-full"
                >
                  Sign in
                </Link>

                <Link
                  href="/register"
                  className="block w-full text-center bg-white text-black py-3 rounded-full font-medium"
                >
                  Join Now
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="block w-full text-center bg-white/10 py-3 rounded-full"
                >
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="w-full bg-white text-black py-3 rounded-full"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
