"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  House,
  ShoppingBag,
  UserRoundSearch,
  CircleUserRound,
  Bell,
  Search,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getCurrentUser } from "@/lib/api";

const API = API_URL;

export default function Navbar() {
  const [scrollState, setScrollState] = useState("top");
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getCurrentUser();

        setUser(user);

        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error(err);
      } finally {
        setMounted(true);
      }
    }

    loadUser();
  }, []);

  const [activeMenu, setActiveMenu] = useState(null);
  const pathname = usePathname();

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
    mid: "bg-white/5 backdrop-blur-md ",
    scrolled: "bg-black/80 backdrop-blur-lg",
  };

  return (
    <>
      <header
        className={`hidden md:block fixed top-0 w-full z-[120] transition-all duration-300 ${styles[scrollState]}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-14 py-4 flex justify-between items-center">
          {" "}
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Demand Point Logo"
              className="h-6 w-auto object-contain"
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
                          <Link href="/services">Plumbing</Link>
                        </li>
                        <li>
                          <Link href="/services">Electrical</Link>
                        </li>
                        <li>
                          <Link href="/services">Cleaning</Link>
                        </li>
                        <li>
                          <Link href="/services">Repairs</Link>
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
                          <Link href="/marketplace">Handmade</Link>
                        </li>
                        <li>
                          <Link href="/marketplace">Fashion</Link>
                        </li>
                        <li>
                          <Link href="/marketplace">Furniture</Link>
                        </li>
                        <li>
                          <Link href="/marketplace">Gifts</Link>
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
                          <Link href="/comingsoon">Event Centers</Link>
                        </li>
                        <li>
                          <Link href="/comingsoon">Studios</Link>
                        </li>
                        <li>
                          <Link href="/comingsoon">Co-working</Link>
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
                    <Link href="/how-it-works">How it works</Link>
                    <Link href="/pricing">Pricing</Link>
                    <Link href="/top-vendors">Top Vendors</Link>
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
                  <Link
                    href="/dashboard"
                    className="text-white px-4 py-1.5 rounded-2xl text-sm font-semibold hover:text-white/80"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-[rgb(207,0,0)] hover:bg-[rgb(189,0,0)] text-white px-4 py-1.5 rounded-2xl text-sm font-semibold cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE TOP BAR ================= */}
      {mounted && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[999] md:hidden w-[92vw] max-w-md">
          <div
            className="
        flex
        items-center
        justify-between
        rounded-full
        bg-black/80
        backdrop-blur-xl
        border
        border-white/10
        shadow-2xl
        px-4
        py-3
      "
          >
            {/* User */}
            <Link
              href={user ? "/dashboard" : "/login"}
              className="flex items-center gap-3 active:scale-95 transition-transform duration-150"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#6100FF] flex items-center justify-center">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <CircleUserRound size={22} />
                  )}
                </div>

                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#6100FF] border-2 border-black" />
              </div>

              <div className="leading-tight">
                <p className="text-[11px] text-gray-500">Good Morning 👋</p>

                <h3 className="text-sm font-semibold text-white">
                  {user?.name || "Guest"}
                </h3>
              </div>
            </Link>

            {/* Notification */}
            <Link
              href={user ? "/notifications" : "/login"}
              className="relative h-11 w-11 rounded-full flex items-center justify-center active:scale-95 transition-transform duration-150"
            >
              <Bell size={20} />

              <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#6100FF]" />
            </Link>
          </div>
        </div>
      )}

      {/* ================= MOBILE BOTTOM NAV ================= */}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[999] md:hidden">
        <div
          className="
      flex
      items-center
      justify-between
      w-[92vw]
      max-w-sm
      rounded-full
      bg-black/80
      backdrop-blur-xl
      border border-white/10
      shadow-2xl
      px-2
      py-2
    "
        >
          {/* HOME */}

          <Link
            href="/"
            className="flex-1 flex flex-col items-center gap-1 active:scale-95 transition-transform duration-150"
          >
            <div
              className={`relative h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                pathname === "/"
                  ? "bg-[#6100FF] text-white scale-110 shadow-[0_0_25px_rgba(97,0,255,.45)]"
                  : "text-gray-400"
              }`}
            >
              <House size={20} />
            </div>

            <span
              className={`text-[11px] transition-colors ${
                pathname === "/" ? "text-white" : "text-gray-400"
              }`}
            >
              Home
            </span>
          </Link>

          {/* HIRE */}

          <Link
            href="/services"
            className="flex-1 flex flex-col items-center gap-1 active:scale-95 transition-transform duration-150"
          >
            <div
              className={`relative h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                pathname.startsWith("/services")
                  ? "bg-[#6100FF] text-white scale-110 shadow-[0_0_25px_rgba(97,0,255,.45)]"
                  : "text-gray-400"
              }`}
            >
              <UserRoundSearch size={20} />
            </div>

            <span
              className={`text-[11px] ${
                pathname.startsWith("/services")
                  ? "text-white"
                  : "text-gray-400"
              }`}
            >
              Hire
            </span>
          </Link>

          {/* SHOP */}

          <Link
            href="/marketplace/products"
            className="flex-1 flex flex-col items-center gap-1 active:scale-95 transition-transform duration-150"
          >
            <div
              className={`relative h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                pathname.startsWith("/marketplace/products")
                  ? "bg-[#6100FF] text-white scale-110 shadow-[0_0_25px_rgba(97,0,255,.45)]"
                  : "text-gray-400"
              }`}
            >
              <ShoppingBag size={20} />
            </div>

            <span
              className={`text-[11px] ${
                pathname.startsWith("/marketplace/products")
                  ? "text-white"
                  : "text-gray-400"
              }`}
            >
              Shop
            </span>
          </Link>

          {/* NOTIFICATIONS */}

          <Link
            href={user ? "/notifications" : "/login"}
            className="flex-1 flex flex-col items-center gap-1 active:scale-95 transition-transform duration-150"
          >
            <div
              className={`relative h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                pathname.startsWith("/notifications")
                  ? "bg-[#6100FF] text-white scale-110 shadow-[0_0_25px_rgba(97,0,255,.45)]"
                  : "text-gray-400"
              }`}
            >
              <Bell size={20} />

              {/* Notification Badge */}
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border border-black" />
            </div>

            <span
              className={`text-[11px] ${
                pathname.startsWith("/notifications")
                  ? "text-white"
                  : "text-gray-400"
              }`}
            >
              Alerts
            </span>
          </Link>

          {/* PROFILE */}

          <Link
            href={user ? "/dashboard" : "/login"}
            className="flex-1 flex flex-col items-center gap-1 active:scale-95 transition-transform duration-150"
          >
            <div
              className={`relative h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                pathname.startsWith("/dashboard") ||
                pathname.startsWith("/login")
                  ? "bg-[#6100FF] text-white scale-110 shadow-[0_0_25px_rgba(97,0,255,.45)]"
                  : "text-gray-400"
              }`}
            >
              <CircleUserRound size={20} />
            </div>

            <span
              className={`text-[11px] ${
                pathname.startsWith("/dashboard") ||
                pathname.startsWith("/login")
                  ? "text-white"
                  : "text-gray-400"
              }`}
            >
              Profile
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
