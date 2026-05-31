"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await loginUser({ email, password });
      router.push("/dashboard");
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } } };
      setError(e.response?.data?.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass p-8 rounded-2xl shadow-2xl border border-white/10"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Welcome Back</h2>
        <p className="text-muted-foreground mt-2">Log in to manage your projects.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-sm font-medium mb-4">{error}</div>}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Email</label>
          <input 
            name="email"
            type="email" 
            required 
            placeholder="you@example.com"
            className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
          </div>
          <input 
            name="password"
            type="password" 
            required 
            placeholder="••••••••"
            className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-70 mt-6 shadow-[0_0_15px_rgba(124,58,237,0.3)]"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Don&apos;t have an account? <Link href="/register" className="text-primary hover:underline font-medium">Register here</Link>
      </div>
    </motion.div>
  );
}
