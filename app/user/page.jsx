"use client";

import React, { useEffect, useState } from "react";
import UserInfo from "@/components/UserInfo";
import AddGroupBtn from "@/components/AddGroupBtn";
import AddSelfBtn from "@/components/AddSelfBtn";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <UserInfo />
      <Link href="/groups" passHref>
        <AddGroupBtn />
      </Link>
      <Link href="/selfgroup" passHref>
        <AddSelfBtn />
      </Link>
      <div className="w-full max-w-4xl p-4">
        <h2 className="text-lg font-bold">Your Groups:</h2>
        <ul>
          {groups.map((group) => (
            <li key={group._id} className="p-2">
              <Link href={`/${group._id}`}>
                <label className="text-blue-500 hover:text-blue-700">
                  {group.name}
                </label>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
