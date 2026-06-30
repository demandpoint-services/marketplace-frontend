import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import { Inter, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Demand Point",
  description: "Multi-service digital marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-black text-white font-sans antialiased md:pb-0">
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <LayoutClient>
            <CartProvider>{children}</CartProvider>
          </LayoutClient>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
