'use client'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const GroupPage = () => {
  const router = useRouter();
  const { groupId } = router.query;
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      if (groupId) {
        try {
          // groupId search
          const url = `http://localhost:3000/api/indgroupId/${encodeURIComponent(groupId)}`;
          const response = await fetch(url, { method: "GET" });
          if (response.ok) {
            const data = await response.json();
            setGroup(data);
          } else {
            console.error("Failed to fetch group: HTTP status", response.status);
          }
        } catch (error) {
          console.error("Failed to fetch group:", error);
        }
      }
    };
    fetchGroup();
  }, [groupId]);
  

  if (!group) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{group.name}</h1>
      <p>Admin: {group.admin_email}</p>
      <ul>
        <h2 className="font-semibold">Members:</h2>
        {group.members.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </div>
  );
};


export default GroupPage;
