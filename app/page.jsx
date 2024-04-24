import UserInfo from "@/components/UserInfo";
import AddGroupBtn from "@/components/AddGroupBtn";

export default function Home() {
  return (
    <div className="grid place-items-center h-screen -mt-24">
      <UserInfo />
      <AddGroupBtn ref={'/groups'}/>

    </div>
  );
}
