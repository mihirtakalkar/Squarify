import UserInfo from "@/components/UserInfo";
import Link from "next/link";
import React from 'react';
import AddGroupBtn from "@/components/AddGroupBtn";
import AddSelfBtn from '@/components/AddSelfBtn';
import User from "@/models/user";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen -mt-24 gap-6">
      <UserInfo />
      <Link href="/groups" passHref>
        <AddGroupBtn />
      </Link>
      <Link href="/selfgroup" passHref>
        <AddSelfBtn />
      </Link>
    </div>
  );  
}
