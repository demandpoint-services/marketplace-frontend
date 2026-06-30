"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { loginUser, getMyArtisanProfile } from "@/lib/api";
import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "@/lib/googleAuth";

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
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex min-h-screen items-center justify-center bg-black px-4 relative overflow-hidden">
        {/* Glow */}
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
            className="cursor-pointer w-full bg-[#7C3BFF] hover:bg-[#6a2ee6] disabled:opacity-70 flex items-center justify-center text-white py-3 rounded-xl font-medium transition"
          >
            {loading ? (
              <div className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center text-white/50 text-sm mt-6">
            Don't have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="text-white cursor-pointer hover:underline"
            >
              Create account
            </span>
          </p>
        </form>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden min-h-screen bg-black relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-[#7C3BFF]/20 blur-3xl" />

        <div className="relative z-10 flex flex-col min-h-screen px-6 pt-28 pb-10">
          {/* Heading */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white">Welcome Back</h1>

            <p className="text-white/50 mt-3 text-base">
              Sign in to continue using Demand Point.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-white placeholder:text-white/30 outline-none focus:border-[#7C3BFF]"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-white placeholder:text-white/30 outline-none focus:border-[#7C3BFF]"
            />

            <div className="flex justify-end">
              <button
                type="button"
                className="cursor-pointer text-sm text-[#9F79FF]"
              >
                Forgot password?
              </button>
            </div>

            <button
              disabled={loading}
              className="mt-2 h-14 rounded-2xl bg-[#7C3BFF] text-lg font-semibold text-white transition hover:bg-[#6a2ee6] disabled:opacity-70 flex items-center justify-center"
            >
              {loading ? (
                <div className="h-6 w-6 rounded-full border-2 border-white/20 border-t-white animate-spin" />
              ) : (
                "Login"
              )}
            </button>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log("Google Login Failed")}
            />
          </form>

          {/* Bottom */}
          <div className="mt-auto pt-12 text-center">
            <p className="text-white/40">Don't have an account?</p>

            <button
              onClick={() => router.push("/register")}
              className="mt-3 w-full h-14 rounded-2xl border border-white/10 bg-white/5 text-white font-medium active:scale-[0.98] transition"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
