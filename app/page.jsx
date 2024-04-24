import UserInfo from "@/components/UserInfo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center h-screen -mt-24">
      <UserInfo />
      <Link href="/groups">
        <button className="bg-slate-900 text-white px-6 py-2 rounded-md">Add Group</button> </Link>
    </div>
  );
}
