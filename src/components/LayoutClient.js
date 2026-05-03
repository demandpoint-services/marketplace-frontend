"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
