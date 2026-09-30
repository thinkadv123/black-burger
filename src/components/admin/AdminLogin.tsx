"use client";

import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Lock, Mail, ShieldAlert, ArrowRight, Loader2, KeyRound, Flame, LogOut, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface AdminLoginProps {
  onSuccess?: () => void;
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Admin user created successfully in Firebase Auth!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back to Black Burger Admin!");
      }

      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error("Firebase auth error:", err);
      let friendlyError = "Authentication failed. Please check your credentials.";

      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        friendlyError = "Incorrect password or email. If you haven't created an admin account in Firebase Auth yet, click 'Register New Admin Account'.";
      } else if (err.code === "auth/user-not-found") {
        friendlyError = "No account found with this email. Click 'Register New Admin Account' below to create it.";
      } else if (err.code === "auth/email-already-in-use") {
        friendlyError = "An account with this email already exists. Try signing in.";
      } else if (err.code === "auth/weak-password") {
        friendlyError = "Password should be at least 6 characters long.";
      } else if (err.message) {
        friendlyError = err.message;
      }

      setErrorMessage(friendlyError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#0A0A0C] flex items-center justify-center p-4 font-mono">
      <div className="max-w-md w-full bg-[#0F0F12] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        {/* Branding & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-600/10 border border-red-600/30 text-red-500 mb-1">
            <Flame className="w-6 h-6 text-[#CDB32D]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-mono">
            BLACK BURGER <span className="text-red-600">ADMIN</span>
          </h2>
          <p className="text-xs text-neutral-400">
            Sign in with your Firebase Auth credentials to access restaurant controls.
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-start gap-2.5 shadow-md">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-neutral-400 block mb-1 font-bold uppercase tracking-wider">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="admin@blackburger.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-neutral-400 block mb-1 font-bold uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-red-950/60 flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Connecting to Firebase...
              </>
            ) : isRegistering ? (
              <>
                Create Admin Account
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Sign In to Admin Portal
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Sign In / Register Option */}
        <div className="pt-2 border-t border-neutral-800/80 text-center space-y-2">
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setErrorMessage(null);
            }}
            className="text-xs text-neutral-400 hover:text-white transition-colors underline uppercase font-bold"
          >
            {isRegistering
              ? "Already have a Firebase Admin user? Sign In"
              : "Need to create a new Firebase Admin user? Register"}
          </button>

          <p className="text-[10px] text-neutral-500">
            Authenticated securely via Firebase Auth (`thinkbot-61daa`).
          </p>
        </div>
      </div>
    </div>
  );
}
