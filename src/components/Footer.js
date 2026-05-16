"use client";

import Link from "next/link";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const footerLinks = {
    Explore: [
      "Hire a Professional",
      "Shop Products",
      "Book a Space",
      "Become a Vendor",
      "Become an Artisan",
    ],
    Resources: ["Blog", "Guides", "Help Center", "Success Stories", "Pricing"],
    Company: ["About Us", "Careers", "Partners", "Contact"],
    Legal: [
      "Privacy Policy",
      "Terms of Service",
      "Refund Policy",
      "Vendor Agreement",
    ],
  };

  return (
    <footer className="relative border-t border-white/5 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top */}
        <div className="border-x border-white/5 border-b border-white/5 px-5 sm:px-8 md:px-12 py-8 sm:py-10">
          <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Demand Point Logo"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </Link>

            {/* Socials */}
            <div className="flex items-center gap-5 text-white/40">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img src="/Twitter.svg" alt="Twitter" className="h-5 w-5" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img src="/linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Middle */}
        <div className="border-x border-white/5 border-b border-white/5 px-5 sm:px-8 md:px-12 py-10 sm:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 sm:gap-12">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white/35 mb-5 sm:mb-6">
                  {title}
                </h3>

                <ul className="space-y-3 sm:space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm sm:text-base text-white/75 hover:text-white transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-x border-white/5 px-5 sm:px-8 md:px-12 py-6 sm:py-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-center md:text-left text-white/40">
            © 2026 Demand Point. All rights reserved.
          </p>

          {/* Theme Toggle */}
          <div className="flex items-center justify-center md:justify-end gap-1 p-1 rounded-full border border-white/10 bg-white/[0.03] w-fit mx-auto md:mx-0">
            <button
              onClick={() => setTheme("light")}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                theme === "light"
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Sun className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTheme("system")}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                theme === "system"
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                theme === "dark"
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
