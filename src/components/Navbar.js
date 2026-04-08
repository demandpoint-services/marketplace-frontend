import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto p-4 flex justify-between">
        <Link href="/" className="font-bold text-xl">
          DemandPoint
        </Link>

        <div className="flex gap-6">
          <Link href="/services">Hire a Professional</Link>
          <Link href="/register">Become Artisan</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
