"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();
  
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Updated Link Usage */}
          <Link href="/" className="font-bold text-lg text-blue-700 hover:text-blue-800">
            Squarify
          </Link>
          {status === "authenticated" ? (
            <div className="flex items-center gap-3">
              {/* Transactions Link */}
              <Link href="/transaction" className="bg-slate-900 text-white px-6 py-2 rounded-md hover:bg-slate-800 transition-colors">
                Transactions
              </Link>
              {/* Profile Link */}
              <Link href="/user" className="bg-slate-900 text-white px-6 py-2 rounded-md hover:bg-slate-800 transition-colors">
                Your Profile
              </Link>
              {/* Sign Out Button */}
              <button
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
