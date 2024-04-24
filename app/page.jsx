import UserInfo from "@/components/UserInfo";
import Link from "next/link";
import React from 'react';
import AddGroupBtn from "@/components/AddGroupBtn";

export default function Home() {
  return (
    <div className="grid place-items-center h-screen -mt-24">
      <UserInfo />
      <Link href="/groups" passHref>
        <AddGroupBtn />
      </Link>
    </div>
  );
}
