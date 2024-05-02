// Navbar Component
"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Navbar() {
  const { status, data: session } = useSession();

  return (
    <nav className="bg-background.dark w-full text-foreground mt-5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link
            href="/"
            className="font-semibold text-2xl text-primary hover:text-primary-foreground
            bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent"
          >
            Squarify
          </Link>
          {status === "authenticated" ? (
            <div className="flex items-center gap-3">
              <Link
                href="/transaction"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-accent transition-colors"
              >
                Transactions
              </Link>
              <Link
                href="/user"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-accent transition-colors"
              >
                Manage Groups
              </Link>
              <Link href="/">
                <button
                  onClick={() => signOut({callbackUrl: '/'})}
                  className="bg-destructive text-destructive-foreground px-6 py-2 rounded-md hover:bg-destructive transition-colors"
                >
                  Sign Out
                </button>
              </Link>
              <img
                className="rounded-full"
                src={session?.user?.image}
                width={40}
                height={40}
              />
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
