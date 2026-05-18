"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "./Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login" || pathname === "/register";
  const hideFooter = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
