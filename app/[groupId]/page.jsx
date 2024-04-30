'use client'
import { useEffect, useState } from 'react';

const GroupPage = () => {
  const [groupId, setGroupId] = useState(null);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1]; // Assuming the ID is the last segment
    setGroupId(id);
  }, []);

  useEffect(() => {
    const fetchGroup = async () => {
      if (groupId) {
        const res = await fetch(`/api/indgroupId?groupId=${encodeURIComponent(groupId)}`);
        if (res.ok) {
          const groupData = await res.json();
          setGroup(groupData);
        }
      }
    };
    fetchGroup();
  }, [groupId]); // Make sure fetchGroup is only called after groupId is set

  if (!group) return <p>Loading group details...</p>; // Make sure group is not null

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{group.name}</h1>
      <h1>Group ID: {groupId}</h1>
      <p>Admin: {group.admin_email}</p>
      <ul>
        <h2 className="font-semibold">Members:</h2>
        {group.members && group.members.map(member => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupPage;
