"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, getMyArtisanProfile } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email";
    if (!form.password) return "Password is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");

    const validationError = validateForm();
    if (validationError) return setError(validationError);

    setLoading(true);

    try {
      const data = await loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (!data?.token || !data?.user) {
        return setError(data?.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      document.cookie = `token=${data.token}; path=/; max-age=604800; samesite=lax`;

      const role = data.user.role;

      if (role === "artisan") {
        const profile = await getMyArtisanProfile(data.token);
        router.push(profile?._id ? "/dashboard" : "/artisan/setup");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
      {/* glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#7C3BFF]/20 blur-3xl rounded-full" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-semibold text-white">Welcome back</h2>
        <p className="text-white/50 mt-2 mb-6">Login to continue shopping</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <input
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-[#7C3BFF]"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-white/30 outline-none focus:border-[#7C3BFF]"
        />

        <button
          disabled={loading}
          className="w-full bg-[#7C3BFF] hover:bg-[#6a2ee6] text-white py-3 rounded-xl font-medium transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-white/50 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-white cursor-pointer hover:underline"
          >
            Create account
          </span>
        </p>
      </form>
    </div>
  );
}
