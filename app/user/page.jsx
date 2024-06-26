"use client";

import React, { useEffect, useState } from "react";
import UserInfo from "@/components/UserInfo";
import AddGroupBtn from "@/components/AddGroupBtn";
import AddSelfBtn from "@/components/AddSelfBtn";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function UserPage() {
  const { data: session } = useSession();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      if (session) {
        const res = await fetch(
          `/api/groupview?email=${encodeURIComponent(session.user.email)}`
        );
        if (res.ok) {
          const data = await res.json();
          setGroups(data);
        }
      }
    };

    fetchGroups();
  }, [session]);

  return (
    <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome, {session?.user?.name} 
        </h1>
        {/* <UserInfo /> */}
        <div className="flex flex-row gap-6">
          <Link href="/groups" passHref>
            <AddGroupBtn />
          </Link>
          <Link href="/selfgroup" passHref>
            <AddSelfBtn />
          </Link>
        </div>
        <div className="w-full max-w-4xl p-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pb-5">
            Your Groups:
          </h3>
          <ul className="space-y-4">
            {groups.map((group) => (
              <li
                key={group._id}
                className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-center">
                  {/* Use Link without <a> tag; apply styles directly to Link or inner element */}
                  <Link
                    href={`/${group._id}`}
                    className="text-lg font-semibold text-violet-700"
                  >
                    <div>{group.name}</div>
                    </Link>
                  <div className="flex items-center space-x-2">
                    {group.members.map((member, index) => (
                      <span key={index} className="text-sm text-gray-500">
                        {member}
                      </span>
                      
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
