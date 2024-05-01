// Navbar Component
"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();

  return (
    <nav className="bg-background.dark w-full text-foreground mt-5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="font-semibold text-2xl text-primary hover:text-primary-foreground">
            Squarify
          </Link>
          {status === "authenticated" ? (
            <div className="flex items-center gap-3">
              <Link href="/transaction" className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-accent transition-colors">
                Transactions
              </Link>
              <Link href="/user" className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-accent transition-colors">
                Your Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                className="bg-destructive text-destructive-foreground px-6 py-2 rounded-md hover:bg-destructive transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
