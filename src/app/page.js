import Hero from "@/components/Hero";
import TrustedCompanies from "@/components/TrustedCompanies";
import Features from "@/components/Features";
import Journey from "@/components/Journey";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <TrustedCompanies />
      <Features />
      <Journey />
    </main>
  );
}
