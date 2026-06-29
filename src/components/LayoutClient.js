"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "./Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/comingsoon";
  const hideFooter =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/comingsoon";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
